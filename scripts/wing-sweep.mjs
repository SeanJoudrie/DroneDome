/**
 * Does a borrowed part arrive as that part — centred, level, the right size?
 *
 * The other gates ask whether a change happened. This one asks what the change
 * looked like, because every wing bug so far has been invisible to counting.
 * A clipped mesh still reports the bounding box of the whole hull it was cut
 * from, so "span = 20.1 m" was true of a donor that put a second aeroplane on
 * screen and equally true of one that put nothing there at all. Names resolved,
 * planes attached, mesh counts rose. The picture was the only thing that knew.
 *
 * So this drives the real app, fits every donor's wing to a host, and reads the
 * render:
 *
 *   arrived    the donor put pixels on screen
 *   centred    their horizontal midpoint is on the aircraft's centreline
 *   symmetric  there is as much of it left of the centreline as right
 *   on station it sits at the height the host's own wing sat at
 *
 * The part is photographed alone, by asking the renderer to draw that role and
 * hide everything else, so nothing here depends on what the scene graph claims
 * and nothing is inferred from a difference. Differencing was tried and is
 * wrong: the scene casts shadows, so fitting a wing of a different shape
 * re-shades the whole fuselage, and the difference lights up an aeroplane-shaped
 * region no donor ever sent.
 *
 *   node scripts/wing-sweep.mjs                     # every wing donor
 *   node scripts/wing-sweep.mjs --host global-hawk  # onto something else
 *   node scripts/wing-sweep.mjs --role tail
 *   node scripts/wing-sweep.mjs --write /tmp/sheets # keep the contact sheets
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { AIRCRAFT } from '../src/data/aircraft.generated.ts'

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}
const HOST = arg('host', 'mq9-reaper')
const ROLE = arg('role', 'wing')
// Positional, like the other sweeps, so scripts/gates.mjs can point it at the
// server it just started without knowing anything about this one's flags.
const positional = process.argv.slice(2).find((a) => a.startsWith('http'))
const URL = positional || arg('url', 'http://localhost:4173/DroneDome/')
const WRITE = arg('write', null)
// Self-check for the attachment measurement, using the app's own control rather
// than a doctored render: lift the borrowed part off with the placement slider
// and the gap must open. A test that reports zero for every donor is not
// evidence that every donor is attached until it has been shown to report
// something else when one is not.
const LIFT = Number(arg('lift', 0))
if (WRITE) mkdirSync(WRITE, { recursive: true })

const only = arg('only', null)
const donors = AIRCRAFT.filter(
  (a) => a.parts.some((p) => p.role === ROLE) || Object.prototype.hasOwnProperty.call(a.cuts, ROLE),
)
  .map((a) => a.id)
  .filter((id) => !only || only.split(',').includes(id))
if (!donors.includes(HOST)) {
  console.error(`${HOST} has no ${ROLE} of its own to compare against`)
  process.exit(2)
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
})
// The layout is responsive and the canvas is whatever it leaves over: at 1000
// wide the panel sits below and leaves a letterbox, at 1200 it sits alongside
// and leaves a narrow column. This leaves the shape a wingspan wants.
const page = await browser.newPage({ viewport: { width: 1080, height: 1400 } })
await page.goto(URL, { waitUntil: 'load' })
await page.waitForFunction(() => !!window.dronedome, null, { timeout: 60000 })
await page.waitForTimeout(2500)

const apply = async (slots) => {
  const want = JSON.stringify([HOST, slots, 1])
  await page.evaluate(
    (a) => {
      const build = window.__mk(a.host)
      build.slots = a.slots
      window.dronedome.setBuild(build)
    },
    { host: HOST, slots },
  )
  try {
    await page.waitForFunction((w) => window.dronedome.report().buildId === w, want, { timeout: 60000, polling: 100 })
  } catch {
    return false
  }
  await page.waitForTimeout(1100)
  return true
}

let W = 0
let H = 0
const shoot = async () => {
  // Retry: under swiftshader a frame occasionally takes long enough that
  // Playwright's "element is stable" wait expires, and losing the whole sweep
  // seventeen aircraft in to one slow frame is not a finding about the app.
  let shot = null
  for (let attempt = 0; attempt < 3 && !shot; attempt++) {
    try {
      shot = await page.locator('canvas').first().screenshot({ timeout: 30000 })
    } catch (err) {
      if (attempt === 2) throw err
      await page.waitForTimeout(1500)
    }
  }
  const im = sharp(shot).removeAlpha()
  const meta = await im.metadata()
  W = meta.width
  H = meta.height
  return im.raw().toBuffer()
}

await apply({})
await page.evaluate(() => window.dronedome.frame())
const cam = await page.evaluate(() => window.dronedome.camera())
const T = cam.target
const d = Math.hypot(cam.position[0] - T[0], cam.position[1] - T[1], cam.position[2] - T[2]) * 0.62
// Never straight down: on the up-vector three.js picks an arbitrary roll and the
// wing comes out diagonal, which is a picture of the camera, not the aircraft.
const VIEWS = {
  front: [T[0], T[1] + d * 0.06, T[2] + d],
  top: [T[0], T[1] + d, T[2] + d * 0.3],
  side: [T[0] + d, T[1] + d * 0.06, T[2] + d * 0.02],
}
const look = async (v) => {
  await page.evaluate((p) => window.dronedome.setCamera({ position: p.v, target: p.t }), { v, t: T })
  await page.waitForTimeout(450)
}
/**
 * Brighter than the empty plate, not merely different from it.
 *
 * The part is lit; the shadow it throws on the ground is the same scene minus
 * some light. Counting "different" counted the shadow, and a shadow spreads far
 * wider than the thing casting it - which read as the X-47B's wing spanning the
 * whole frame when the picture plainly showed two panels inside it. Twice now a
 * measurement has been fooled by this scene's lighting; the part is the bright
 * pixels.
 */
const lit = (a, c, i) =>
  a[i] + a[i + 1] + a[i + 2] - (c[i] + c[i + 1] + c[i + 2]) > 60

/**
 * The part alone, and the empty plate to read it against.
 *
 * Both from the build in front of us, never a plate captured once and reused:
 * the ground is sized from the assembly, so a different build lays it out
 * differently and a stale plate disagreed with every shot along a thirteen-pixel
 * band right across the horizon. Counting that band said the X-47B's wing
 * spanned the entire frame while the picture showed two panels well inside it.
 */
const isolateShots = async (role, invert = false) => {
  await page.evaluate((a) => window.dronedome.isolate(a.role, a.invert), { role, invert })
  const shots = {}
  for (const [k, v] of Object.entries(VIEWS)) { await look(v); shots[k] = await shoot() }
  await page.evaluate(() => window.dronedome.isolate(null))
  return shots
}

/**
 * The part drawn alone, and the same build with nothing drawn at all.
 *
 * Not a difference of two renders of the aircraft. The scene casts shadows, so
 * a wing of a different shape re-shades the whole fuselage and that difference
 * lights up an aeroplane-shaped region no donor ever sent - which is how the TB2
 * looked like it was handing over its airframe when it was handing over a wing.
 * Drawing the role by itself answers the question directly.
 */
const partOnly = async () => ({
  part: await isolateShots(ROLE),
  // The rest of the aircraft, to answer the question the other measurements
  // cannot: is the part joined to it. A wing can be exactly the right span,
  // exactly on the centreline, perfectly even and at exactly the right height,
  // and still be floating half a metre clear of the fuselage - which is what
  // three donors were doing while every number said they were fine.
  host: await isolateShots(ROLE, true),
  empty: await isolateShots('nothing-is-this-role'),
})

/** A lit-pixel mask, as a flat array of 0/1 per pixel. */
const maskOf = (shot, empty) => {
  const m = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) if (lit(shot, empty, i * 3)) m[i] = 1
  return m
}

/**
 * How far the part is from the aircraft, in pixels.
 *
 * Grows the host's silhouette outwards a ring at a time and stops when it first
 * touches the part. Zero means they overlap, which is what a wing passing
 * through a fuselage should read as; a handful of pixels is a join; tens of
 * pixels is a part hanging in space next to the aeroplane.
 */
const gapBetween = (partMask, hostMask, limit) => {
  let front = []
  const seen = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) {
    if (!hostMask[i]) continue
    if (partMask[i]) return 0
    seen[i] = 1
    front.push(i)
  }
  if (!front.length) return null
  for (let step = 1; step <= limit; step++) {
    const next = []
    for (const i of front) {
      const x = i % W
      const y = (i / W) | 0
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const j = ny * W + nx
        if (seen[j]) continue
        if (partMask[j]) return step
        seen[j] = 1
        next.push(j)
      }
    }
    if (!next.length) break
    front = next
  }
  return limit + 1
}

/** Every pixel of the isolated part: where it is, how wide, how even. */
const measure = (shot, empty, k) => {
  let n = 0, left = 0, right = 0, lo = W, hi = -1, ySum = 0, xSum = 0
  for (let i = 0; i < W * H; i++) {
    if (!lit(shot, empty[k], i * 3)) continue
    n++
    const x = i % W
    ySum += (i / W) | 0
    xSum += x
    if (x < lo) lo = x
    if (x > hi) hi = x
  }
  return { n, left, right, lo, hi, y: n ? ySum / n : 0, x: n ? xSum / n : W / 2 }
}

await apply({})
const ownShots = await partOnly()
const own = {}
for (const k of Object.keys(VIEWS)) own[k] = measure(ownShots.part[k], ownShots.empty, k)
// The centreline in pixels, taken from the host's own part rather than assumed
// to be the middle of the frame: the camera is framed on the whole aircraft,
// which is not symmetric fore and aft, so the middle of the picture is not the
// middle of the wing.
const axisX = own.front.n ? (own.front.lo + own.front.hi) / 2 : W / 2

const label = async (text, w, h = 24) =>
  sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#0b0f14"/><text x="8" y="17" font-family="monospace" font-size="13" fill="#9fb3c8">${String(text).replace(/[<&]/g, '')}</text></svg>`,
    ),
  ).png().toBuffer()

const TILE_W = 660
const TILE_H = 296
const ROW = TILE_H + 24

const findings = []
const rows = []
for (const id of donors) {
  const slot = { kind: 'donor', aircraftId: id }
  if (LIFT) slot.rise = LIFT
  if (!(await apply({ [ROLE]: slot }))) {
    findings.push(`${id}: the build never finished loading`)
    continue
  }
  const fitted = {}
  for (const [k, v] of Object.entries(VIEWS)) { await look(v); fitted[k] = await shoot() }
  const shots = await partOnly()
  const alone = shots.part
  const plate = shots.empty
  // How far the part is from the rest of the aircraft, at the angle that shows
  // a root gap best. Front is the wing seen end-on, where daylight between a
  // root and a fuselage is unmistakable; top catches a part sitting fore or aft
  // of the body it should be joined to.
  const gaps = {}
  for (const k of ['front', 'top']) {
    gaps[k] = gapBetween(maskOf(alone[k], plate[k]), maskOf(shots.host[k], plate[k]), 40)
  }
  const gap = [gaps.front, gaps.top].filter((g) => g !== null)
  const detached = gap.length ? Math.min(...gap) : null

  const stat = {}
  const tiles = []
  let r = 0
  for (const k of Object.keys(VIEWS)) {
    const m = measure(alone[k], plate, k)
    // Left and right of the host's own centreline, so "lopsided" means what it
    // sounds like.
    for (let i = 0; i < W * H; i++) {
      if (!lit(alone[k], plate[k], i * 3)) continue
      if (i % W < axisX) m.left++
      else m.right++
    }
    stat[k] = m
    if (WRITE) {
      const box = { fit: 'contain', background: '#0b0f14' }
      tiles.push({ input: await label(`${id} ${k}: fitted to the ${HOST}`, TILE_W), left: 0, top: r * ROW })
      tiles.push({
        input: await sharp(fitted[k], { raw: { width: W, height: H, channels: 3 } }).resize(TILE_W, TILE_H, box).png().toBuffer(),
        left: 0,
        top: r * ROW + 24,
      })
      tiles.push({ input: await label(`${k}: the borrowed ${ROLE} alone, everything else hidden`, TILE_W), left: TILE_W, top: r * ROW })
      tiles.push({
        input: await sharp(alone[k], { raw: { width: W, height: H, channels: 3 } }).resize(TILE_W, TILE_H, box).png().toBuffer(),
        left: TILE_W,
        top: r * ROW + 24,
      })
    }
    r++
  }
  if (WRITE) {
    writeFileSync(
      `${WRITE}/${id}.png`,
      await sharp({ create: { width: TILE_W * 2, height: 3 * ROW, channels: 3, background: '#0b0f14' } })
        .composite(tiles).png().toBuffer(),
    )
  }

  const f = stat.front
  const total = f.n + stat.top.n + stat.side.n
  const mid = (f.lo + f.hi) / 2
  const offset = f.n ? mid - axisX : 0
  const asym = f.n ? Math.abs(f.left - f.right) / f.n : 0
  const station = f.n ? f.y - own.front.y : 0
  const width = f.n ? f.hi - f.lo : 0
  const verdicts = []
  // Nothing arrived at all. The Akinci did this for weeks while every static
  // check passed, because a role that is entirely a cut has no meshes to count.
  if (total < 200) verdicts.push('NOTHING ARRIVED')
  else {
    // The one that matters most, and the one nothing measured until three
    // screenshots of the real app showed a wing hanging in space beside the
    // aeroplane while span, centring, symmetry and station all read correct.
    if (detached === null) verdicts.push('the host drew nothing to attach to')
    else if (detached > 6) verdicts.push(`NOT ATTACHED — ${detached}px clear of the aircraft`)
    if (Math.abs(offset) > W * 0.02) verdicts.push(`off centre by ${offset.toFixed(0)}px`)
    if (asym > 0.2) verdicts.push(`lopsided ${(100 * asym).toFixed(0)}%`)
    // Generous, because donors genuinely differ: a Cessna's wing sits on top of
    // its cabin and a Global Hawk's through the middle of its fuselage, so a
    // borrowed one landing higher or lower than the host's own is the donor
    // being itself, not a fault. Only a part nowhere near the station is worth
    // reporting, and how firmly it is attached is measured separately anyway.
    if (Math.abs(station) > H * 0.2) verdicts.push(`${station.toFixed(0)}px off the ${ROLE} station`)
    // A donor that dumps its whole airframe reaches far wider than the part it
    // replaced, in every direction at once.
    if (width > own.front.hi - own.front.lo + W * 0.15) verdicts.push('wider than the host')
  }
  rows.push({ id, width, offset, asym, station, total, detached, verdicts })
  if (verdicts.length) findings.push(`${id}: ${verdicts.join(', ')}`)
}
await browser.close()

console.log(`\n${donors.length} ${ROLE}s fitted to the ${HOST}, judged on the render.\n`)
console.log('donor            width  off-centre  lopsided  station   gap   pixels  verdict')
for (const r of rows) {
  console.log(
    `${r.id.padEnd(16)}${String(r.width).padStart(5)}px${r.offset.toFixed(0).padStart(9)}px` +
      `${(100 * r.asym).toFixed(0).padStart(9)}%${r.station.toFixed(0).padStart(8)}px` +
      `${(r.detached === null ? '--' : String(r.detached)).padStart(6)}${String(r.total).padStart(9)}  ` +
      (r.verdicts.length ? r.verdicts.join(', ') : 'ok'),
  )
}
if (WRITE) console.log(`\ncontact sheets in ${WRITE}`)
if (findings.length) {
  console.log(`\n${findings.length} finding(s):`)
  for (const f of findings) console.log(`  ${f}`)
  process.exit(1)
}
console.log('\nevery donor arrived as a part, centred, level and on station.')
