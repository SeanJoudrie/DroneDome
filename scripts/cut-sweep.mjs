/**
 * A cut has to actually remove something.
 *
 * Cuts are how a welded airframe comes apart: no separate mesh for the wing, so
 * a box is clipped out of the hull instead. The failure mode is silent. Attaching
 * clipping planes to a mesh that has no geometry inside the box is a perfectly
 * successful no-op — the planes are there, the count goes up, and the aircraft
 * looks exactly as it did.
 *
 * I shipped one of those. A tail cut on the Predator attached forty-two clipping
 * planes across twenty-one meshes and removed not one pixel, because the only
 * mesh it was allowed to touch in that region was narrower than the band it was
 * keeping. Every proxy said it worked: check:parts saw a cut where a role had
 * none, the geometry sweep found nothing adrift, and the renderer reported the
 * planes attached. None of them was looking at the picture.
 *
 * So this looks at the picture. For every cut in the catalog it renders the
 * aircraft with the part and without it, from the same pinned camera, and counts
 * how many pixels of aircraft went away. A cut that changes nothing fails.
 *
 *   npm run check:cuts        # needs a built app being served
 */
import { chromium } from 'playwright'
import sharp from 'sharp'

const URL = process.argv[2] ?? 'http://localhost:4173/DroneDome/'

/** Below this share of the aircraft, a cut is not doing visible work. */
const MIN_REMOVED = 0.02

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
    return false
  }
  await page.waitForTimeout(1200)
  return true
}

/** Greyscale pixels of the canvas. The aircraft is far brighter than the grid. */
async function pixels() {
  const png = await page.locator('canvas').first().screenshot()
  return sharp(png).greyscale().raw().toBuffer({ resolveWithObject: true })
}

// Ask the app which roles are cuts, rather than re-reading the catalog here.
// An audit that reimplements the thing it audits ends up auditing its own copy.
const catalog = (await page.evaluate(() => window.dronedome.caps())).aircraft

const findings = []
let checked = 0

for (const a of catalog) {
  const roles = a.cuts ?? []
  if (!roles.length) continue
  for (const role of roles) {
    if (!(await apply(a.id, {}))) {
      findings.push([a.id, role, 'never finished rendering'])
      continue
    }
    // Pin the view, or the two renders are framed differently and the diff is
    // dominated by the camera having moved rather than by geometry going away.
    const pose = await page.evaluate(() => window.dronedome.camera())
    await page.evaluate((p) => window.dronedome.setCamera(p), pose)
    await page.waitForTimeout(500)
    const before = await pixels()

    if (!(await apply(a.id, { [role]: { kind: 'none' } }))) {
      findings.push([a.id, role, 'never finished rendering with the part removed'])
      continue
    }
    await page.evaluate((p) => window.dronedome.setCamera(p), pose)
    await page.waitForTimeout(500)
    const after = await pixels()
    checked++

    let lit = 0
    let lost = 0
    for (let i = 0; i < before.data.length; i++) {
      const on = before.data[i] > 105
      if (on) lit++
      if (on && !(after.data[i] > 105)) lost++
    }
    const share = lit ? lost / lit : 0
    if (share < MIN_REMOVED) {
      findings.push([
        a.id, role,
        `removes ${(share * 100).toFixed(1)}% of the aircraft on screen — the cut is attached but does nothing`,
      ])
    } else {
      console.log(`  ok    ${a.id.padEnd(16)} ${role.padEnd(8)} removes ${(share * 100).toFixed(0)}%`)
    }
  }
}

const pad = (s, n) => String(s).padEnd(n)
console.log(`\n${checked} cut(s) checked against what actually leaves the screen.\n`)
for (const [id, role, why] of findings) console.log(`  FAIL  ${pad(id, 16)} ${pad(role, 8)} ${why}`)
for (const c of crashes) console.log(`  CRASH ${c.slice(0, 140)}`)
if (!findings.length && !crashes.length) console.log('  every cut removes what it claims to.')
console.log(`\n${findings.length} finding(s), ${crashes.length} crash(es).\n`)

await browser.close()
process.exit(findings.length || crashes.length ? 1 : 0)
