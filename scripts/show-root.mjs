/**
 * The join, close in.
 *
 * The sweep photographs the whole aircraft, and at that zoom a 30 cm gap on a
 * 20 m span is one pixel - which is how seventeen wings were reported attached
 * on a build where several are visibly floating. Any claim that a part is
 * bolted on gets one of these, not a whole-aircraft shot.
 *
 *   node scripts/show-root.mjs http://localhost:4173/DroneDome/ stock global-hawk
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
const OUT = process.env.DD_OUT || '/tmp/dd-roots'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await b.newPage({ viewport: { width: 1080, height: 1400 } })
await page.goto(process.argv[2], { waitUntil: 'load' })
await page.waitForFunction(() => !!window.dronedome, null, { timeout: 60000 })
await page.waitForTimeout(2500)
const apply = async (slots) => {
  const want = JSON.stringify(['mq9-reaper', slots, 1])
  await page.evaluate((s) => { const x = window.__mk('mq9-reaper'); x.slots = s; window.dronedome.setBuild(x) }, slots)
  await page.waitForFunction((w) => window.dronedome.report().buildId === w, want, { timeout: 60000, polling: 100 })
  await page.waitForTimeout(1300)
}
const shoot = async () => sharp(await page.locator('canvas').first().screenshot({ timeout: 30000 })).resize(660, 296, { fit: 'contain', background: '#0b0f14' }).png().toBuffer()
const label = async (t) => sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="24"><rect width="1320" height="24" fill="#0b0f14"/><text x="8" y="17" font-family="monospace" font-size="13" fill="#9fb3c8">${t}</text></svg>`)).png().toBuffer()
await apply({})
await page.evaluate(() => window.dronedome.frame())
const c = await page.evaluate(() => window.dronedome.camera())
const T = c.target
const d = Math.hypot(c.position[0] - T[0], c.position[1] - T[1], c.position[2] - T[2])
const tiles = []
let r = 0
for (const id of process.argv.slice(3)) {
  await apply(id === 'stock' ? {} : { wing: { kind: 'donor', aircraftId: id } })
  tiles.push({ input: await label(`${id}: the wing root, close in — left three-quarter, right head-on`), left: 0, top: r * 320 })
  // Close on the root, not on the aircraft: the join is a metre-wide detail on a
  // twenty-metre span.
  const near = d * 0.16
  const views = [
    [T[0] + near * 0.7, T[1] + near * 0.45, T[2] + near * 0.7],
    [T[0] + near * 0.05, T[1] + near * 0.1, T[2] + near],
  ]
  let col = 0
  for (const v of views) {
    await page.evaluate((p) => window.dronedome.setCamera({ position: p.v, target: p.t }), { v, t: T })
    await page.waitForTimeout(500)
    tiles.push({ input: await shoot(), left: col * 660, top: r * 320 + 24 })
    col++
  }
  r++
}
mkdirSync(OUT, { recursive: true })
writeFileSync(`${OUT}/roots.png`, await sharp({ create: { width: 1320, height: r * 320, channels: 3, background: '#0b0f14' } }).composite(tiles).png().toBuffer())
console.log(`${OUT}/roots.png`)
await b.close()
