import type { Build, PartRole, SlotChoice } from '../types'
import { AIRCRAFT, AIRCRAFT_BY_ID } from '../data/aircraft.generated'

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
    const has = base?.parts.some((p) => p.role === role) || base?.cuts[role]
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
