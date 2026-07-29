/**
 * Enforce the hardline rule: anything in the catalog must come apart.
 *
 * An airframe is not done when it renders. Every role it actually carries has
 * to be removable — either because the classifier found separate meshes for it,
 * or because a cut in scripts/overrides/<id>.json defines the region to clip.
 * An aircraft that can only be looked at does not belong here.
 *
 * This also catches the quieter failure: a role where the classifier found ONE
 * mesh out of four propellers, so "remove the rotors" leaves three of them
 * hanging in the air.
 *
 *   npm run check:parts
 */
import { AIRCRAFT } from '../src/data/aircraft.generated'
import type { AircraftModel, PartRole } from '../src/types'
import { SWAPPABLE_ROLES } from '../src/types'

/** Roles this airframe genuinely has, from the published spec and the meshes. */
function rolesPresent(a: AircraftModel): PartRole[] {
  const present = new Set<PartRole>()
  for (const p of a.parts) if (SWAPPABLE_ROLES.includes(p.role)) present.add(p.role)
  if (a.spec.wing_area_m2) present.add('wing')
  if ((a.spec.rotors ?? 0) >= 1) present.add('rotor')
  return [...present]
}

type Problem = { id: string; role: PartRole | 'axes'; why: string }
const problems: Problem[] = []
const warnings: Problem[] = []

// ---------------------------------------------------------------------------
// Does the model agree with the manifest about its own shape?
//
// Every dimension in the app is derived from which axis of the mesh is the
// span, and that is decided by the published figures. When the two disagree
// the model is either the wrong aircraft, oriented unexpectedly, or carrying
// scenery — and every cut, station and area downstream inherits the error.
// ---------------------------------------------------------------------------
for (const a of AIRCRAFT) {
  const spanM = a.modelExtent[a.axes.span] * a.scaleToMetres
  if (Math.abs(spanM / a.spec.span_m - 1) > 0.02) {
    problems.push({
      id: a.id,
      role: 'axes',
      why: `span axis measures ${spanM.toFixed(2)} m against a published ${a.spec.span_m} m`,
    })
  }
  const lengthM = a.modelExtent[a.axes.length] * a.scaleToMetres
  const ratio = lengthM / (a.spec.length_m || lengthM)
  if (ratio > 1.6 || ratio < 0.6) {
    warnings.push({
      id: a.id,
      role: 'axes',
      why: `length axis measures ${lengthM.toFixed(2)} m against a published ${a.spec.length_m} m (${ratio.toFixed(2)}x)`,
    })
  }
}

for (const a of AIRCRAFT) {
  for (const role of rolesPresent(a)) {
    const nodes = a.parts.filter((p) => p.role === role)
    const cut = a.cuts[role]
    if (!nodes.length && !cut) {
      problems.push({ id: a.id, role, why: 'no mesh and no cut — cannot be removed' })
      continue
    }
    // A quad whose propellers landed in one mesh is fine; a quad where only one
    // of four was recognised is not, because removing it leaves three behind.
    if (role === 'rotor' && !cut) {
      // A coaxial pair is one mesh group per stack, not per blade.
      const want = Math.max(1, Math.round((a.spec.rotors ?? 0) / (a.spec.coaxial ? 2 : 1)))
      const groups = new Set(nodes.map((p) => p.group)).size
      const span = a.modelExtent[a.axes.span] || 1
      // One group is fine when it is every propeller merged into a single mesh,
      // and not fine when it is one propeller out of four. Width tells them
      // apart: merged props reach most of the way across the airframe.
      const reach = Math.max(...nodes.map((p) => p.size[a.axes.span])) / span
      const merged = groups === 1 && reach > 0.5
      if (want >= 3 && groups < want && !merged) {
        warnings.push({
          id: a.id,
          role,
          why: `${groups} rotor group(s) found for ${want} — removal would leave some behind`,
        })
      }
    }
  }
}

const pad = (s: string, n: number) => s.padEnd(n)
console.log(`\n${AIRCRAFT.length} airframes checked against "anything added must come apart".\n`)

for (const w of warnings) {
  console.log(`  warn  ${pad(w.id, 14)} ${pad(w.role, 10)} ${w.why}`)
}
for (const p of problems) {
  console.log(`  FAIL  ${pad(p.id, 14)} ${pad(p.role, 10)} ${p.why}`)
}

if (!problems.length && !warnings.length) console.log('  every role on every airframe can be removed or replaced.')
console.log()

if (problems.length) {
  console.error(
    `${problems.length} role(s) cannot be removed. Give the airframe a cut in ` +
      `scripts/overrides/<id>.json, or take it out of the catalog.`,
  )
  process.exit(1)
}
