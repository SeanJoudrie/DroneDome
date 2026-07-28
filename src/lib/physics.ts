/**
 * Performance model.
 *
 * Everything here uses real formulas with real constants. It is deliberately
 * simplified — momentum theory for rotors, a parabolic drag polar for wings,
 * Breguet for fuel-burning range — but the numbers mean something, and if you
 * change a part the number moves the way it would in life.
 *
 * It is not an engineering tool. Do not build anything from it.
 */
import type {
  Analysis,
  Balance,
  Build,
  AircraftModel,
  MassItem,
  PartRole,
  StatGroup,
  StatRow,
  Verdict,
  Warning,
} from '../types'
import {
  ENERGY_BY_ID,
  ENVIRONMENTS_BY_ID,
  PAYLOADS_BY_ID,
  POWERPLANTS_BY_ID,
} from '../data/catalog'
import { AIRCRAFT_BY_ID } from '../data/aircraft.generated'

/** How the empty airframe's mass is distributed across its parts. */
const STRUCTURE_FRACTION: Record<PartRole, number> = {
  body: 0.45,
  wing: 0.26,
  tail: 0.06,
  gear: 0.06,
  rotor: 0.1,
  arm: 0.04,
  hardpoint: 0.02,
  solar: 0.01,
  motor: 0,
  battery: 0,
  payload: 0,
}

const CL_MAX = 1.3
/** Zero-lift drag for a real airframe with antennas, joints and a sensor ball. */
const CD0_CLEAN = 0.035
const OSWALD = 0.82
/** Rotor figure of merit ceiling; the powerplant's own efficiency scales it. */
const PROP_EFFICIENCY = 0.85
/** Nobody lands on an empty tank. */
const FUEL_RESERVE = 0.9

/**
 * Air thins out exponentially with height. Aeroplanes exploit that: they climb
 * until the air is thin enough to go fast cheaply, which is why a Global Hawk
 * cruises at 570 km/h and not the 320 it would manage down here.
 */
function densityAt(surfaceRho: number, altitudeM: number, scaleHeight: number) {
  return surfaceRho * Math.exp(-Math.max(0, altitudeM) / scaleHeight)
}

/**
 * Rotors lose efficiency badly in thin air — blade Reynolds numbers collapse,
 * so Ingenuity's rotors are far worse than their Earth equivalents. Momentum
 * theory alone does not capture that, so scale the figure of merit by density.
 */
function densityFigureOfMerit(fom: number, rho: number) {
  return fom * clamp((rho / 1.225) ** 0.15, 0.35, 1)
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

function row(label: string, value: number, unit: StatRow['unit'], hint?: string): StatRow {
  return { label, value: Number.isFinite(value) ? value : 0, unit, hint }
}

/** Which aircraft supplies a given role, and at what size relative to the host. */
function resolveSlot(build: Build, base: AircraftModel, role: PartRole) {
  const choice = build.slots[role] ?? { kind: 'stock' as const }
  if (choice.kind === 'none') return null
  if (choice.kind === 'stock') {
    // A welded model has no separate node for the part, only a cut that removes
    // it — so a defined cut counts as the part being fitted.
    // Evidence the aircraft has this part: a classified mesh, a defined cut, or
    // - for a wing - the manifest's published wing area. The Cessna's wing is
    // welded into its fuselage so no wing mesh exists, but it certainly has one.
    const present =
      base.parts.some((p) => p.role === role) ||
      !!base.cuts[role] ||
      (role === 'wing' && !!base.spec.wing_area_m2)
    return present ? { donor: base, fitScale: choice.scale ?? 1, count: undefined } : null
  }
  const donor = AIRCRAFT_BY_ID[choice.aircraftId]
  if (!donor) return null
  // A borrowed part is resized to suit the host it is bolted to. Four 25 cm
  // quadcopter rotors on a 20 m Reaper are technically honest and visually
  // useless, so donor parts scale with the host's span — and because the
  // physics uses the same number, the result stays truthful either way.
  return {
    donor,
    fitScale: fitScaleFor(base, donor) * (choice.scale ?? 1),
    count: choice.count,
  }
}

/**
 * Longitudinal station of a role's parts, in metres aft of the model origin.
 * aftSign orients the axis so positive is always toward the tail, whichever
 * way the source model happened to be built.
 */
function stationOf(model: AircraftModel, role: PartRole): number | null {
  const ps = model.parts.filter((p) => p.role === role)
  if (!ps.length) return null
  const li = model.axes.length
  const mean = ps.reduce((sum, p) => sum + p.center[li], 0) / ps.length
  return mean * model.scaleToMetres * (model.aftSign || 1)
}

/** Planform area of a role's parts, m2, from their bounding boxes. */
function planformOf(model: AircraftModel, role: PartRole): number {
  const k = model.scaleToMetres * model.scaleToMetres
  const si = model.axes.span
  const li = model.axes.length
  return model.parts
    .filter((p) => p.role === role)
    .reduce((sum, p) => sum + p.size[si] * p.size[li] * k, 0)
}

export function fitScaleFor(host: AircraftModel, donor: AircraftModel) {
  return host.spec.span_m / (donor.spec.span_m || 1)
}

export function analyse(build: Build): Analysis {
  const base = AIRCRAFT_BY_ID[build.baseId]
  const env = ENVIRONMENTS_BY_ID[build.environment] ?? ENVIRONMENTS_BY_ID.earth
  const rho = env.airDensity
  const g = env.gravity
  const s = clamp(build.scale, 0.25, 4)

  const warnings: Warning[] = []
  const masses: MassItem[] = []

  // ---- mass ---------------------------------------------------------------
  // Structure follows the cube of scale while lifting surfaces follow the
  // square, which is why big aircraft are hard and small ones are easy.
  const s3 = s ** 3
  const s2 = s ** 2

  const bodyFraction =
    STRUCTURE_FRACTION.body + STRUCTURE_FRACTION.arm + STRUCTURE_FRACTION.motor
  let structure = base.spec.empty_mass_kg * bodyFraction * s3
  masses.push({ label: `${base.name} airframe`, kg: structure })

  const roles: PartRole[] = ['wing', 'tail', 'rotor', 'gear', 'hardpoint', 'solar']
  const fitted: Partial<Record<PartRole, ReturnType<typeof resolveSlot>>> = {}
  for (const role of roles) {
    const slot = resolveSlot(build, base, role)
    fitted[role] = slot
    if (!slot) continue
    const frac = STRUCTURE_FRACTION[role]
    const kg = slot.donor.spec.empty_mass_kg * frac * s3 * slot.fitScale ** 3
    if (kg > 0.0001) {
      structure += kg
      const borrowed = slot.donor.id !== base.id
      masses.push({
        label: borrowed ? `${slot.donor.name} ${role}` : `${role}`,
        kg,
      })
    }
  }

  const plant = POWERPLANTS_BY_ID[build.powerplantId]
  const energy = ENERGY_BY_ID[build.energyId]

  const rotorSlot = fitted.rotor
  const wingSlot = fitted.wing
  const hasWing = !!wingSlot

  let rotorCount = 0
  if (rotorSlot) {
    const donorSpec = rotorSlot.donor.spec
    // Default carefully: a winged aircraft with an unspecified rotor count has
    // a propeller, not a quadcopter's worth of lift rotors. Getting this wrong
    // makes a Cessna try to hover on its piston engine and fail.
    const winged = !!(base.spec.wing_area_m2 || base.parts.some((p) => p.role === 'wing'))
    rotorCount = rotorSlot.count ?? donorSpec.rotors ?? base.spec.rotors ?? (winged ? 1 : 4)
  }

  // One or two propellers on a winged aircraft are propulsion, not lift. Three
  // or more, or any rotors with no wing, and the thing is holding itself up on
  // its rotors — which is a completely different set of sums.
  const hasRotors = rotorCount > 0 && (rotorCount >= 3 || !hasWing)

  const plantCount = hasRotors ? Math.max(1, rotorCount) : 1
  const plantMass = (plant?.massKg ?? 0) * plantCount * s3
  if (plantMass > 0) {
    masses.push({ label: plant ? `${plant.name}${plantCount > 1 ? ` ×${plantCount}` : ''}` : 'Powerplant', kg: plantMass })
  }

  const energyMass = (energy?.massKg ?? 0) * s3
  const fuelMass = (energy?.fuelKg ?? 0) * s3
  if (energyMass > 0) masses.push({ label: energy?.name ?? 'Energy', kg: energyMass })
  if (fuelMass > 0) masses.push({ label: 'Fuel', kg: fuelMass })

  let payloadMass = 0
  let payloadDrawW = 0
  let payloadDragArea = 0
  for (const pid of build.payloadIds) {
    const p = PAYLOADS_BY_ID[pid]
    if (!p || p.massKg === 0) continue
    payloadMass += p.massKg * s3
    payloadDrawW += p.drawW * s2
    payloadDragArea += p.dragAreaM2 * s2
    masses.push({ label: p.name, kg: p.massKg * s3 })
  }

  const dryMass = structure + plantMass + energyMass + payloadMass
  const totalMass = dryMass + fuelMass
  const weight = totalMass * g

  // ---- available power ----------------------------------------------------
  const isJet = !!plant?.thrustN
  const shaftKw = (plant?.powerKw ?? 0) * plantCount * s2
  const shaftW = shaftKw * 1000
  const jetThrust = (plant?.thrustN ?? 0) * s2

  // Aircraft cruise at roughly half their service ceiling. Rotor and takeoff
  // figures stay at the surface density the user selected, because that is
  // where hovering and leaving the ground actually happen.
  const cruiseAltitude = hasWing ? (base.spec.ceiling_m || 0) * 0.5 : 0
  const cruiseRho = densityAt(rho, cruiseAltitude, env.scaleHeight)

  const groups: StatGroup[] = []

  // ---- rotor performance --------------------------------------------------
  let staticThrust = 0
  let twr = 0
  let hoverPowerW = 0
  let hoverThrottle = 0
  if (hasRotors && rotorCount > 0) {
    const donorSpec = rotorSlot!.donor.spec
    const dia = (donorSpec.rotor_diameter_m ?? 0.25) * s * rotorSlot!.fitScale
    const discPerRotor = (Math.PI * dia * dia) / 4
    const coaxLoss = donorSpec.coaxial ? 0.82 : 1
    const disc = discPerRotor * rotorCount * coaxLoss
    const fom = densityFigureOfMerit(clamp(plant?.efficiency ?? 0.7, 0.3, 0.9), rho)

    // Momentum theory, inverted: for a given shaft power, how much static
    // thrust can the disc actually produce?  T = ((P·FoM)² · 2ρA)^(1/3)
    if (shaftW > 0 && disc > 0) {
      staticThrust = Math.cbrt((shaftW * fom) ** 2 * 2 * rho * disc)
    }
    twr = weight > 0 ? staticThrust / weight : 0

    // ...and the reverse for hovering: P = T^1.5 / (√(2ρA) · FoM)
    if (disc > 0 && weight > 0) {
      hoverPowerW = weight ** 1.5 / (Math.sqrt(2 * rho * disc) * fom)
    }
    hoverThrottle = shaftW > 0 ? hoverPowerW / shaftW : Infinity

    groups.push({
      title: 'Rotors',
      rows: [
        row('Rotors', rotorCount, 'none'),
        row('Rotor diameter', dia, 'm'),
        row('Total disc area', disc, 'm2'),
        row('Disc loading', weight / Math.max(disc, 1e-6), 'loading', 'N per m² of disc — high means loud and inefficient'),
        row('Static thrust', staticThrust, 'force_n', 'what the rotors can push at full power'),
        { ...row('Thrust-to-weight', twr, 'ratio', 'below 1.0 it cannot lift itself'),
          gauge: { max: 8, floor: 1 } },
        row('Hover power', hoverPowerW, 'power_w'),
        { ...row('Hover throttle', clamp(hoverThrottle, 0, 2) * 100, 'percent'),
          gauge: { max: 100, invert: true } },
      ],
    })
  }

  // ---- wing performance ---------------------------------------------------
  let stallSpeed = 0
  let cruiseSpeed = 0
  let maxSpeed = 0
  let liftToDrag = 0
  let cruisePowerW = 0
  let wingArea = 0
  let aspectRatioUsed = 6
  if (hasWing) {
    const donorSpec = wingSlot!.donor.spec
    const fit = wingSlot!.fitScale
    wingArea = (donorSpec.wing_area_m2 ?? (donorSpec.span_m * donorSpec.span_m) / 12) * s2 * fit ** 2
    const span = donorSpec.span_m * s * fit
    const aspect = wingArea > 0 ? (span * span) / wingArea : 6
    aspectRatioUsed = aspect

    stallSpeed = Math.sqrt((2 * weight) / (cruiseRho * wingArea * CL_MAX))

    const cd0 = CD0_CLEAN + payloadDragArea / Math.max(wingArea, 1e-6)
    liftToDrag = 0.5 * Math.sqrt((Math.PI * aspect * OSWALD) / cd0)

    // Cruise at best lift-to-drag: CL where induced drag equals parasite drag.
    // A propeller aircraft ranges furthest exactly there; a jet ranges furthest
    // about 3^(1/4) faster, which is why airliners cruise fast and gliders don't.
    // On a very high aspect ratio wing the best-L/D lift coefficient can exceed
    // CL_max, which would put cruise below the stall. Cap it well clear.
    const clBest = Math.min(Math.sqrt(cd0 * Math.PI * aspect * OSWALD), CL_MAX * 0.75)
    const bestLdSpeed = Math.sqrt((2 * weight) / (cruiseRho * wingArea * clBest))
    cruiseSpeed = bestLdSpeed * (isJet ? Math.pow(3, 0.25) : 1)
    // Lift-to-drag actually achieved at that cruise point, not the ideal best.
    const cdCruise = cd0 + (clBest * clBest) / (Math.PI * aspect * OSWALD)
    liftToDrag = Math.min(liftToDrag, clBest / cdCruise)
    const dragAtCruise = weight / liftToDrag
    cruisePowerW = (dragAtCruise * cruiseSpeed) / (isJet ? 1 : PROP_EFFICIENCY)

    // Top speed: where available thrust equals drag. Solved by bisection
    // because drag has both a parasite term rising with V² and an induced term
    // falling with V².
    const thrustAvail = isJet
      ? jetThrust
      : cruiseSpeed > 0
        ? (shaftW * PROP_EFFICIENCY) / Math.max(cruiseSpeed, 1)
        : 0
    maxSpeed = solveMaxSpeed(cruiseRho, wingArea, cd0, aspect, weight, shaftW, jetThrust, isJet)
    if (!Number.isFinite(maxSpeed) || maxSpeed <= 0) maxSpeed = cruiseSpeed
    void thrustAvail

    groups.push({
      title: 'Wing',
      rows: [
        row('Wing area', wingArea, 'm2'),
        row('Wingspan', span, 'm'),
        row('Aspect ratio', aspect, 'ratio', 'long thin wings glide better'),
        row('Wing loading', weight / Math.max(wingArea, 1e-6), 'loading', 'N per m² — high means fast and unforgiving'),
        { ...row('Lift-to-drag', liftToDrag, 'ratio', 'metres forward per metre down with the power off'),
          gauge: { max: 30 } },
        row('Stall speed', stallSpeed, 'speed', 'slowest it can fly before falling out of the sky'),
        row('Cruise speed', cruiseSpeed, 'speed'),
        row('Top speed', maxSpeed, 'speed'),
        row('Cruise altitude', cruiseAltitude, 'm', 'speeds are computed for the thinner air up here'),
      ],
    })
  }

  // ---- energy and endurance ----------------------------------------------
  const avionicsW = 8 * s2 + payloadDrawW
  const cruiseDrawW = (hasWing ? cruisePowerW : hoverPowerW) + avionicsW
  let enduranceH = 0
  let rangeKm = 0
  let burnKgH = 0
  const energyRows: StatRow[] = []

  const kind = plant?.kind ?? 'electric'
  if (kind === 'fuel' || kind === 'hybrid') {
    if (isJet) {
      // Turbofans burn by thrust-hour, not by shaft power. tsfc is already
      // per hour, so this is a straight multiply.
      const cruiseThrust = hasWing ? weight / Math.max(liftToDrag, 1) : jetThrust
      burnKgH = cruiseThrust * (plant?.tsfcKgPerNH ?? 0.06)
    } else {
      const cruiseKw = cruiseDrawW / 1000
      burnKgH = cruiseKw * (plant?.sfcKgPerKwh ?? 0.33)
    }
    const usableFuel = fuelMass * FUEL_RESERVE
    enduranceH = burnKgH > 0 ? usableFuel / burnKgH : 0

    // Breguet: an aircraft gets lighter as it burns, so the back half of a
    // flight is cheaper than the front half.
    if (hasWing && usableFuel > 0 && liftToDrag > 0) {
      const w0 = totalMass
      const w1 = Math.max(totalMass - usableFuel, 0.001)
      if (isJet) {
        // jet Breguet: R = (V / (g · c_T)) · (L/D) · ln(W0/W1)
        const tsfcPerS = (plant?.tsfcKgPerNH ?? 0.06) / 3600
        const rangeM = (cruiseSpeed / (g * tsfcPerS)) * liftToDrag * Math.log(w0 / w1)
        rangeKm = rangeM / 1000
        enduranceH = cruiseSpeed > 0 ? rangeM / cruiseSpeed / 3600 : enduranceH
      } else {
        // propeller Breguet: R = (η / (g · c)) · (L/D) · ln(W0/W1)
        const cSi = (plant?.sfcKgPerKwh ?? 0.33) / 3.6e6 // kg per watt-second
        const rangeM = (PROP_EFFICIENCY / (g * cSi)) * liftToDrag * Math.log(w0 / w1)
        rangeKm = rangeM / 1000
        enduranceH = cruiseSpeed > 0 ? rangeM / cruiseSpeed / 3600 : enduranceH
      }
    } else if (cruiseSpeed > 0) {
      rangeKm = (cruiseSpeed * 3.6 * enduranceH)
    }
    energyRows.push(
      row('Fuel load', fuelMass, 'kg'),
      row('Burn rate', burnKgH, 'rate_kg_h'),
      { ...row('Endurance', enduranceH, 'time_h'),
        gauge: { max: Math.max(enduranceH * 1.4, 1) } },
    )
    if (rangeKm > 0) energyRows.push(row('Range', rangeKm, 'distance_km'))
  } else {
    const wh = (energy?.wh ?? 0) * s3
    const solarW = (energy?.solarW ?? 0) * s2
    const netDrawW = Math.max(cruiseDrawW - (kind === 'solar' ? solarW : 0), 1e-6)
    // 85% of a pack is usable; running one flat ruins it.
    enduranceH = wh > 0 ? (wh * 0.85) / netDrawW : 0
    const speedForRange = hasWing ? cruiseSpeed : Math.min(maxSpeed || 8, 12)
    rangeKm = speedForRange * 3.6 * enduranceH
    energyRows.push(
      row('Usable energy', wh * 0.85, 'energy_wh'),
      row('Power draw', cruiseDrawW, 'power_w'),
    )
    if (solarW > 0) energyRows.push(row('Solar input', solarW, 'power_w'))
    energyRows.push(
      { ...row(hasWing ? 'Endurance' : 'Hover time', enduranceH, 'time_h'),
        gauge: { max: Math.max(enduranceH * 1.4, 0.5) } },
      row('Range', rangeKm, 'distance_km'),
    )
  }

  // ---- payload capacity ---------------------------------------------------
  let extraPayloadKg = 0
  if (hasRotors) {
    // Keep 1.5:1 thrust-to-weight so it stays controllable, not just airborne.
    const liftableWeight = staticThrust / 1.5
    extraPayloadKg = Math.max(0, liftableWeight / g - totalMass)
  } else if (hasWing) {
    // Structural limit first — that is what a published MTOW actually is — and
    // then a wing-loading sanity check for anything wearing borrowed wings.
    const structuralMax = base.spec.mtow_kg * s3
    const wingLoadingMax = (2600 * wingArea) / g
    extraPayloadKg = Math.max(0, Math.min(structuralMax, wingLoadingMax) - totalMass)
  }

  groups.push({ title: kind === 'fuel' || kind === 'hybrid' ? 'Fuel & endurance' : 'Energy & endurance', rows: energyRows })

  const overall: StatRow[] = [
    row('Takeoff weight', totalMass, 'kg'),
    row('Dry weight', dryMass, 'kg'),
    { ...row('Spare payload', extraPayloadKg, 'kg', 'what you can add and still fly'),
      gauge: { max: Math.max(extraPayloadKg, totalMass * 0.5, 0.01) } },
  ]
  if (hasWing) overall.push(row('Top speed', maxSpeed, 'speed'))
  else if (hasRotors) {
    // A multirotor's top speed comes from how far it can tilt.
    const tilt = twr > 1 ? Math.acos(1 / twr) : 0
    const horiz = weight * Math.tan(tilt)
    // Frontal area has to follow the airframe's actual size — a fixed constant
    // gives a ten-tonne machine the drag of a 5-inch quad and top speeds in the
    // thousands. Roughly 5% of span² is about right for a tilted multirotor.
    const spanNow = base.spec.span_m * s
    const frontal = Math.max(0.05 * spanNow * spanNow + payloadDragArea, 1e-4)
    maxSpeed = horiz > 0 ? Math.sqrt((2 * horiz) / (rho * frontal * 1.1)) : 0
    overall.push(row('Top speed', maxSpeed, 'speed', 'set by how far it can lean before it stops climbing'))
    overall.push(row('Max lean angle', (tilt * 180) / Math.PI, 'none'))
  }
  groups.unshift({ title: 'Overall', rows: overall })

  // ---- warnings -----------------------------------------------------------
  if (!plant) warnings.push({ severity: 'warn', text: 'No powerplant fitted.' })
  if (!energy) warnings.push({ severity: 'warn', text: 'No energy source fitted.' })
  if (plant && energy) {
    const wantsFuel = plant.kind === 'fuel' || plant.kind === 'hybrid'
    if (wantsFuel && energy.kind !== 'fuel') {
      warnings.push({ severity: 'warn', text: `${plant.name} burns fuel, but you have fitted a ${energy.kind} source. It will not run.` })
    }
    if (!wantsFuel && energy.kind === 'fuel') {
      warnings.push({ severity: 'warn', text: `${plant.name} is electric — a fuel tank is just ballast.` })
    }
  }
  if (hasRotors && twr > 0 && twr < 1.5 && twr >= 1) {
    warnings.push({ severity: 'warn', text: `Thrust-to-weight is only ${twr.toFixed(2)}:1. It will hover, but it will not manoeuvre.` })
  }
  if (hasWing && hasRotors) {
    warnings.push({ severity: 'info', text: 'Wings and rotors together: the wings add drag in a hover and the rotors add drag in cruise. Real VTOLs accept this trade deliberately.' })
  }
  if (hasWing && !hasRotors && stallSpeed > 0 && maxSpeed > 0 && stallSpeed > maxSpeed * 0.9) {
    warnings.push({ severity: 'warn', text: 'Stall speed is close to top speed. There is almost no usable flight envelope.' })
  }
  if (build.environment === 'mars' && !hasRotors) {
    warnings.push({ severity: 'info', text: 'Mars has 1.6% of Earth\'s air density. Wings there need to be enormous or very fast.' })
  }
  if (s > 2) {
    warnings.push({ severity: 'info', text: `Scaled to ${s.toFixed(2)}×: mass has grown ${(s ** 3).toFixed(1)}× but lifting area only ${(s ** 2).toFixed(1)}×. That is the square-cube law, and it is why big aircraft are hard.` })
  }
  for (const role of roles) {
    const slot = fitted[role]
    if (!slot || slot.donor.id === base.id) continue
    if (slot.fitScale > 3 || slot.fitScale < 0.34) {
      warnings.push({
        severity: 'info',
        text: `The ${slot.donor.name} ${role} has been resized ${slot.fitScale.toFixed(1)}× to fit this airframe. Its performance is scaled to match, not borrowed wholesale.`,
      })
    }
  }
  if (hoverThrottle > 0.8 && hoverThrottle < Infinity && hasRotors) {
    warnings.push({ severity: 'warn', text: `Hovering needs ${(hoverThrottle * 100).toFixed(0)}% throttle. Nothing left for control.` })
  }

  // ---- balance ------------------------------------------------------------
  // Where the mass sits, versus where the lift acts. This is what actually
  // decides whether a spliced airframe is controllable, and it is the reason
  // bolting a Reaper tail onto a quadcopter is not a free upgrade.
  const bodyStation = stationOf(base, 'body') ?? 0
  const stationFor = (role: PartRole): number => {
    const slot = fitted[role]
    if (!slot) return bodyStation
    // A borrowed part mounts where the host carries that role; if the host has
    // no such station, fall back to the donor's own proportions on this frame.
    return (
      stationOf(base, role) ??
      (stationOf(slot.donor, role) ?? 0) * (base.spec.span_m / (slot.donor.spec.span_m || 1))
    )
  }

  let momentSum = 0
  let massSum = 0
  const addMoment = (kg: number, station: number) => {
    momentSum += kg * station * s
    massSum += kg
  }
  addMoment(base.spec.empty_mass_kg * bodyFraction * s3, bodyStation)
  for (const role of roles) {
    const slot = fitted[role]
    if (!slot) continue
    addMoment(
      slot.donor.spec.empty_mass_kg * STRUCTURE_FRACTION[role] * s3 * slot.fitScale ** 3,
      stationFor(role),
    )
  }
  // Engines, tanks and packs live in the fuselage; equipment hangs where the
  // airframe carries its payload.
  addMoment(plantMass + energyMass + fuelMass, bodyStation)
  addMoment(payloadMass, stationFor('payload'))

  const cgM = massSum > 0 ? momentSum / massSum : 0

  let macM: number | null = null
  let neutralPointM: number | null = null
  let staticMarginPct: number | null = null
  let rotorOffsetRatio: number | null = null

  if (hasWing && wingArea > 0) {
    const wingStation = stationFor('wing')
    const span = Math.sqrt(Math.max(wingArea, 1e-9) * Math.max(aspectRatioUsed, 1e-9))
    macM = wingArea / Math.max(span, 1e-6)
    // Aerodynamic centre sits about a quarter chord back from the leading edge,
    // which is forward of the panel's centroid.
    const wingAc = wingStation - 0.25 * macM
    const tailSlot = fitted.tail
    let npShift = 0
    if (tailSlot) {
      const tailArea = planformOf(base, 'tail') * s2 * tailSlot.fitScale ** 2
      const armM = (stationFor('tail') - wingAc) * s
      if (tailArea > 0 && armM > 0) {
        // Horizontal tail volume coefficient, with the usual lift-slope and
        // downwash allowance folded into one factor.
        const vh = (tailArea * armM) / (wingArea * macM)
        npShift = vh * 0.55 * macM
      }
    }
    neutralPointM = wingAc + npShift
    staticMarginPct = ((neutralPointM - cgM) / macM) * 100
  }

  if (hasRotors && rotorCount > 0) {
    // Rotors are spread evenly about the airframe, so their centroid is the
    // body station; what matters is how far the mass has drifted from it.
    const armM = Math.max(base.spec.span_m * 0.4 * s, 1e-6)
    rotorOffsetRatio = Math.abs(cgM - bodyStation * s) / armM
  }

  const balance: Balance = { cgM, neutralPointM, macM, staticMarginPct, rotorOffsetRatio }

  const balanceRows: StatRow[] = [row('Centre of gravity', cgM, 'm', 'positive is aft of the airframe origin')]
  if (macM !== null) balanceRows.push(row('Mean chord', macM, 'm'))
  if (neutralPointM !== null) balanceRows.push(row('Neutral point', neutralPointM, 'm'))
  if (staticMarginPct !== null) {
    balanceRows.push({
      ...row('Static margin', staticMarginPct, 'percent', 'of mean chord; 5-15% is a well-behaved aeroplane'),
      gauge: { max: 30, floor: 0 },
    })
  }
  if (rotorOffsetRatio !== null) {
    balanceRows.push({
      ...row('CG offset', rotorOffsetRatio * 100, 'percent', 'of arm length; past ~20% it cannot trim level'),
      gauge: { max: 40, invert: true },
    })
  }
  groups.push({ title: 'Balance', rows: balanceRows })

  if (staticMarginPct !== null) {
    if (staticMarginPct < 0) {
      warnings.push({
        severity: 'warn',
        text: `Static margin is ${staticMarginPct.toFixed(1)}% — the centre of gravity is behind the neutral point. It will pitch up until it stalls, and keep doing it.`,
      })
    } else if (staticMarginPct > 25) {
      warnings.push({
        severity: 'warn',
        text: `Static margin is ${staticMarginPct.toFixed(0)}% — nose-heavy to the point that the tail may not have the authority to rotate for takeoff.`,
      })
    }
  }
  if (rotorOffsetRatio !== null && rotorOffsetRatio > 0.2) {
    warnings.push({
      severity: 'warn',
      text: `The centre of gravity sits ${(rotorOffsetRatio * 100).toFixed(0)}% of an arm length off the rotor centroid. It will lean permanently and burn thrust fighting itself.`,
    })
  }

  return {
    massKg: totalMass,
    balance,
    masses,
    groups,
    verdict: judge({ hasRotors, hasWing, twr, enduranceH, stallSpeed, maxSpeed, plantOk: !!plant, energyOk: !!energy, shaftW, jetThrust, hoverThrottle }),
    warnings,
    hasRotors,
    hasWing,
  }
}

function solveMaxSpeed(
  rho: number,
  area: number,
  cd0: number,
  aspect: number,
  weight: number,
  shaftW: number,
  jetThrust: number,
  isJet: boolean,
) {
  const drag = (v: number) => {
    const q = 0.5 * rho * v * v
    const cl = q > 0 ? weight / (q * area) : 0
    const cd = cd0 + (cl * cl) / (Math.PI * aspect * OSWALD)
    return q * area * cd
  }
  const thrust = (v: number) => (isJet ? jetThrust : v > 0.5 ? (shaftW * PROP_EFFICIENCY) / v : Infinity)

  let lo = 1
  let hi = 400
  if (thrust(hi) > drag(hi)) return hi
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (thrust(mid) > drag(mid)) lo = mid
    else hi = mid
  }
  return lo
}

function judge(x: {
  hasRotors: boolean
  hasWing: boolean
  twr: number
  enduranceH: number
  stallSpeed: number
  maxSpeed: number
  plantOk: boolean
  energyOk: boolean
  shaftW: number
  jetThrust: number
  hoverThrottle: number
}): Verdict {
  if (!x.hasRotors && !x.hasWing) {
    return { level: 'grounded', headline: 'Not an aircraft', reason: 'Nothing here generates lift. It is a very expensive brick.' }
  }
  if (!x.plantOk || (x.shaftW <= 0 && x.jetThrust <= 0)) {
    return { level: 'grounded', headline: 'No power', reason: 'There is no engine turning anything.' }
  }
  if (!x.energyOk || x.enduranceH <= 0) {
    return { level: 'grounded', headline: 'Nothing in the tank', reason: 'Power but no energy to feed it. It will not start.' }
  }
  if (x.hasRotors && x.twr < 1) {
    return {
      level: 'grounded',
      headline: 'Will not leave the ground',
      reason: `Thrust is ${x.twr.toFixed(2)}× its weight. It needs to be over 1.0 just to hover.`,
    }
  }
  if (x.hasWing && !x.hasRotors && x.stallSpeed > x.maxSpeed) {
    return {
      level: 'grounded',
      headline: 'Cannot reach flying speed',
      reason: `It stalls at ${(x.stallSpeed * 3.6).toFixed(0)} km/h but can only manage ${(x.maxSpeed * 3.6).toFixed(0)} km/h. It will never get airborne.`,
    }
  }
  if (x.hasRotors && x.twr < 1.3) {
    return {
      level: 'bad',
      headline: 'Flies, barely',
      reason: `At ${x.twr.toFixed(2)}:1 it can hover and almost nothing else. Any gust wins.`,
    }
  }
  if (x.enduranceH < 0.05) {
    return {
      level: 'bad',
      headline: 'Flies, briefly',
      reason: `${Math.round(x.enduranceH * 60)} minutes of endurance. Barely worth the walk to the field.`,
    }
  }
  if (x.hasRotors && x.hoverThrottle > 0.75) {
    return {
      level: 'marginal',
      headline: 'Flies, with nothing spare',
      reason: `Hovering alone takes ${(x.hoverThrottle * 100).toFixed(0)}% throttle. There is no margin for wind or manoeuvring.`,
    }
  }
  if (x.hasWing && x.hasRotors) {
    return {
      level: 'marginal',
      headline: 'Flies, awkwardly',
      reason: 'Rotors and wings both work, and each spends the flight getting in the other\'s way. Real VTOLs do this on purpose.',
    }
  }
  if (x.hasRotors && x.twr > 6) {
    return {
      level: 'good',
      headline: 'Alarmingly overpowered',
      reason: `${x.twr.toFixed(1)}:1 thrust-to-weight. This thing accelerates like a startled wasp.`,
    }
  }
  if (x.enduranceH > 10) {
    return {
      level: 'good',
      headline: 'Flies, and keeps flying',
      reason: `${x.enduranceH.toFixed(1)} hours aloft. You will get bored before it does.`,
    }
  }
  return {
    level: 'good',
    headline: 'Actually pretty good',
    reason: 'The numbers all sit where they should. This would fly.',
  }
}
