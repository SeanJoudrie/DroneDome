/** Roles a piece of an aircraft can play. Assigned by scripts/classify.py. */
export type PartRole =
  | 'body'
  | 'wing'
  | 'tail'
  | 'rotor'
  | 'arm'
  | 'gear'
  | 'payload'
  | 'hardpoint'
  | 'solar'
  | 'motor'
  | 'battery'

/** Roles the builder lets you remove or replace. */
export const SWAPPABLE_ROLES: PartRole[] = [
  'wing',
  'tail',
  'rotor',
  'gear',
  'payload',
  'solar',
  'hardpoint',
]

export interface AircraftPart {
  /** Unique node name inside the GLB. */
  node: string
  /** Several nodes can belong to one physical part; this is what the UI shows. */
  group: string
  role: PartRole
  side: 'left' | 'right' | 'center'
  /** Centre relative to the model origin, in model units. */
  center: [number, number, number]
  size: [number, number, number]
  swappable: boolean
}

/**
 * A region of a welded mesh to clip away. Used when a part can't be a separate
 * node — NASA's Global Hawk has its wings fused into the fuselage primitive, so
 * "remove the wings" means "keep only the centre band".
 */
export interface AircraftCut {
  /** Index (0/1/2) of the axis to cut along, in model space. */
  axis: number
  axisName: 'span' | 'length' | 'vertical'
  /** Half-width of the band to keep, in model units. */
  keep: number
  origin: number
  /**
   * Optional fore/aft and vertical limits, in model units either side of the
   * centre, that close the other two faces of the box. Without them the cut is
   * an infinite slab and takes the tailplane off with the wings.
   */
  bandLength?: [number, number]
  bandVertical?: [number, number]
}

export type Powertrain = 'electric' | 'fuel' | 'hybrid' | 'solar'

export interface AircraftSpec {
  span_m: number
  length_m: number
  wing_area_m2?: number
  empty_mass_kg: number
  mtow_kg: number
  powertrain: Powertrain
  payload_kg: number
  cruise_kmh: number
  max_speed_kmh: number
  endurance_h: number
  ceiling_m: number

  // fuel-burning
  fuel_capacity_kg?: number
  engine?: string
  shaft_power_kw?: number
  sfc_kg_per_kwh?: number
  thrust_n?: number
  tsfc_kg_per_n_h?: number
  prop_diameter_m?: number
  prop_blades?: number

  // electric
  rotors?: number
  coaxial?: boolean
  rotor_diameter_m?: number
  rotor_rpm?: number
  motor_kv?: number
  battery_wh?: number
  battery_cells?: number
  solar_w?: number
}

export interface Credit {
  author: string
  license: string
  licenseName: string
  url: string
}

export interface AircraftModel {
  id: string
  name: string
  family: 'military' | 'consumer' | 'hobby' | 'experimental'
  blurb: string
  environment: EnvironmentId
  /** Path relative to the app base. */
  model: string
  spec: AircraftSpec
  axes: { span: number; length: number; vertical: number }
  aftSign: number
  /** Multiply model units by this to get metres. */
  scaleToMetres: number
  modelExtent: [number, number, number]
  origin: [number, number, number]
  cuts: Partial<Record<PartRole, AircraftCut>>
  /**
   * Nodes that are in the file but are not the aircraft — a display stand, the
   * flight case the Matrice ships in. Never drawn, never measured.
   */
  hidden: string[]
  parts: AircraftPart[]
  credit: Credit
}

// ---------------------------------------------------------------------------
// The build
// ---------------------------------------------------------------------------

/**
 * What's fitted in one role slot.
 *  stock — whatever the base aircraft came with
 *  none  — stripped off
 *  donor — the same part borrowed from a different aircraft, which is how you
 *          end up with a Reaper on quadcopter rotors
 *
 * `scale` is always a user multiplier on top of whatever size the part would
 * naturally be, so 1 means "as it comes" for both stock and borrowed parts.
 */
/**
 * Where a fitted part sits and how it is angled, as fractions of the airframe's
 * own size so the same numbers mean the same thing on a whoop and a Global
 * Hawk. This is what lets one donor part make a dozen different aircraft.
 */
export interface SlotPlacement {
  /** Fore and aft, -1 (nose) to 1 (tail). */
  fore?: number
  /** Up and down, -1 (below) to 1 (above). */
  rise?: number
  /** Outboard spread, 0 (centreline) to 1 (wingtip). Rotors and pairs only. */
  spread?: number
  /** Rotor tilt, 0 = lifting straight up, 90 = pointing forward. */
  tiltDeg?: number
  /** How multiples are arranged. 'stacked' on a wing makes a biplane. */
  layout?: 'ring' | 'plus' | 'tandem' | 'stacked'
  /** Roll about the fuselage axis. On a wing this is dihedral. */
  rollDeg?: number
  /** Pitch. On a wing this is incidence; on a tail, trim. */
  pitchDeg?: number
  /** Yaw. On a wing this is sweep. */
  yawDeg?: number
}

export type SlotChoice =
  | ({ kind: 'stock'; scale?: number; count?: number } & SlotPlacement)
  | { kind: 'none' }
  | ({
      kind: 'donor'
      aircraftId: string
      /**
       * Which of the donor's roles to take the mesh from. Defaults to the slot
       * it is going into, which is the ordinary case — a wing for a wing. Set it
       * to something else and the part changes job: a Reaper's tail bolted on
       * as a wing is a wing, and is measured and flown as one.
       */
      fromRole?: PartRole
      count?: number
      scale?: number
    } & SlotPlacement)

export interface Build {
  /** Schema version. Lets a future change reject builds it cannot read. */
  v?: number
  id: string
  name: string
  /** Base aircraft this started from. */
  baseId: string
  /** 0.25 – 4. Mass scales with the cube, area with the square. */
  scale: number
  environment: EnvironmentId
  slots: Partial<Record<PartRole, SlotChoice>>
  powerplantId: string
  energyId: string
  /** Extra carried mass, in kg, before scaling. */
  payloadIds: string[]
  paint: string
  createdAt: number
  updatedAt: number
}

// ---------------------------------------------------------------------------
// Catalog items
// ---------------------------------------------------------------------------

export interface Powerplant {
  id: string
  name: string
  kind: Powertrain
  /** Continuous shaft power, kW. Turbofans use thrustN instead. */
  powerKw?: number
  thrustN?: number
  /** Specific fuel consumption. kg/kWh for shaft engines. */
  sfcKgPerKwh?: number
  /** Thrust-specific fuel consumption, kg per newton per hour. */
  tsfcKgPerNH?: number
  massKg: number
  /** Fraction of shaft power that reaches the air. */
  efficiency: number
  note: string
}

export interface EnergySource {
  id: string
  name: string
  kind: 'battery' | 'fuel' | 'solar'
  /** Usable energy, Wh (batteries). */
  wh?: number
  /** Fuel mass, kg. */
  fuelKg?: number
  /** Continuous generated power, W (solar). */
  solarW?: number
  /**
   * Continuous discharge rating. Peak power a pack can deliver is its energy
   * in watt-hours times this, which is why a 22 Wh race pack at 75C outruns a
   * 266 Wh Li-ion brick at 10C.
   */
  cRating?: number
  massKg: number
  note: string
}

export interface PayloadItem {
  id: string
  name: string
  massKg: number
  /** Continuous electrical draw, W. */
  drawW: number
  /** Extra parasite drag area, m². */
  dragAreaM2: number
  note: string
  /**
   * Where to borrow a model for this from. The catalog already contains a
   * sensor turret, weapon pylons and camera blocks on real aircraft, so
   * equipment reuses those rather than inventing shapes.
   */
  mesh?: {
    aircraftId: string
    role: PartRole
    /**
     * Real length of the longest side, in metres. The borrowed mesh is
     * normalised to this, so the result does not depend on how big the part
     * happened to be on its donor aircraft.
     */
    sizeM: number
    repeat?: number
  }
}

export interface Environment {
  id: EnvironmentId
  name: string
  /** Air density at the surface, kg/m³. */
  airDensity: number
  gravity: number
  /** Exponential atmosphere scale height, m: density falls as exp(-h/H). */
  scaleHeight: number
  note: string
}

export type EnvironmentId = 'earth' | 'mars' | 'denver' | 'everest'

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

export interface StatRow {
  label: string
  /** Value in SI-ish base units; formatting happens in the UI. */
  value: number
  unit: UnitKind
  hint?: string
  /**
   * Turns the row into a gauge. `max` sets full scale; `floor` marks the
   * minimum viable value, so a thrust-to-weight bar can show the 1.0 line it
   * has to clear.
   */
  gauge?: { max: number; floor?: number; invert?: boolean }
}

export type UnitKind =
  | 'kg'
  | 'm'
  | 'm2'
  | 'speed'
  | 'time_h'
  | 'distance_km'
  | 'power_w'
  | 'force_n'
  | 'energy_wh'
  | 'ratio'
  | 'percent'
  | 'loading'
  | 'rate_kg_h'
  | 'none'

export interface MassItem {
  label: string
  kg: number
}

export type VerdictLevel = 'good' | 'marginal' | 'bad' | 'grounded'

export interface Verdict {
  level: VerdictLevel
  headline: string
  reason: string
}

export interface Warning {
  severity: 'warn' | 'info'
  text: string
}

export interface StatGroup {
  title: string
  rows: StatRow[]
}

export interface Balance {
  /** Longitudinal centre of gravity, m aft of the airframe's own origin. */
  cgM: number
  /** Neutral point: where lift effectively acts. Fixed wing only. */
  neutralPointM: number | null
  /** Mean aerodynamic chord, m. */
  macM: number | null
  /** (NP - CG) / MAC, as a percentage. Positive is stable. */
  staticMarginPct: number | null
  /** Multirotor: CG offset from the rotor centroid as a fraction of arm radius. */
  rotorOffsetRatio: number | null
}

export interface Analysis {
  massKg: number
  masses: MassItem[]
  groups: StatGroup[]
  verdict: Verdict
  warnings: Warning[]
  hasRotors: boolean
  hasWing: boolean
  balance: Balance
}
