/**
 * Taking one part off must not take the aircraft with it.
 *
 * This is the check that caught the Global Hawk. Removing its wing emptied the
 * screen — 86% of its meshes and all of its volume — because a bare group name
 * resolved to the wing, so hiding the wing hid the group and every sibling
 * inside it. Nothing else noticed: the geometry sweep measures how far parts
 * drift, and an aircraft that is simply gone has nothing left to drift. The
 * capability sweep asks whether the change happened, and it certainly did.
 *
 * The failure mode this guards is specific, and it is the worst one in the app.
 * Every other bug shows you something wrong; this one shows you nothing at all
 * and looks like a removal that worked.
 *
 * A removal is expected to take away geometry. What is not expected is for one
 * role to account for most of the aeroplane, so both a majority of the meshes
 * and a majority of the volume have to go before it is reported — a Global Hawk
 * whose wing is genuinely most of its planform still passes on volume alone.
 *
 *   npm run check:removal            # needs a built app being served
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const URL = process.argv[2] ?? 'http://localhost:4173/DroneDome/'
const ROLES = ['wing', 'tail', 'rotor', 'gear', 'payload', 'solar', 'hardpoint']

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({ viewport: { width: 900, height: 700 } })
const crashes = []
page.on('pageerror', (e) => crashes.push(String(e)))
await page.goto(URL, { waitUntil: 'load' })
await page.waitForFunction(() => !!window.dronedome, null, { timeout: 30000 })
await page.waitForTimeout(2500)

/**
 * Set a build and wait until the renderer is showing that build and no other.
 *
 * A fixed sleep is not enough. Reading the report while a slow model was still
 * loading produced a hundred findings about the aircraft before it, including
 * one about solar panels on an airframe that has none.
 */
async function apply(baseId, slots) {
  const want = JSON.stringify([baseId, slots, 1])
  await page.evaluate(([baseId, slots]) => {
    const b = window.__mk(baseId)
    b.slots = slots
    window.dronedome.setBuild(b)
  }, [baseId, slots])
  try {
    await page.waitForFunction((w) => window.dronedome.report().buildId === w, want, {
      timeout: 40000, polling: 100,
    })
  } catch {
    return null
  }
  return (await page.evaluate(() => window.dronedome.report())).meshes
}

const volume = (ms) =>
  ms.reduce((sum, m) => sum + (m.max[0] - m.min[0]) * (m.max[1] - m.min[1]) * (m.max[2] - m.min[2]), 0)

const ids = JSON.parse(readFileSync('scripts/sources.json', 'utf8')).aircraft.map((a) => a.id)
const findings = []
let checked = 0

for (const id of ids) {
  const stock = await apply(id, {})
  if (stock === null) {
    findings.push([id, '-', 'never finished rendering'])
    continue
  }
  const wasVolume = volume(stock)
  for (const role of ROLES) {
    const after = await apply(id, { [role]: { kind: 'none' } })
    if (after === null) {
      findings.push([id, role, 'never finished rendering'])
      continue
    }
    checked++
    if (!after.length) {
      findings.push([id, role, 'leaves nothing on screen at all'])
      continue
    }
    const lostMeshes = (stock.length - after.length) / stock.length
    const lostVolume = wasVolume ? (wasVolume - volume(after)) / wasVolume : 0
    if (lostMeshes > 0.5 && lostVolume > 0.5) {
      findings.push([
        id,
        role,
        `takes ${(lostMeshes * 100).toFixed(0)}% of the meshes and ` +
          `${(lostVolume * 100).toFixed(0)}% of the volume with it`,
      ])
    }
  }
}

const pad = (s, n) => String(s).padEnd(n)
console.log(`\n${ids.length} airframes, ${checked} removals checked.\n`)
for (const [id, role, why] of findings) console.log(`  ${pad(id, 16)} ${pad(role, 10)} ${why}`)
for (const c of crashes) console.log(`  CRASH ${c.slice(0, 140)}`)
if (!findings.length && !crashes.length) {
  console.log('  no removal takes most of the aircraft with it.')
}
console.log(`\n${findings.length} finding(s), ${crashes.length} crash(es).\n`)

await browser.close()
process.exit(findings.length || crashes.length ? 1 : 0)
