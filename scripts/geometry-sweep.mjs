/**
 * Geometry self-check across the whole catalog.
 *
 * Drives the real app and then asks the renderer where every mesh ended up.
 * Screenshots only catch what someone thought to look at; this asks the same
 * three questions of every airframe under every operation:
 *
 *   detached  a part that no longer touches anything else on the aircraft
 *   runaway   an assembly that grew far beyond the size of the aircraft
 *   nonsense  a mesh whose position is NaN or infinite
 *
 * Everything is measured against that airframe's own stock build, so a model
 * that ships with a legitimately floating propeller does not read as broken.
 */
import { chromium } from 'playwright'

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

const ids = await page.locator('select').first().evaluate((el) =>
  Array.from(el.options).map((o) => o.value))

/**
 * Every piece that is adrift from the body of the aircraft, and how far.
 *
 * Counting connected components turned out to be far too twitchy: on thin
 * geometry a hairline gap between two meshes scored the same as a rotor
 * hanging a metre away, and the count moved around between runs without
 * anything visible changing. What matters is the gap, so measure that.
 *
 * Returns one entry per detached group: the gap in metres to the main body and
 * the names of the meshes in it, so the caller can tell a piece that has just
 * come adrift from one that was never attached in the first place.
 */
function detached(meshes, slack) {
  const near = (a, b) =>
    a.min[0] - slack <= b.max[0] && b.min[0] - slack <= a.max[0] &&
    a.min[1] - slack <= b.max[1] && b.min[1] - slack <= a.max[1] &&
    a.min[2] - slack <= b.max[2] && b.min[2] - slack <= a.max[2]
  const parent = meshes.map((_, i) => i)
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))
  for (let i = 0; i < meshes.length; i++)
    for (let j = i + 1; j < meshes.length; j++)
      if (near(meshes[i], meshes[j])) parent[find(i)] = find(j)

  const groups = new Map()
  meshes.forEach((m, i) => {
    const k = find(i)
    const g = groups.get(k) ?? []
    g.push(m)
    groups.set(k, g)
  })
  if (groups.size < 2) return []
  const vol = (g) => {
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity]
    for (const m of g) for (let k = 0; k < 3; k++) {
      lo[k] = Math.min(lo[k], m.min[k]); hi[k] = Math.max(hi[k], m.max[k])
    }
    return { lo, hi, v: (hi[0]-lo[0]) * (hi[1]-lo[1]) * (hi[2]-lo[2]), names: g.map((m) => m.name) }
  }
  const boxes = [...groups.values()].map(vol)
  const main = boxes.reduce((a, b) => (b.v > a.v ? b : a))
  const out = []
  for (const b of boxes) {
    if (b === main) continue
    let gap = 0
    for (let k = 0; k < 3; k++) {
      gap = Math.max(gap, b.lo[k] - main.hi[k], main.lo[k] - b.hi[k])
    }
    out.push({ gap, names: b.names })
  }
  return out
}

const size = (ms) => {
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity]
  for (const m of ms) for (let k = 0; k < 3; k++) {
    lo[k] = Math.min(lo[k], m.min[k]); hi[k] = Math.max(hi[k], m.max[k])
  }
  return Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2])
}
const finite = (ms) => ms.every((m) => [...m.min, ...m.max].every(Number.isFinite))

/**
 * Set a build and wait until the renderer is actually showing it.
 *
 * A fixed sleep is not enough: a big model takes longer to load than a small
 * one, and reading too early returns the previous aircraft's geometry. That
 * made every reading after a slow model look several times too large.
 */
async function apply(baseId, slots, scale = 1) {
  const want = JSON.stringify([baseId, slots, scale])
  await page.evaluate(([baseId, slots, scale]) => {
    const b = window.__mk(baseId)
    b.scale = scale
    b.slots = slots
    window.dronedome.setBuild(b)
  }, [baseId, slots, scale])
  try {
    await page.waitForFunction((want) => window.dronedome.report().buildId === want, want, {
      timeout: 20000,
      polling: 100,
    })
  } catch {
    return { stale: true, meshes: [] }
  }
  return { stale: false, meshes: (await page.evaluate(() => window.dronedome.report())).meshes }
}

const findings = []
let checked = 0

for (const id of ids) {
  const { stale, meshes: stock } = await apply(id, {})
  if (stale) { findings.push({ id, op: 'stock', why: 'never finished rendering' }); continue }
  if (!stock.length) { findings.push({ id, op: 'stock', why: 'renders nothing' }); continue }
  const reach = size(stock)
  const slack = reach * 0.02
  const stockDetached = detached(stock, slack)
  const baseGap = stockDetached.reduce((a, d) => Math.max(a, d.gap), 0)
  // Pieces this model already ships adrift. The Phantom 4 has one gear mesh
  // sitting off the airframe in its stock build, and nothing the app does moves
  // it — but taking the rotors off shrinks the main body's box, so the measured
  // distance to that same stray grew from 33% to 60% and read as four separate
  // findings. A gap to a box whose size depends on what is still fitted is not
  // evidence on its own; what matters is whether the piece was attached before.
  const strays = new Set(stockDetached.flatMap((d) => d.names))
  if (!finite(stock)) findings.push({ id, op: 'stock', why: 'non-finite mesh position' })

  const ops = []
  for (const role of ROLES) {
    ops.push([`${role} 3x`, { [role]: { kind: 'stock', scale: 3 } }])
    ops.push([`${role} 0.25x`, { [role]: { kind: 'stock', scale: 0.25 } }])
    ops.push([`${role} moved`, { [role]: { kind: 'stock', fore: 1, rise: 1 } }])
    ops.push([`${role} angled`, { [role]: { kind: 'stock', rollDeg: 40, pitchDeg: 25, yawDeg: 40 } }])
    ops.push([`${role} off`, { [role]: { kind: 'none' } }])
  }
  ops.push(['rotor x8 ring', { rotor: { kind: 'stock', count: 8, layout: 'ring' } }])
  ops.push(['rotor x8 stacked', { rotor: { kind: 'stock', count: 8, layout: 'stacked' } }])
  ops.push(['wing triplane', { wing: { kind: 'stock', count: 3 } }])
  ops.push(['scale 4x', {}])

  for (const [name, slots] of ops) {
    const scale = name === 'scale 4x' ? 4 : 1
    const { stale: late, meshes } = await apply(id, slots, scale)
    checked++
    if (late) { findings.push({ id, op: name, why: 'never finished rendering' }); continue }
    if (!meshes.length) { findings.push({ id, op: name, why: 'renders nothing' }); continue }
    if (!finite(meshes)) { findings.push({ id, op: name, why: 'non-finite mesh position' }); continue }
    const grew = size(meshes) / (reach * scale)
    if (grew > 4) findings.push({ id, op: name, why: `assembly grew ${grew.toFixed(1)}x its own size` })
    if (!/moved|angled/.test(name)) {
      // Only a gap you could see. A tenth of the aircraft's own size is about
      // where a part stops reading as attached and starts reading as floating.
      //
      // A group made up entirely of pieces that were already adrift in stock is
      // not this operation's doing, however far away it now measures.
      const gap = detached(meshes, slack * scale)
        .filter((d) => !d.names.every((n) => strays.has(n)))
        .reduce((a, d) => Math.max(a, d.gap), 0)
      // The stock gap scales with the build too, so a model whose propellers
      // already stand clear of its frame must not read as broken at 4x simply
      // because that clearance is now four times wider.
      const limit = Math.max(reach * scale * 0.1, baseGap * scale * 1.5)
      if (gap > limit)
        findings.push({
          id, op: name,
          why: `a part sits ${(gap / (reach * scale) * 100).toFixed(0)}% of the aircraft's length away from it`,
        })
    }
  }
}

console.log(`\n${ids.length} airframes, ${checked} operations checked.\n`)
for (const f of findings) console.log(`  ${f.id.padEnd(16)} ${f.op.padEnd(16)} ${f.why}`)
if (crashes.length) for (const c of crashes) console.log(`  CRASH ${c.slice(0, 140)}`)
console.log(`\n${findings.length} geometry finding(s), ${crashes.length} crash(es).\n`)
await browser.close()
process.exit(findings.length || crashes.length ? 1 : 0)
