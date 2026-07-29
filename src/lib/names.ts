/**
 * Which part of an aircraft a rendered node is.
 *
 * The one place that answers this. A part name has to survive the classifier
 * writing it down, the optimiser rewriting the file, and three.js loading it,
 * and it has failed at each of those in turn — three.js sanitising names,
 * multi-primitive meshes being split and renumbered, prune() collapsing named
 * nodes into their children, and a suffix being stripped that turned out to be
 * meaningful. Every one of those showed up as a control that silently did
 * nothing on some airframe.
 *
 * So the resolver lives here rather than in the viewer: the renderer, the
 * catalog check and anything else asking "what is this mesh" all have to get
 * the same answer, or a check passes on a rule the app does not follow.
 */
import type { AircraftModel, AircraftPart, PartRole } from '../types'

/**
 * Exactly what three.js does to a glTF node name on load, and nothing else.
 *
 * It sanitises names — whitespace becomes an underscore, `[ ] . : /` are
 * dropped — while the classifier records what the file said. So an X-47B part
 * written down as "Cube.001_Material.001_0" arrives as
 * "Cube001_Material001_0" and never matched, which quietly froze every part on
 * that airframe: nothing to remove, resize, or lend out.
 */
export function sanitise(name: string): string {
  return name.replace(/\s/g, '_').replace(/[[\].:/]/g, '').toLowerCase()
}

/**
 * The same, with a trailing uniquifying suffix dropped as well.
 *
 * This is the looser key, for the case where one glTF node holds several
 * primitives and the classifier gave each its own hash: the Global Hawk is six
 * geometries inside a single node called "Global Hawk". Reduced this far they
 * all agree about the thing they name, and lookupPart pairs them up by index.
 *
 * It is only ever a fallback, because the suffix it throws away is meaningful
 * on some models. The X500 declares "rotor_3" and "rotor_3__1" as two real
 * nodes — a disc and its hub — and reducing both to "rotor_3" made the name
 * ambiguous, so neither resolved and the whole rotor slot went dead: nothing
 * to remove, resize, move or angle.
 */
export function canonical(name: string): string {
  return sanitise(name).replace(/(__\d+|_[0-9a-f]{6})$/, '')
}

/** name -> part, built once per model rather than scanned for every node. */
const partIndex = new WeakMap<AircraftModel, Map<string, AircraftPart>>()
/** Node names as the model actually declares them, which beat any guess. */
const exactIndex = new WeakMap<AircraftModel, Map<string, AircraftPart>>()
/** Bases shared by more than one part, where a bare name means nothing useful. */
const ambiguousBase = new WeakMap<AircraftModel, Set<string>>()

export function lookupPart(model: AircraftModel, objectName: string): AircraftPart | undefined {
  let index = partIndex.get(model)
  if (!index) {
    index = new Map()
    const ambiguous = new Set<string>()

    // A node the model declares by name is not a guess, so it is checked first
    // and never reduced. Everything below it works on shortened names and can
    // only ever be a fallback.
    const exact = new Map<string, AircraftPart>()
    for (const p of model.parts) {
      const s = sanitise(p.node)
      if (!exact.has(s)) exact.set(s, p)
    }
    exactIndex.set(model, exact)

    // Group the parts by the name they reduce to, because that decides how a
    // name can safely be used.
    const byBase = new Map<string, AircraftPart[]>()
    for (const p of model.parts) {
      const base = canonical(p.node)
      const list = byBase.get(base) ?? []
      list.push(p)
      byBase.set(base, list)
    }

    for (const [base, list] of byBase) {
      if (list.length === 1) {
        index.set(base, list[0])
        continue
      }
      // Several parts reduce to this name, so the name alone identifies
      // nothing. three.js splits a multi-primitive mesh into children numbered
      // from one and wraps them in a Group that carries the bare name — and
      // mapping that bare name to the first part made the Group answer as the
      // Global Hawk's wing. Hiding the wing then hid the Group, and with it the
      // entire aircraft.
      ambiguous.add(base)
      list.forEach((p, i) => index!.set(`${base}_${i + 1}`, p))
    }

    // Group names are a second way in, but only where they are unambiguous.
    for (const p of model.parts) {
      const g = canonical(p.group)
      if (!index.has(g) && !ambiguous.has(g)) index.set(g, p)
    }

    partIndex.set(model, index)
    ambiguousBase.set(model, ambiguous)
  }

  const declared = exactIndex.get(model)?.get(sanitise(objectName))
  if (declared) return declared

  const name = canonical(objectName)
  const hit = index.get(name)
  if (hit) return hit
  const base = name.replace(/_\d+$/, '')
  if (ambiguousBase.get(model)?.has(base)) return undefined
  return index.get(base)
}

/** Roles present on this node, resolved through the classifier output. */
export function roleOf(model: AircraftModel, objectName: string): PartRole | null {
  return lookupPart(model, objectName)?.role ?? null
}

/** Which physical part a node belongs to — a rotor's blade and bell share one. */
export function groupOf(model: AircraftModel, objectName: string): string {
  return lookupPart(model, objectName)?.group ?? objectName
}
