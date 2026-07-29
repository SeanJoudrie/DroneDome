import type { Build, PartRole, SlotChoice } from '../types'
import { AIRCRAFT, AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import {
  ENERGY_SOURCES,
  ENVIRONMENTS,
  PAINTS,
  PAYLOADS,
  POWERPLANTS,
} from '../data/catalog'

/** What each preset arrives with fitted. */
const PRESET_LOADOUT: Record<string, { powerplant: string; energy: string; payloads: string[] }> = {
  'mq9-reaper': { powerplant: 'tpe331-10', energy: 'fuel-1815', payloads: ['eo-ir'] },
  'mq1-predator': { powerplant: 'rotax-914', energy: 'fuel-300', payloads: ['eo-ir'] },
  tb2: { powerplant: 'rotax-912', energy: 'fuel-130', payloads: ['gimbal-4k'] },
  x47b: { powerplant: 'f100-220u', energy: 'fuel-8000', payloads: ['none'] },
  'global-hawk': { powerplant: 'f137-rr-100', energy: 'fuel-7300', payloads: ['sar'] },
  ingenuity: { powerplant: 'e-coax-mars', energy: 'solar-12w', payloads: ['science-mars'] },
  x500: { powerplant: 'e-5010-360', energy: 'lipo-4s-5000', payloads: ['gimbal-4k'] },
  'typhoon-h480': { powerplant: 'e-2216-950', energy: 'lipo-4s-5000', payloads: ['gimbal-4k'] },
  'zephyr-delta': { powerplant: 'e-2216-950', energy: 'lipo-4s-5000', payloads: ['fpv-cam'] },
  'v22-osprey': { powerplant: 't406-turboshaft', energy: 'fuel-6500', payloads: ['none'] },
  // Its cameras are part of the 33 g airframe, not bolted on after - fitting a
  // separate FPV camera double-counted them and put it over its own MTOW.
  'black-hornet': { powerplant: 'e-0802-19000', energy: 'liion-2p5', payloads: ['none'] },
  'fpv-racer': { powerplant: 'e-2207-2450', energy: 'lipo-4s-1500', payloads: ['fpv-cam'] },
  'agri-hex': { powerplant: 'e-8318-100', energy: 'lipo-12s-22000', payloads: ['spray-40l'] },
  'delivery-quad': { powerplant: 'e-5010-360', energy: 'lipo-6s-8000', payloads: ['cargo-2kg'] },
  iris: { powerplant: 'e-5010-360', energy: 'lipo-4s-5000', payloads: ['gopro'] },
  'x3-uav': { powerplant: 'e-2216-950', energy: 'lipo-4s-5000', payloads: ['none'] },
  m100: { powerplant: 'e-5010-360', energy: 'lipo-6s-8000', payloads: ['lidar'] },
  'cessna-172': { powerplant: 'lycoming-io360', energy: 'fuel-160', payloads: ['comms-relay'] },
  // Its camera is part of the airframe, not a fitted payload.
  'rq11-raven': { powerplant: 'e-2216-950', energy: 'lipo-4s-5000', payloads: ['none'] },
  // Both carry their gimbal as part of the airframe mass, so fitting a separate
  // camera counts it twice and puts them over their own MTOW.
  'phantom-4': { powerplant: 'e-2216-950', energy: 'lipo-4s-5000', payloads: ['none'] },
  'mavic-3': { powerplant: 'e-2216-950', energy: 'lipo-4s-5000', payloads: ['none'] },
  akinci: { powerplant: 'ai450t-twin', energy: 'fuel-1350', payloads: ['sar'] },
  // The warhead is the payload, and it is already counted in the airframe mass.
  'shahed-136': { powerplant: 'md-550', energy: 'fuel-40', payloads: ['none'] },
  'altius-700': { powerplant: 'md-550', energy: 'fuel-40', payloads: ['eo-ir'] },
  'matrice-300': { powerplant: 'e-5010-360', energy: 'liion-tb60-dual', payloads: ['lidar'] },
  'inspire-2': { powerplant: 'e-5010-360', energy: 'lipo-6s-8000', payloads: ['gimbal-4k'] },
  avata: { powerplant: 'e-2207-2450', energy: 'lipo-4s-2420', payloads: ['none'] },
  'px4-vtol': { powerplant: 'e-5010-360', energy: 'lipo-4s-5000', payloads: ['gimbal-4k'] },
  'px4-tailsitter': { powerplant: 'e-2216-950', energy: 'lipo-4s-1500', payloads: ['fpv-cam'] },
  'px4-tiltrotor': { powerplant: 'e-5010-360', energy: 'lipo-4s-5000', payloads: ['gimbal-4k'] },
  'px4-omnicopter': { powerplant: 'e-2207-2450', energy: 'lipo-4s-2420', payloads: ['none'] },
  'px4-plane': { powerplant: 'e-2216-950', energy: 'lipo-4s-1500', payloads: ['fpv-cam'] },
  'mq8-firescout': { powerplant: 'm250-c47b', energy: 'fuel-590', payloads: ['eo-ir'] },
  'camcopter-s100': { powerplant: 'ae50r', energy: 'fuel-40', payloads: ['gimbal-4k'] },
  vbat: { powerplant: 'vbat-2stroke', energy: 'fuel-12', payloads: ['gimbal-4k'] },
}

const FALLBACK = { powerplant: 'e-5010-360', energy: 'lipo-4s-5000', payloads: ['none'] }

export function newId() {
  return Math.random().toString(36).slice(2, 10)
}

export function createBuild(baseId: string): Build {
  const base = AIRCRAFT_BY_ID[baseId] ?? AIRCRAFT[0]
  const loadout = PRESET_LOADOUT[base.id] ?? FALLBACK
  const now = Date.now()
  return {
    id: newId(),
    name: base.name,
    baseId: base.id,
    scale: 1,
    environment: base.environment,
    slots: {},
    powerplantId: loadout.powerplant,
    energyId: loadout.energy,
    payloadIds: [...loadout.payloads],
    paint: 'stock',
    createdAt: now,
    updatedAt: now,
  }
}

/** Roles this aircraft actually has, either as parts or as a defined cut. */
/**
 * Slot order in the build panel. Roles the airframe already carries come first,
 * because those are what you are most likely to change; everything else follows
 * so it can still be bolted on.
 */
const ROLE_ORDER: PartRole[] = [
  'wing',
  'rotor',
  'tail',
  'gear',
  'payload',
  'hardpoint',
  'solar',
]

export function availableRoles(baseId: string): PartRole[] {
  const base = AIRCRAFT_BY_ID[baseId]
  if (!base) return []
  // Every swappable role is offered on every airframe. Restricting the list to
  // what a model happened to ship with meant you could not put solar panels on
  // a Reaper or hardpoints on a whoop, which is exactly the sort of thing this
  // is for. Roles the airframe already has sort to the top.
  const owned = new Set<PartRole>()
  for (const p of base.parts) if (p.swappable) owned.add(p.role)
  for (const role of Object.keys(base.cuts) as PartRole[]) owned.add(role)
  if (base.spec.wing_area_m2) owned.add('wing')
  return [...ROLE_ORDER].sort(
    (a, b) => Number(owned.has(b)) - Number(owned.has(a)),
  )
}

/** Every aircraft that can donate a given role, for the picker. */
export function donorsFor(role: PartRole) {
  return AIRCRAFT.filter((a) => a.parts.some((p) => p.role === role && p.swappable))
}

/**
 * Every part in the catalog that could be bolted into a slot it did not come
 * from — a Reaper's tail as a wing, an Ingenuity solar panel as a tailplane.
 *
 * This is the Lego drawer. Restricting each slot to parts of its own kind meant
 * twenty-seven aircraft offered a handful of choices per slot; letting a part
 * change job turns the same models into a few hundred.
 */
export function crossRolePartsFor(role: PartRole) {
  const out: { aircraft: (typeof AIRCRAFT)[number]; fromRole: PartRole }[] = []
  for (const a of AIRCRAFT) {
    const roles = new Set<PartRole>()
    for (const p of a.parts) if (p.swappable && p.role !== role) roles.add(p.role)
    for (const r of ROLE_ORDER) if (roles.has(r)) out.push({ aircraft: a, fromRole: r })
  }
  return out
}

export function slotLabel(build: Build, role: PartRole): string {
  const choice: SlotChoice = build.slots[role] ?? { kind: 'stock' }
  if (choice.kind === 'none') return 'Removed'
  if (choice.kind === 'stock') {
    const base = AIRCRAFT_BY_ID[build.baseId]
    // Same evidence rule the physics uses, so the label cannot disagree with
    // the stats panel about whether a wing is fitted.
    const has =
      base?.parts.some((p) => p.role === role) ||
      base?.cuts[role] ||
      (role === 'wing' && base?.spec.wing_area_m2)
    return has ? 'Standard' : 'Not fitted'
  }
  const donor = AIRCRAFT_BY_ID[choice.aircraftId]
  return donor ? donor.name : 'Unknown'
}

export function isChimera(build: Build): boolean {
  return Object.values(build.slots).some(
    (c) => c && (c.kind === 'none' || (c.kind === 'donor' && c.aircraftId !== build.baseId)),
  )
}

// ---------------------------------------------------------------------------
// Randomiser
// ---------------------------------------------------------------------------

const pick = <T,>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)]

/**
 * Roll a mongrel.
 *
 * Deliberately biased toward splicing rather than fairness: a uniformly random
 * build is mostly "stock" and looks like nothing happened. Every swappable role
 * gets a good chance of coming from a different aircraft, sizes are jittered,
 * and the powerplant is left free to be wildly unsuited to the airframe -
 * which is where the interesting verdicts come from.
 */
export function randomBuild(): Build {
  const base = pick(AIRCRAFT)
  const b = createBuild(base.id)
  const donors: string[] = []

  /** Angles and offsets, so a rolled build is not just a stock one recoloured. */
  const jitter = (role: PartRole) => ({
    fore: Math.round((Math.random() - 0.5) * 120) / 100,
    rise: Math.round((Math.random() - 0.5) * 100) / 100,
    ...(role === 'wing' || role === 'tail'
      ? {
          rollDeg: Math.round((Math.random() - 0.5) * 50),
          pitchDeg: Math.round((Math.random() - 0.5) * 24),
          yawDeg: Math.round((Math.random() - 0.5) * 60),
          ...(Math.random() < 0.25 ? { count: pick([2, 3]) } : {}),
        }
      : {}),
    ...(role === 'rotor'
      ? {
          count: pick([2, 3, 4, 6, 8]),
          tiltDeg: Math.random() < 0.3 ? pick([15, 45, 90]) : 0,
          spread: Math.round(Math.random() * 100) / 100,
          layout: pick(['ring', 'plus', 'tandem', 'stacked'] as const),
        }
      : {}),
  })

  for (const role of availableRoles(base.id)) {
    const sameRole = donorsFor(role).filter((a) => a.id !== base.id)
    const anyPart = crossRolePartsFor(role).filter((p) => p.aircraft.id !== base.id)
    const roll = Math.random()
    if (roll < 0.12) {
      b.slots[role] = { kind: 'none' }
    } else if (roll < 0.5 && sameRole.length) {
      const donor = pick(sameRole)
      donors.push(donor.name)
      b.slots[role] = {
        kind: 'donor',
        aircraftId: donor.id,
        scale: 0.5 + Math.random() * 1.6,
        ...jitter(role),
      }
    } else if (roll < 0.78 && anyPart.length) {
      // The good stuff: a part doing a job it was never built for.
      const part = pick(anyPart)
      donors.push(`${part.aircraft.name} ${part.fromRole}`)
      b.slots[role] = {
        kind: 'donor',
        aircraftId: part.aircraft.id,
        fromRole: part.fromRole,
        scale: 0.5 + Math.random() * 1.6,
        ...jitter(role),
      }
    } else {
      b.slots[role] = { kind: 'stock', scale: 0.7 + Math.random() * 1.1, ...jitter(role) }
    }
  }

  b.powerplantId = pick(POWERPLANTS).id
  b.energyId = pick(ENERGY_SOURCES).id
  b.payloadIds = [pick(PAYLOADS).id]
  b.paint = pick(PAINTS).id
  b.environment = pick(ENVIRONMENTS).id
  b.scale = 0.4 + Math.random() * 1.8
  b.name = donors.length ? `${base.name} / ${donors[0]} mongrel` : `${base.name} mongrel`
  return b
}
