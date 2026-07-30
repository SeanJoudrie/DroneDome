/**
 * A build in a URL.
 *
 * Without this a build could not leave the machine it was made on. "Send me
 * that one" had no answer, a reload threw the build away and returned you to
 * the default Reaper, and every defect anyone found had to be described in prose
 * rather than linked. The state was already a plain serialisable object that
 * round-trips through localStorage; what was missing was treating the address
 * bar as somewhere it lives.
 *
 * The encoding is deliberately not JSON-in-base64 of the whole object. Half the
 * fields are timestamps and identifiers that mean nothing to a recipient, and a
 * link that changes every time you touch a slider is a link nobody trusts. Only
 * what someone else needs to see the same aircraft goes in.
 */
import type { Build, EnvironmentId, PartRole, SlotChoice } from '../types'
import { SWAPPABLE_ROLES } from '../types'
import { AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import { createBuild } from './build'

/** Short keys, because this ends up in something a person pastes. */
const ROLE_KEY: Record<PartRole, string> = {
  wing: 'w',
  tail: 't',
  rotor: 'r',
  gear: 'g',
  payload: 'p',
  solar: 's',
  hardpoint: 'h',
  body: 'b',
  arm: 'a',
  motor: 'm',
  battery: 'e',
}
const KEY_ROLE = Object.fromEntries(
  Object.entries(ROLE_KEY).map(([role, key]) => [key, role as PartRole]),
) as Record<string, PartRole>

/** Numbers a slot can carry, in a fixed order so the string stays short. */
const PLACE = ['scale', 'count', 'fore', 'rise', 'rollDeg', 'pitchDeg', 'yawDeg', 'tiltDeg', 'spread'] as const
type PlaceField = (typeof PLACE)[number]

/**
 * Read one numeric field off a slot without casting.
 *
 * Every variant that has these fields declares them, so the union can be
 * indexed directly. Reaching for `as Record<string, unknown>` here would be the
 * same shortcut that once let a slot's `layout` be read as a number.
 */
function placeNum(choice: SlotChoice, field: PlaceField): number | undefined {
  if (choice.kind === 'none') return undefined
  const v = choice[field]
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

function encodeSlot(choice: SlotChoice): string {
  if (choice.kind === 'none') return '-'
  const head = choice.kind === 'donor' ? `${choice.aircraftId}${choice.fromRole ? `:${choice.fromRole}` : ''}` : ''
  const nums: string[] = []
  for (const field of PLACE) {
    const v = placeNum(choice, field)
    if (v !== undefined) nums.push(`${field}=${Number(v.toFixed(3))}`)
  }
  const layout = choice.layout ? `layout=${choice.layout}` : ''
  return [head, ...nums, layout].filter(Boolean).join('~')
}

function decodeSlot(raw: string): SlotChoice | null {
  if (raw === '-') return { kind: 'none' }
  const parts = raw.split('~')
  const head = parts[0] ?? ''
  const out: Record<string, unknown> = {}
  for (const p of parts.slice(1)) {
    const [k, v] = p.split('=')
    if (!k || v === undefined) continue
    if (k === 'layout') out.layout = v
    else if (PLACE.includes(k as (typeof PLACE)[number])) {
      const n = Number(v)
      if (Number.isFinite(n)) out[k] = n
    }
  }
  if (head && !head.includes('=')) {
    const [aircraftId, fromRole] = head.split(':')
    // A link can outlive the aircraft it names. Drop the slot rather than
    // handing analyse() an id that resolves to nothing.
    if (!AIRCRAFT_BY_ID[aircraftId]) return null
    return { kind: 'donor', aircraftId, fromRole: fromRole as PartRole | undefined, ...out }
  }
  return { kind: 'stock', ...out }
}

/** Everything a recipient needs to see the same aircraft, and nothing else. */
export function buildToQuery(build: Build): string {
  const q = new URLSearchParams()
  q.set('a', build.baseId)
  if (build.scale !== 1) q.set('x', String(Number(build.scale.toFixed(3))))
  if (build.powerplantId) q.set('pp', build.powerplantId)
  if (build.energyId) q.set('en', build.energyId)
  if (build.paint && build.paint !== 'stock') q.set('pt', build.paint)
  if (build.environment) q.set('ev', build.environment)
  if (build.payloadIds.length) q.set('eq', build.payloadIds.join(','))
  for (const role of SWAPPABLE_ROLES) {
    const choice = build.slots[role]
    if (choice) q.set(ROLE_KEY[role], encodeSlot(choice))
  }
  return q.toString()
}

/**
 * A build from a URL, or null if there is no aircraft in it.
 *
 * Anything unrecognised is dropped rather than rejected: a link shared before a
 * catalog change should still open the aircraft it names, minus whatever no
 * longer exists.
 */
export function buildFromQuery(search: string): Build | null {
  const q = new URLSearchParams(search)
  const baseId = q.get('a')
  if (!baseId || !AIRCRAFT_BY_ID[baseId]) return null
  const build = createBuild(baseId)

  const scale = Number(q.get('x'))
  if (Number.isFinite(scale) && scale > 0) build.scale = Math.min(4, Math.max(0.25, scale))
  const pp = q.get('pp')
  if (pp) build.powerplantId = pp
  const en = q.get('en')
  if (en) build.energyId = en
  const pt = q.get('pt')
  if (pt) build.paint = pt
  const ev = q.get('ev')
  if (ev) build.environment = ev as EnvironmentId
  const eq = q.get('eq')
  if (eq) build.payloadIds = eq.split(',').filter(Boolean)

  for (const [key, role] of Object.entries(KEY_ROLE)) {
    const raw = q.get(key)
    if (raw === null) continue
    const choice = decodeSlot(raw)
    if (choice) build.slots[role] = choice
  }
  return build
}

/** The address to put in the bar, or hand to someone else. */
export function shareUrl(build: Build): string {
  const base = `${location.origin}${location.pathname}`
  return `${base}?${buildToQuery(build)}`
}
