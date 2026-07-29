/**
 * Adversarial sweep over the performance model.
 *
 * The preset sweep only ever exercises sensible aircraft. This one builds the
 * configurations a sandbox actually invites - everything stripped off, every
 * powerplant paired with every incompatible energy source, both ends of the
 * scale slider - and asserts that every number the UI would render is finite.
 *
 *   npm run fuzz
 */
import { analyse } from '../src/lib/physics'
import { createBuild } from '../src/lib/build'
import { AIRCRAFT } from '../src/data/aircraft.generated'
import { ENERGY_SOURCES, ENVIRONMENTS, PAYLOADS, POWERPLANTS } from '../src/data/catalog'
import { SWAPPABLE_ROLES, type Build } from '../src/types'

let checked = 0
const failures: string[] = []

function assertSane(label: string, build: Build) {
  checked++
  let a
  try {
    a = analyse(build)
  } catch (err) {
    failures.push(`${label}: THREW ${(err as Error).message}`)
    return
  }
  if (!Number.isFinite(a.massKg)) failures.push(`${label}: mass ${a.massKg}`)
  for (const g of a.groups) {
    for (const r of g.rows) {
      if (!Number.isFinite(r.value)) failures.push(`${label}: ${g.title}/${r.label} = ${r.value}`)
      if (r.gauge && !Number.isFinite(r.gauge.max)) failures.push(`${label}: ${g.title}/${r.label} gauge max`)
    }
  }
  for (const m of a.masses) {
    if (!Number.isFinite(m.kg)) failures.push(`${label}: mass item ${m.label} = ${m.kg}`)
  }
  const b = a.balance
  for (const [k, v] of Object.entries(b)) {
    if (v !== null && !Number.isFinite(v as number)) failures.push(`${label}: balance.${k} = ${v}`)
  }
  if (!a.verdict.headline) failures.push(`${label}: empty verdict`)
}

for (const ac of AIRCRAFT) {
  // everything torn off
  const stripped = createBuild(ac.id)
  for (const role of SWAPPABLE_ROLES) stripped.slots[role] = { kind: 'none' }
  assertSane(`${ac.id} stripped`, stripped)

  // both ends of the scale slider, and past them
  for (const scale of [0.25, 1, 4, 0, -1, 1e6]) {
    assertSane(`${ac.id} scale=${scale}`, { ...createBuild(ac.id), scale })
  }

  // every environment
  for (const env of ENVIRONMENTS) {
    assertSane(`${ac.id} env=${env.id}`, { ...createBuild(ac.id), environment: env.id })
  }

  // rotor counts, including the ones that cannot cancel their own torque
  for (const count of [2, 3, 4, 6, 8]) {
    const b = createBuild(ac.id)
    b.slots.rotor = { kind: 'donor', aircraftId: 'x500', count }
    assertSane(`${ac.id} rotors=${count}`, b)
  }

  // extreme per-part resizing
  for (const scale of [0.25, 3]) {
    const b = createBuild(ac.id)
    b.slots.wing = { kind: 'donor', aircraftId: 'mq9-reaper', scale }
    assertSane(`${ac.id} wing×${scale}`, b)
  }
}

// every powerplant against every energy source, on two very different frames
for (const baseId of ['mq9-reaper', 'black-hornet']) {
  for (const plant of POWERPLANTS) {
    for (const energy of ENERGY_SOURCES) {
      assertSane(`${baseId} ${plant.id}+${energy.id}`, {
        ...createBuild(baseId),
        powerplantId: plant.id,
        energyId: energy.id,
      })
    }
  }
}

// unknown ids, as a saved build from a future version might carry
assertSane('unknown plant', { ...createBuild('x500'), powerplantId: 'nope' })
assertSane('unknown energy', { ...createBuild('x500'), energyId: 'nope' })
assertSane('unknown payload', { ...createBuild('x500'), payloadIds: ['nope'] })
assertSane('empty payloads', { ...createBuild('x500'), payloadIds: [] })
assertSane('every payload at once', {
  ...createBuild('x500'),
  payloadIds: PAYLOADS.map((p) => p.id),
})

console.log(`${checked} adversarial builds analysed`)
if (failures.length) {
  console.log(`\n${failures.length} FAILURES:`)
  for (const f of failures.slice(0, 25)) console.log('  ' + f)
  process.exit(1)
}
console.log('every rendered value finite, no throws')
