/**
 * Draw one airframe's roles one at a time, so you can see what the classifier
 * actually decided.
 *
 * The catalog says which mesh is the wing and which is the body. Reading that
 * back as names and box sizes tells you very little - a welded hull's box is the
 * whole aircraft whichever role it was given, and a name like Cube.002 says
 * nothing at all. Drawing each role on its own says everything.
 *
 * This is how the X-47B was caught: its upload turned out to be two objects, the
 * aeroplane and a stray lump beside it, and the classifier had labelled the
 * aeroplane "wing" and the lump "body". Every static check passed. One look at
 * the wing drawn by itself showed a complete X-47B.
 *
 *   node scripts/show-roles.mjs x47b
 *   node scripts/show-roles.mjs x47b wing body
 *   node scripts/show-roles.mjs mq9-reaper --url http://localhost:4173/DroneDome/
 *
 * Writes a contact sheet, one row per role, top view left and side view right.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { AIRCRAFT } from '../src/data/aircraft.generated.ts'

const flag = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}
const rest = process.argv.slice(2).filter((a, i, all) => !a.startsWith('--') && !all[i - 1]?.startsWith('--'))
const AIR = rest[0]
if (!AIR) {
  console.error('usage: node scripts/show-roles.mjs <airframe> [role ...]')
  process.exit(2)
}
const model = AIRCRAFT.find((a) => a.id === AIR)
if (!model) {
  console.error(`no airframe "${AIR}" in the catalog`)
  process.exit(2)
}
const URL = flag('url', 'http://localhost:4173/DroneDome/')
const OUT = flag('out', `/tmp/roles-${AIR}.png`)
// Every role the airframe has, either as meshes or as a cut, unless told which.
const roles = rest.length > 1 ? rest.slice(1) : [...new Set([...model.parts.map((p) => p.role), ...Object.keys(model.cuts)])].sort()

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({ viewport: { width: 1080, height: 1400 } })
await page.goto(URL, { waitUntil: 'load' })
await page.waitForFunction(() => !!window.dronedome, null, { timeout: 60000 })
await page.waitForTimeout(2500)

const want = JSON.stringify([AIR, {}, 1])
await page.evaluate((a) => {
  const build = window.__mk(a)
  build.slots = {}
  window.dronedome.setBuild(build)
}, AIR)
await page.waitForFunction((w) => window.dronedome.report().buildId === w, want, { timeout: 60000, polling: 100 })
await page.waitForTimeout(1500)
await page.evaluate(() => window.dronedome.frame())
const cam = await page.evaluate(() => window.dronedome.camera())
const T = cam.target
const d = Math.hypot(cam.position[0] - T[0], cam.position[1] - T[1], cam.position[2] - T[2]) * 0.62
// Never straight down: on the up-vector three.js picks an arbitrary roll.
const VIEWS = [
  [T[0], T[1] + d, T[2] + d * 0.3],
  [T[0] + d, T[1] + d * 0.06, T[2] + d * 0.02],
]

const TILE_W = 660
const TILE_H = 296
const shoot = async () =>
  sharp(await page.locator('canvas').first().screenshot({ timeout: 30000 }))
    .resize(TILE_W, TILE_H, { fit: 'contain', background: '#0b0f14' })
    .png()
    .toBuffer()
const label = async (text) =>
  sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_W * 2}" height="24"><rect width="${TILE_W * 2}" height="24" fill="#0b0f14"/><text x="8" y="17" font-family="monospace" font-size="13" fill="#9fb3c8">${String(text).replace(/[<&]/g, '')}</text></svg>`,
    ),
  ).png().toBuffer()

const tiles = []
let row = 0
const empty = []
for (const role of ['(everything)', ...roles]) {
  await page.evaluate((r) => window.dronedome.isolate(r === '(everything)' ? null : r), role)
  tiles.push({ input: await label(`${AIR}: ${role}`), left: 0, top: row * (TILE_H + 24) })
  let col = 0
  for (const v of VIEWS) {
    await page.evaluate((p) => window.dronedome.setCamera({ position: p.v, target: p.t }), { v, t: T })
    await page.waitForTimeout(450)
    tiles.push({ input: await shoot(), left: col * TILE_W, top: row * (TILE_H + 24) + 24 })
    col++
  }
  // A role that draws nothing is either entirely a cut - which only materialises
  // when the part is removed or borrowed - or is not there at all.
  if (role !== '(everything)') {
    const drawn = (await page.evaluate(() => window.dronedome.report())).meshes.length
    if (!drawn) empty.push(role)
  }
  row++
}
await page.evaluate(() => window.dronedome.isolate(null))
mkdirSync(OUT.replace(/\/[^/]+$/, ''), { recursive: true })
writeFileSync(
  OUT,
  await sharp({ create: { width: TILE_W * 2, height: row * (TILE_H + 24), channels: 3, background: '#0b0f14' } })
    .composite(tiles).png().toBuffer(),
)
await browser.close()
console.log(`${OUT}   (top view left, side view right)`)
for (const role of empty) {
  console.log(`  ${role}: no mesh drawn — ${model.cuts[role] ? 'it is entirely a cut, so it only appears when removed or borrowed' : 'nothing on this airframe carries that role'}`)
}
