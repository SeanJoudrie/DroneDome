/**
 * Can every part of every aircraft actually be changed?
 *
 * The geometry sweep asks whether a change leaves the model intact. This asks
 * the prior question: does the change happen at all. A control that silently
 * does nothing raises no error and looks fine in a screenshot, which is how
 * "how many" sat dead on stock wings for weeks.
 *
 * For every airframe and every role it runs the four things you can do to a
 * part — take it off, resize it, fit another aircraft's, fit something that was
 * never that part — and checks the rendered geometry actually moved.
 */
import { chromium } from 'playwright'

const URL = process.argv[2] ?? 'http://localhost:4173/DroneDome/'

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

// Ask the app what it thinks is swappable. This used to be a file I generated
// by hand into /tmp, which meant the check could not run from a clean checkout
// and described the catalog as it stood the day I wrote it.
const caps = await page.evaluate(() => window.dronedome.caps())

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

/** A stable description of what is on screen, so "did anything change" is exact. */
const shape = (ms) =>
  ms === null
    ? 'STALE'
    : ms
        .map((m) => `${m.name}:${m.clips}:${m.min.map((v) => v.toFixed(3))}:${m.max.map((v) => v.toFixed(3))}`)
        .sort()
        .join('|')

const findings = []
let checked = 0

for (const ac of caps.aircraft) {
  const stock = await apply(ac.id, {})
  if (stock === null) { findings.push([ac.id, '-', 'never finished rendering']); continue }
  const base = shape(stock)

  for (const role of caps.roles) {
    const owns = ac.has.includes(role)
    const trials = []
    if (owns) {
      trials.push(['remove', { [role]: { kind: 'none' } }])
      trials.push(['resize', { [role]: { kind: 'stock', scale: 2.5 } }])
      trials.push(['move', { [role]: { kind: 'stock', fore: 0.7, rise: 0.5 } }])
      trials.push(['angle', { [role]: { kind: 'stock', rollDeg: 30, pitchDeg: 20, yawDeg: 30 } }])
    }
    const donor = (caps.donors[role] || []).find((d) => d !== ac.id)
    if (donor) trials.push(['donor', { [role]: { kind: 'donor', aircraftId: donor } }])
    const cross = (caps.cross[role] || []).find(([d]) => d !== ac.id)
    if (cross) {
      trials.push(['borrowed', { [role]: { kind: 'donor', aircraftId: cross[0], fromRole: cross[1] } }])
    }

    for (const [what, slots] of trials) {
      const ms = await apply(ac.id, slots)
      checked++
      if (ms === null) { findings.push([ac.id, `${role} ${what}`, 'never finished rendering']); continue }
      if (!ms.length) { findings.push([ac.id, `${role} ${what}`, 'renders nothing at all']); continue }
      if (shape(ms) === base) findings.push([ac.id, `${role} ${what}`, 'changes nothing on screen'])
    }
  }
}

console.log(`\n${caps.aircraft.length} airframes, ${checked} changes attempted.\n`)
for (const [id, op, why] of findings) console.log(`  ${id.padEnd(16)} ${op.padEnd(20)} ${why}`)
for (const c of crashes) console.log(`  CRASH ${c.slice(0, 140)}`)
console.log(`\n${findings.length} unusable change(s), ${crashes.length} crash(es).\n`)
await browser.close()
process.exit(findings.length || crashes.length ? 1 : 0)
