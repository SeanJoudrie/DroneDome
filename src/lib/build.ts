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
export function availableRoles(baseId: string): PartRole[] {
  const base = AIRCRAFT_BY_ID[baseId]
  if (!base) return []
  const present = new Set<PartRole>()
  for (const p of base.parts) if (p.swappable) present.add(p.role)
  for (const role of Object.keys(base.cuts) as PartRole[]) present.add(role)
  // Rotors and wings can always be added, even to something that never had them —
  // that is the entire point of the thing.
  present.add('rotor')
  present.add('wing')
  return [...present]
}

/** Every aircraft that can donate a given role, for the picker. */
export function donorsFor(role: PartRole) {
  return AIRCRAFT.filter((a) => a.parts.some((p) => p.role === role && p.swappable))
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

  for (const role of availableRoles(base.id)) {
    const options = donorsFor(role).filter((a) => a.id !== base.id)
    const roll = Math.random()
    if (roll < 0.15) {
      b.slots[role] = { kind: 'none' }
    } else if (roll < 0.7 && options.length) {
      const donor = pick(options)
      donors.push(donor.name)
      b.slots[role] = {
        kind: 'donor',
        aircraftId: donor.id,
        scale: 0.5 + Math.random() * 1.6,
        ...(role === 'rotor' ? { count: pick([2, 3, 4, 6, 8]) } : {}),
      }
    } else {
      b.slots[role] = { kind: 'stock', scale: 0.7 + Math.random() * 1.1 }
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
