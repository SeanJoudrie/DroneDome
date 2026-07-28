/**
 * Sanity-check the performance model against published figures.
 *
 * Every preset is analysed as delivered and compared with the manufacturer's
 * numbers. This is not a unit test with pass/fail thresholds — the model is
 * deliberately simplified, so some drift is expected and fine. It exists so
 * that a change to the physics which sends a Reaper to Mach 3 is obvious
 * immediately rather than six commits later.
 *
 *   npm run check:physics
 */
import { analyse } from '../src/lib/physics'
import { createBuild } from '../src/lib/build'
import { AIRCRAFT } from '../src/data/aircraft.generated'
import type { StatGroup } from '../src/types'

const PUBLISHED: Record<string, { mtow: number; endurance: number; cruise: number }> = {
  'mq9-reaper': { mtow: 4760, endurance: 27, cruise: 313 },
  'mq1-predator': { mtow: 1020, endurance: 24, cruise: 130 },
  tb2: { mtow: 700, endurance: 27, cruise: 130 },
  'global-hawk': { mtow: 14628, endurance: 32, cruise: 570 },
  x47b: { mtow: 20215, endurance: 6, cruise: 850 },
  x500: { mtow: 2.0, endurance: 0.25, cruise: 30 },
  'typhoon-h480': { mtow: 2.4, endurance: 0.4, cruise: 30 },
  'zephyr-delta': { mtow: 1.6, endurance: 0.6, cruise: 55 },
  ingenuity: { mtow: 1.8, endurance: 0.025, cruise: 18 },
}

const pick = (groups: StatGroup[], title: string, label: string) =>
  groups.find((g) => g.title === title)?.rows.find((r) => r.label === label)?.value ?? NaN

const f = (v: number, d = 1) => (Number.isFinite(v) ? v.toFixed(d) : '—')

const ratio = (got: number, want: number) => {
  if (!Number.isFinite(got) || !want) return '  —  '
  const r = got / want
  const mark = r > 0.5 && r < 2 ? ' ' : r > 0.25 && r < 4 ? '?' : '!'
  return `${mark}${r.toFixed(2)}×`
}

console.log(
  'aircraft       mass kg  (pub)        endurance h (pub)      cruise km/h (pub)      verdict',
)
console.log('-'.repeat(108))

for (const ac of AIRCRAFT) {
  const a = analyse(createBuild(ac.id))
  const p = PUBLISHED[ac.id] ?? { mtow: NaN, endurance: NaN, cruise: NaN }
  const end =
    pick(a.groups, 'Fuel & endurance', 'Endurance') ||
    pick(a.groups, 'Energy & endurance', 'Endurance') ||
    pick(a.groups, 'Energy & endurance', 'Hover time')
  const cruise = pick(a.groups, 'Wing', 'Cruise speed') * 3.6

  console.log(
    `${ac.id.padEnd(14)} ` +
      `${f(a.massKg).padStart(8)} (${f(p.mtow).padStart(7)}) ${ratio(a.massKg, p.mtow)}  ` +
      `${f(end, 2).padStart(7)} (${f(p.endurance, 2).padStart(5)}) ${ratio(end, p.endurance)}  ` +
      `${f(cruise, 0).padStart(6)} (${String(p.cruise).padStart(4)}) ${ratio(cruise, p.cruise)}  ` +
      `${a.verdict.headline}`,
  )
}

console.log(
  '\n! = more than 4× out, ? = more than 2× out. Some drift is expected; the model' +
    '\nis simplified and the published figures are not all measured the same way.',
)
