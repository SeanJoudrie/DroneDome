/**
 * Taking a part off has to take it off the screen.
 *
 * The mirror of check:removal. That one catches a removal that takes the whole
 * aircraft with it; this one catches the opposite and more embarrassing failure,
 * where the slot says "Removed", the panel says "Not fitted", and the aircraft
 * looks exactly as it did.
 *
 * That shipped. The Reaper's wing surface is one mesh, but six more spanwise
 * members were classified as tail and hardpoint, so "no wing" took the surface
 * and left a full-span skeleton behind — a wingless Reaper that still read as
 * winged, with its span unchanged at 19.8 m out of 20.1 m. Every existing check
 * passed it: the parts were resolvable, the capability sweep saw the shape
 * change, nothing drifted, nothing was destroyed.
 *
 * So this measures the picture, and the silhouette. For every airframe and every
 * role it carries, it renders with the part and without it from two pinned
 * views, and reports how much of the aircraft actually left. Two views because
 * one angle can hide the answer: a wing barely changes a head-on silhouette and
 * dominates the view from above.
 *
 * A removal that changes nothing at all is a failure. A removal that changes
 * very little is reported but not failed, because some parts genuinely are
 * small — a Black Hornet's camera is a few pixels however honest the app is.
 *
 *   npm run check:strip        # needs a built app being served
 */
import { chromium } from 'playwright'
import sharp from 'sharp'

const URL = process.argv[2] ?? 'http://localhost:4173/DroneDome/'
const ONLY = process.argv[3] ?? null

/** Below this share of the aircraft, nothing observable happened. */
const NOTHING = 0.004
/** Below this, it worked but is worth a look. */
const SLIGHT = 0.03

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } })
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
    return null
  }
  await page.waitForTimeout(900)
  return (await page.evaluate(() => window.dronedome.report())).meshes
}

async function shot() {
  const png = await page.locator('canvas').first().screenshot()
  return sharp(png).greyscale().raw().toBuffer({ resolveWithObject: true })
}

/**
 * How much of the aircraft changed.
 *
 * Not just the silhouette. A sensor pod under a fuselage is in front of more
 * aircraft, so taking it off changes what is drawn there without changing the
 * outline at all — measuring only the outline reported the Reaper's payload as
 * removing nothing when it was removing a turret. So this counts both: pixels
 * that stopped being aircraft, and pixels that stayed aircraft but visibly
 * changed.
 */
function gone(before, after) {
  let lit = 0
  let lost = 0
  let altered = 0
  for (let i = 0; i < before.data.length; i++) {
    const a = before.data[i]
    const b = after.data[i]
    const on = a > 105
    if (!on) continue
    lit++
    if (!(b > 105)) lost++
    else if (Math.abs(a - b) > 14) altered++
  }
  return {
    lit,
    lost,
    share: lit ? lost / lit : 0,
    changed: lit ? (lost + altered) / lit : 0,
  }
}

const extent = (ms) => {
  const lo = [Infinity, Infinity, Infinity]
  const hi = [-Infinity, -Infinity, -Infinity]
  for (const m of ms) for (let k = 0; k < 3; k++) {
    lo[k] = Math.min(lo[k], m.min[k])
    hi[k] = Math.max(hi[k], m.max[k])
  }
  return { span: hi[0] - lo[0], height: hi[1] - lo[1], length: hi[2] - lo[2] }
}

const caps = await page.evaluate(() => window.dronedome.caps())
const list = ONLY ? caps.aircraft.filter((a) => a.id === ONLY) : caps.aircraft

const dead = []
const slight = []
let checked = 0

console.log(`\n${list.length} airframes, two views each (three-quarter and overhead).\n`)
console.log('airframe'.padEnd(16) + 'role'.padEnd(10) + '3/4'.padStart(7) + 'top'.padStart(7) + '  span'.padStart(10) + '   verdict')

for (const a of list) {
  for (const role of a.has) {
    const stock = await apply(a.id, {})
    if (!stock) { dead.push([a.id, role, 'never finished rendering']); continue }

    // Two poses derived from the aircraft's own auto-framed distance, so a
    // 27 cm Black Hornet and a 40 m Global Hawk are both filling the frame.
    const base = await page.evaluate(() => window.dronedome.camera())
    const d = Math.hypot(
      base.position[0] - base.target[0],
      base.position[1] - base.target[1],
      base.position[2] - base.target[2],
    )
    const poses = [
      base,
      { position: [base.target[0] + d * 0.02, base.target[1] + d, base.target[2] + d * 0.02], target: base.target },
    ]

    const before = []
    for (const p of poses) {
      await page.evaluate((x) => window.dronedome.setCamera(x), p)
      await page.waitForTimeout(420)
      before.push(await shot())
    }
    const stockSize = extent(stock)

    const after = await apply(a.id, { [role]: { kind: 'none' } })
    if (!after) { dead.push([a.id, role, 'never finished rendering without the part']); continue }
    const shares = []
    for (let i = 0; i < poses.length; i++) {
      await page.evaluate((x) => window.dronedome.setCamera(x), poses[i])
      await page.waitForTimeout(420)
      shares.push(gone(before[i], await shot()).changed)
    }
    checked++

    const best = Math.max(...shares)
    const strippedSize = after.length ? extent(after) : { span: 0 }
    const spanDrop = stockSize.span ? 1 - strippedSize.span / stockSize.span : 0
    const line =
      a.id.padEnd(16) + role.padEnd(10) +
      `${(shares[0] * 100).toFixed(1)}%`.padStart(7) +
      `${(shares[1] * 100).toFixed(1)}%`.padStart(7) +
      `${(spanDrop * 100).toFixed(0)}%`.padStart(10)

    if (best < NOTHING) {
      console.log(`${line}   NOTHING LEFT THE SCREEN`)
      dead.push([a.id, role, `removes ${(best * 100).toFixed(2)}% — the control does nothing visible`])
    } else if (best < SLIGHT) {
      console.log(`${line}   slight`)
      slight.push([a.id, role, `${(best * 100).toFixed(1)}%`])
    } else {
      console.log(`${line}   ok`)
    }
  }
}

const pad = (s, n) => String(s).padEnd(n)
console.log(`\n${checked} removal(s) checked against what actually leaves the screen.\n`)
for (const [id, role, why] of dead) console.log(`  FAIL  ${pad(id, 16)} ${pad(role, 10)} ${why}`)
if (slight.length) {
  console.log(`\n  ${slight.length} removal(s) barely changed the picture — small parts, or the next bug:`)
  for (const [id, role, s] of slight) console.log(`        ${pad(id, 16)} ${pad(role, 10)} ${s}`)
}
for (const c of crashes) console.log(`  CRASH ${c.slice(0, 140)}`)
if (!dead.length && !crashes.length) console.log('  every part that can be removed leaves the screen when it is.')
console.log(`\n${dead.length} finding(s), ${crashes.length} crash(es).\n`)

await browser.close()
process.exit(dead.length || crashes.length ? 1 : 0)
