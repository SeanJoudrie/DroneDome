/**
 * Every wing on the MQ-9, photographed at the root, with the gap in metres.
 *
 * The whole-aircraft sweep is not enough to judge a join: at that zoom a 30 cm
 * gap on a 20 m span is one pixel. This shoots the join itself.
 *
 *   node scripts/wing-roots.mjs                 # all of them
 *   node scripts/wing-roots.mjs cessna-172 tb2  # a few
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { AIRCRAFT } from '../src/data/aircraft.generated.ts'

const OUT = process.env.DD_OUT || '/tmp/dd-roots'
mkdirSync(OUT, { recursive: true })
const URL = process.env.DD_URL || 'http://localhost:4173/DroneDome/'
const HOST = 'mq9-reaper'
const TOL = 0.1

const picked = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const donors = AIRCRAFT.filter(
  (a) => a.parts.some((p) => p.role === 'wing') || Object.prototype.hasOwnProperty.call(a.cuts, 'wing'),
)
  .map((a) => a.id)
  .filter((id) => !picked.length || picked.includes(id))

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({ viewport: { width: 1080, height: 1400 } })
await page.goto(URL, { waitUntil: 'load' })
await page.waitForFunction(() => !!window.dronedome, null, { timeout: 60000 })
await page.waitForTimeout(2500)

const apply = async (slots) => {
  const want = JSON.stringify([HOST, slots, 1])
  await page.evaluate((a) => {
    const b = window.__mk(a.host)
    b.slots = a.slots
    window.dronedome.setBuild(b)
  }, { host: HOST, slots })
  try {
    await page.waitForFunction((w) => window.dronedome.report().buildId === w, want, { timeout: 60000, polling: 100 })
  } catch {
    return false
  }
  await page.waitForTimeout(1200)
  return true
}
const shoot = async () => {
  for (let i = 0; i < 3; i++) {
    try {
      return await page.locator('canvas').first().screenshot({ timeout: 30000 })
    } catch (err) {
      if (i === 2) throw err
      await page.waitForTimeout(1500)
    }
  }
}
const tile = async (buf) => sharp(buf).resize(620, 280, { fit: 'contain', background: '#0b0f14' }).png().toBuffer()
const label = async (text, w = 1240) =>
  sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="26"><rect width="${w}" height="26" fill="#0b0f14"/><text x="8" y="18" font-family="monospace" font-size="14" fill="#9fb3c8">${String(text).replace(/[<&]/g, '')}</text></svg>`,
  )).png().toBuffer()

await apply({})
await page.evaluate(() => window.dronedome.frame())
const cam = await page.evaluate(() => window.dronedome.camera())
const T = cam.target
const far = Math.hypot(cam.position[0] - T[0], cam.position[1] - T[1], cam.position[2] - T[2])
// Close on the join, which is a metre-wide detail on a twenty-metre aeroplane.
const near = far * 0.15
const VIEWS = [
  [T[0] + near * 0.75, T[1] + near * 0.4, T[2] + near * 0.6],
  [T[0] + near * 0.08, T[1] + near * 0.12, T[2] + near],
]
const look = async (v) => {
  await page.evaluate((p) => window.dronedome.setCamera({ position: p.v, target: p.t }), { v, t: T })
  await page.waitForTimeout(450)
}

const rows = []
const tiles = []
let r = 0
for (const id of donors) {
  if (!(await apply(id === HOST ? {} : { wing: { kind: 'donor', aircraftId: id } }))) {
    rows.push({ id, gap: null, note: 'never finished loading' })
    continue
  }
  const join = await page.evaluate(() => window.dronedome.joinGap('wing'))
  const gap = join ? join.gap : null
  const verdict = gap === null ? 'NO GEOMETRY' : gap <= TOL ? 'SEATED' : `${gap.toFixed(2)} m CLEAR`
  rows.push({ id, gap, verdict })
  tiles.push({ input: await label(`${id.padEnd(16)} ${verdict}`), left: 0, top: r * 306 })
  let col = 0
  for (const v of VIEWS) {
    await look(v)
    tiles.push({ input: await tile(await shoot()), left: col * 620, top: r * 306 + 26 })
    col++
  }
  r++
  console.log(`${id.padEnd(16)} ${verdict}`)
}
writeFileSync(
  `${OUT}/roots.png`,
  await sharp({ create: { width: 1240, height: Math.max(1, r) * 306, channels: 3, background: '#0b0f14' } })
    .composite(tiles).png().toBuffer(),
)
const bad = rows.filter((x) => x.gap === null || x.gap > TOL)
console.log(`\n${rows.length - bad.length}/${rows.length} seated within ${TOL} m.  sheet: ${OUT}/roots.png`)
for (const x of bad) console.log(`  ${x.id.padEnd(16)} ${x.verdict ?? x.note}`)
await browser.close()
process.exit(bad.length ? 1 : 0)
