import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { AircraftModel, Build, PartRole, SlotPlacement } from '../types'
import { AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import { PAINTS, PAYLOADS_BY_ID } from '../data/catalog'
import { fitScaleFor } from '../lib/physics'

const SWAP_ROLES: PartRole[] = ['wing', 'tail', 'rotor', 'gear', 'payload', 'solar', 'hardpoint']

const loader = new GLTFLoader()
const draco = new DRACOLoader()
draco.setDecoderPath(`${import.meta.env.BASE_URL}draco/`)
loader.setDRACOLoader(draco)

const cache = new Map<string, Promise<THREE.Group>>()

function loadModel(model: AircraftModel): Promise<THREE.Group> {
  const url = `${import.meta.env.BASE_URL}${model.model}`
  let entry = cache.get(url)
  if (!entry) {
    entry = new Promise<THREE.Group>((resolve, reject) => {
      loader.load(url, (gltf) => resolve(gltf.scene), undefined, reject)
    })
    cache.set(url, entry)
  }
  return entry
}

/**
 * Every model arrives in its own units and its own idea of which way is up.
 * This maps model space onto a shared frame — X across the span, Y up, Z along
 * the fuselage, scaled to metres — so that parts from different aircraft can be
 * bolted together without any of them arriving sideways.
 */
function normaliseTransform(model: AircraftModel): THREE.Matrix4 {
  const { span, length, vertical } = model.axes
  const basis = new THREE.Matrix4()
  const col = (axisIndex: number) => {
    const v = new THREE.Vector3()
    v.setComponent(axisIndex, 1)
    return v
  }
  // Rows pick model axes out into world X/Y/Z.
  basis.makeBasis(col(span), col(vertical), col(length))
  basis.transpose()

  const centre = new THREE.Matrix4().makeTranslation(
    -model.origin[0],
    -model.origin[1],
    -model.origin[2],
  )
  const scale = new THREE.Matrix4().makeScale(
    model.scaleToMetres,
    model.scaleToMetres,
    model.scaleToMetres,
  )
  return scale.multiply(basis).multiply(centre)
}

/** Roles present on this node, resolved through the classifier output. */
function roleOf(model: AircraftModel, objectName: string): PartRole | null {
  const part = model.parts.find((p) => p.node === objectName || p.group === objectName)
  return part ? part.role : null
}


/**
 * Resize one part of an aircraft in place.
 *
 * The nodes for that role are lifted into a group hanging off `container`,
 * keeping their transforms relative to it, so scaling the group grows the part
 * outward from the aircraft's centreline — bigger wings reach further out from
 * the fuselage rather than sliding sideways off it.
 *
 * `container` has to be the assembly rather than the model root: the model root
 * carries the normalisation matrix, so inside it a metre is not a metre and the
 * axes are still whatever the exporter happened to use. Working one level up
 * means offsets are in metres and the rotations are about span, vertical and
 * length as intended.
 */
function scaleRole(
  container: THREE.Object3D,
  nodes: THREE.Object3D[],
  factor: number,
  offset?: THREE.Vector3,
  tiltDeg = 0,
  place?: SlotPlacement,
  /**
   * Where the part is bolted on. A wing or a tailplane joins the aircraft at
   * its root, so it grows outboard from there. A propeller, a wheel or a
   * sensor pod hangs off its own middle, and growing one from its inboard
   * edge slides it off its own motor.
   */
  mountAtRoot = false,
) {
  const angled = !!(place?.rollDeg || place?.pitchDeg || place?.yawDeg)
  const moved = offset && offset.lengthSq() > 1e-9
  if (!nodes.length || (Math.abs(factor - 1) < 0.001 && !moved && !tiltDeg && !angled)) return
  container.updateMatrixWorld(true)
  const invRoot = new THREE.Matrix4().copy(container.matrixWorld).invert()
  const relatives = new Map<THREE.Object3D, THREE.Matrix4>()
  for (const n of nodes) {
    relatives.set(n, new THREE.Matrix4().multiplyMatrices(invRoot, n.matrixWorld))
  }

  // One group per physical part per side.
  //
  // Side, because dihedral and sweep mirror across the centreline: rolling
  // every panel the same way banks the aircraft instead of raising both tips.
  //
  // Part, because each one has to grow about its own mount. Grouping a quad's
  // two right-hand rotors together gave them a shared pivot halfway between,
  // so at 3x they slid fore and aft off their own arms — which is the floating.
  const sides = new Map<string, THREE.Object3D[]>()
  for (const n of nodes) {
    const side = typeof n.userData.ddSide === 'string' ? n.userData.ddSide : 'center'
    const part = typeof n.userData.ddGroup === 'string' ? n.userData.ddGroup : n.uuid
    const key = `${side}|${part}`
    const list = sides.get(key) ?? []
    list.push(n)
    sides.set(key, list)
  }

  for (const [key, members] of sides) {
    const side = key.slice(0, key.indexOf('|'))
    const group = new THREE.Group()
    container.add(group)
    for (const node of members) {
      group.add(node)
      node.matrixAutoUpdate = false
      node.matrix.copy(relatives.get(node)!)
    }

    // Grow and swivel the part about where it is bolted on, not about the
    // aircraft's centre. Scaling about the centre multiplies a part's distance
    // from it too, so a rotor 35 cm out at 3x ended up a metre out — floating
    // beside its own arm. The mount is the part's inboard edge, which for a
    // wing is its root and for a centreline part is simply its middle.
    // Measured from the geometry through each node's own relative matrix, so
    // the box is in the container's frame. expandByObject would have answered
    // in world space, which is a different thing the moment the assembly moves.
    const box = new THREE.Box3()
    const one = new THREE.Box3()
    for (const node of members) {
      const mesh = node as THREE.Mesh
      if (!mesh.isMesh || !mesh.geometry) continue
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
      one.copy(mesh.geometry.boundingBox!).applyMatrix4(relatives.get(node)!)
      box.union(one)
    }
    const pivot = box.getCenter(new THREE.Vector3())
    if (mountAtRoot && !box.isEmpty()) {
      if (side === 'right') pivot.x = box.min.x
      else if (side === 'left') pivot.x = box.max.x
    }
    for (const node of members) {
      node.matrix.premultiply(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
    }
    group.position.copy(pivot)

    group.scale.setScalar(factor)
    if (offset) group.position.add(offset)
    if (tiltDeg) group.rotateX((-tiltDeg * Math.PI) / 180)
    applyAngles(group, place, side === 'left' ? -1 : 1)
  }
}

/**
 * Copy a node out of its model with its world transform applied exactly once.
 *
 * clone() already carries the node's own matrix, so multiplying the world
 * matrix on top of it applies every parent scale twice — which quietly made
 * every borrowed part far larger than it should have been.
 */
function bakeWorld(node: THREE.Object3D): THREE.Object3D {
  const copy = node.clone(true)
  copy.matrixAutoUpdate = false
  copy.matrix.copy(node.matrixWorld)
  copy.matrix.decompose(copy.position, copy.quaternion, copy.scale)
  copy.matrixAutoUpdate = true
  return copy
}

/**
 * Dihedral, incidence and sweep, applied about the part's own mount point.
 *
 * `mirror` is -1 for anything on the left of the centreline, so the pair stays
 * symmetric: both tips rise together, both panels sweep aft together. Incidence
 * is the same on both sides, so it is never mirrored.
 */
function applyAngles(obj: THREE.Object3D, place?: SlotPlacement, mirror = 1) {
  if (!place) return
  if (place.rollDeg) obj.rotateZ((place.rollDeg * mirror * Math.PI) / 180)
  if (place.pitchDeg) obj.rotateX((place.pitchDeg * Math.PI) / 180)
  if (place.yawDeg) obj.rotateY((place.yawDeg * mirror * Math.PI) / 180)
}

/** Which physical part a node belongs to — a rotor's blade and bell share one. */
function groupOf(model: AircraftModel, objectName: string): string {
  const part = model.parts.find((p) => p.node === objectName || p.group === objectName)
  return part ? part.group : objectName
}

export interface ViewerHandle {
  setBuild(build: Build): void
  setTheme(theme: 'light' | 'dark'): void
  resize(): void
  frame(): void
  dispose(): void
  screenshot(): string
}

export function createViewer(container: HTMLElement): ViewerHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.localClippingEnabled = true
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  /** The canvas has to follow the interface theme or it sits there glowing. */
  function setTheme(theme: 'light' | 'dark') {
    const dark = theme === 'dark'
    scene.background = new THREE.Color(dark ? '#0a1017' : '#eef1f4')
    hemi.color.set(dark ? '#9fc6dd' : '#ffffff')
    hemi.groundColor.set(dark ? '#0b1219' : '#c3ccd6')
    hemi.intensity = dark ? 1.5 : 2.1
    key.intensity = dark ? 2.0 : 2.4
    fill.color.set(dark ? '#2de0ff' : '#dce6f2')
    fill.intensity = dark ? 0.5 : 0.7
    const gridMat = grid.material as THREE.Material & { opacity: number }
    gridMat.opacity = dark ? 0.28 : 0.5
    ;(ground.material as THREE.ShadowMaterial).opacity = dark ? 0.35 : 0.14
  }

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 5000)
  camera.position.set(4, 2.4, 6)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.07
  controls.minDistance = 0.05
  controls.maxDistance = 2000
  controls.maxPolarAngle = Math.PI * 0.495

  // Light workshop: broad soft key, cool fill, warm bounce.
  const hemi = new THREE.HemisphereLight('#ffffff', '#c3ccd6', 2.1)
  scene.add(hemi)
  const key = new THREE.DirectionalLight('#fff6ec', 2.4)
  key.position.set(6, 10, 4)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.bias = -0.0009
  scene.add(key)
  const fill = new THREE.DirectionalLight('#dce6f2', 0.7)
  fill.position.set(-6, 3, -5)
  scene.add(fill)

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.ShadowMaterial({ opacity: 0.14 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  let grid = new THREE.GridHelper(1, 20, '#b9c4d0', '#d5dce4')
  scene.add(grid)

  /**
   * Rebuild the floor grid with cells of a round real-world size, so it reads
   * as a ruler rather than wallpaper. Cells are chosen from a 1/2/5 sequence
   * near a tenth of the aircraft, which keeps a 6 cm whoop and a 40 m Global
   * Hawk both legible.
   */
  function setGrid(reach: number) {
    const raw = reach / 8
    const mag = 10 ** Math.floor(Math.log10(raw))
    const norm = raw / mag
    const cell = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag
    const half = Math.max(6, Math.ceil((reach * 3) / cell))
    scene.remove(grid)
    grid.geometry.dispose()
    grid = new THREE.GridHelper(cell * half * 2, half * 2, '#aebbc8', '#d5dce4')
    const mat = grid.material as THREE.Material
    mat.transparent = true
    mat.opacity = 0.5
    scene.add(grid)
  }

  const root = new THREE.Group()
  scene.add(root)

  let disposed = false
  let token = 0
  /** Which aircraft the camera was last framed for, and at what natural size. */
  let framedFor: string | null = null
  let framedReach = 0

  function clearRoot() {
    for (const child of [...root.children]) root.remove(child)
  }

  function applyPaint(object: THREE.Object3D, paintId: string) {
    const paint = PAINTS.find((p) => p.id === paintId)
    if (!paint || !paint.color) return
    const colour = new THREE.Color(paint.color)
    object.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh) return
      const wasArray = Array.isArray(mesh.material)
      const mats = wasArray ? (mesh.material as THREE.Material[]) : [mesh.material as THREE.Material]
      const painted = mats.map((m) => {
        const clone = (m as THREE.MeshStandardMaterial).clone()
        clone.color = colour.clone()
        clone.map = null
        clone.needsUpdate = true
        return clone
      })
      // Checking Array.isArray *after* assigning an array is always true, so a
      // single-material mesh was left holding a one-element array and leaning on
      // the renderer's default group to unwrap it.
      mesh.material = wasArray ? painted : painted[0]
    })
  }

  /**
   * Put clipping planes on a mesh.
   *
   * clone(true) shares materials with the cached GLB, so the planes have to go
   * on a copy — writing them straight onto the shared material left the wings
   * clipped off every future build of that airframe.
   */
  function clipMaterials(mesh: THREE.Mesh, planes: THREE.Plane[], union: boolean) {
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    const clipped = mats.map((m) => {
      const mat = (m as THREE.Material).clone()
      mat.clippingPlanes = planes
      mat.clipIntersection = union
      // Off by default, and without it the shadow pass ignores the planes — a
      // Global Hawk with its wings removed still laid a full 40 m wingspan of
      // shadow across the grid.
      mat.clipShadows = true
      mat.side = THREE.DoubleSide
      mat.needsUpdate = true
      return mat
    })
    mesh.material = Array.isArray(mesh.material) ? clipped : clipped[0]
  }

  /**
   * The meshes a cut is allowed to touch: the welded lump itself, plus anything
   * classified as this very role. Parts the classifier already pulled out as
   * their own nodes — the Cessna's tail, its wheels — are handled by the node
   * toggle, and clipping them too would take the tail off with the wings.
   */
  function weldedMeshes(root: THREE.Object3D, model: AircraftModel, role: PartRole) {
    const out: THREE.Mesh[] = []
    root.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh) return
      const meshRole = roleOf(model, o.name)
      if (meshRole && meshRole !== 'body' && meshRole !== role) return
      out.push(mesh)
    })
    return out
  }

  /**
   * Every plane made for the build in progress.
   *
   * three.js clips in world space, but the cuts are worked out in the
   * assembly's own frame, before the aircraft has been dropped onto the ground
   * and scaled. Keeping the list lets them all be carried into world space once
   * the assembly is finally placed — without that, a cut drifts as soon as the
   * scale slider moves off 1.
   */
  let cutPlanes: THREE.Plane[] = []

  /** Keeps coordinates on `axis` at or above `lo`. */
  function planeAbove(axis: 0 | 1 | 2, lo: number) {
    const n = new THREE.Vector3().setComponent(axis, 1)
    const p = new THREE.Plane(n, -lo)
    cutPlanes.push(p)
    return p
  }

  /** Keeps coordinates on `axis` at or below `hi`. */
  function planeBelow(axis: 0 | 1 | 2, hi: number) {
    const n = new THREE.Vector3().setComponent(axis, -1)
    const p = new THREE.Plane(n, hi)
    cutPlanes.push(p)
    return p
  }

  /**
   * The invisible cube, resolved into clipping planes.
   *
   * A role on a welded airframe is a box: outboard of a half-width, and — where
   * the override says so — between a pair of fore/aft and vertical limits. That
   * last part matters, because a cut with open ends is an infinite slab that
   * takes the tailplane and the gear legs off along with the wings.
   *
   * Returns the box as two one-sided halves (so each can be angled on its own —
   * a wing needs dihedral, not bank) and its complement as a list of convex
   * regions, since "everything except a box" is not itself convex.
   */
  function cutRegions(model: AircraftModel, role: PartRole) {
    const cut = model.cuts[role]
    if (!cut) return null
    const m = model.scaleToMetres
    const keep = cut.keep * m
    // World axes after normalisation: X span, Y vertical, Z length.
    const limits: { axis: 0 | 1 | 2; lo: number; hi: number }[] = []
    if (cut.bandLength) limits.push({ axis: 2, lo: cut.bandLength[0] * m, hi: cut.bandLength[1] * m })
    if (cut.bandVertical) limits.push({ axis: 1, lo: cut.bandVertical[0] * m, hi: cut.bandVertical[1] * m })

    // Peel the complement off one face at a time, so the regions tile the model
    // instead of overlapping and z-fighting.
    const keeps: THREE.Plane[][] = []
    const inside: THREE.Plane[] = []
    for (const l of limits) {
      keeps.push([...inside, planeBelow(l.axis, l.lo)])
      keeps.push([...inside, planeAbove(l.axis, l.hi)])
      inside.push(planeAbove(l.axis, l.lo), planeBelow(l.axis, l.hi))
    }
    keeps.push([...inside, planeBelow(0, keep), planeAbove(0, -keep)])

    return {
      keeps,
      right: [...inside, planeAbove(0, keep)],
      left: [...inside, planeBelow(0, -keep)],
    }
  }

  /**
   * Hide the part of a welded mesh that a role occupies. NASA's Global Hawk has
   * its wings fused into the fuselage, so removing them means keeping only
   * what falls outside the box.
   */
  function applyCut(object: THREE.Object3D, model: AircraftModel, role: PartRole) {
    carveWelded(object, model, role, false)
  }

  /**
   * Carve the region a role occupies out of a welded mesh.
   *
   * The mesh gets clipped down to the complement of the box — one copy per
   * convex piece of it. With `keepPart`, the box's own contents are kept too, as
   * a left and a right half that can then be resized or angled like real parts:
   * the invisible cube pointed both ways.
   *
   * Returns the new part meshes, ready to hand to scaleRole.
   */
  function carveWelded(
    root: THREE.Object3D,
    model: AircraftModel,
    role: PartRole,
    keepPart: boolean,
  ) {
    const regions = cutRegions(model, role)
    if (!regions) return []
    const made: THREE.Object3D[] = []
    for (const mesh of weldedMeshes(root, model, role)) {
      // clone(false) keeps the local matrix but not the children, and sharing a
      // parent keeps the world transform, so each copy starts out exactly on top
      // of the original.
      for (const planes of regions.keeps.slice(1)) {
        const piece = mesh.clone(false)
        mesh.parent?.add(piece)
        clipMaterials(piece, planes, false)
      }
      if (keepPart) {
        for (const side of ['left', 'right'] as const) {
          const half = mesh.clone(false)
          mesh.parent?.add(half)
          clipMaterials(half, regions[side], false)
          half.userData.ddSide = side
          half.userData.ddGroup = `${mesh.name}:${side}`
          made.push(half)
        }
      }
      clipMaterials(mesh, regions.keeps[0], false)
    }
    return made
  }

  async function setBuild(build: Build) {
    const mine = ++token
    const base = AIRCRAFT_BY_ID[build.baseId]
    if (!base) return

    const baseScene = await loadModel(base)
    if (disposed || mine !== token) return

    clearRoot()

    const assembly = new THREE.Group()
    cutPlanes = []
    const baseClone = baseScene.clone(true)
    baseClone.applyMatrix4(normaliseTransform(base))
    // Scenery that came with the upload and is not the aircraft. The classifier
    // already refused to measure it; this stops it being drawn, which is how the
    // Matrice spent a while sitting on top of its own flight case.
    if (base.hidden.length) {
      const scenery = new Set(base.hidden)
      baseClone.traverse((o) => {
        if (scenery.has(o.name)) o.visible = false
      })
    }
    assembly.add(baseClone)

    // Work out what each role is doing before touching the scene graph.
    const removed = new Set<PartRole>()
    const donors: {
      role: PartRole
      /** Which of the donor's roles the mesh comes from; usually the same. */
      fromRole: PartRole
      model: AircraftModel
      fit: number
      count: number
      place?: SlotPlacement
    }[] = []
    for (const role of SWAP_ROLES) {
      const choice = build.slots[role]
      // Rearranging an aircraft's own rotors is the same job as mounting
      // borrowed ones: take one as the template and lay `count` of them out.
      // Doing it any other way meant you had to borrow rotors from another
      // drone before you could turn a quad into a hexacopter.
      if (choice?.kind === 'stock' && role === 'rotor') {
        const wants = choice.count !== undefined || choice.layout || choice.spread !== undefined
        if (wants && base.parts.some((pt) => pt.role === 'rotor')) {
          removed.add(role)
          donors.push({
            role,
            fromRole: role,
            model: base,
            fit: choice.scale ?? 1,
            count: choice.count ?? base.spec.rotors ?? 4,
            place: choice,
          })
        }
        continue
      }
      if (!choice || choice.kind === 'stock') continue
      removed.add(role)
      if (choice.kind === 'donor') {
        const donor = AIRCRAFT_BY_ID[choice.aircraftId]
        if (!donor) continue
        donors.push({
          role,
          fromRole: choice.fromRole ?? role,
          model: donor,
          fit: fitScaleFor(base, donor) * (choice.scale ?? 1),
          count: choice.count ?? donor.spec.rotors ?? 1,
          place: choice,
        })
      }
    }

    // Take the base's own version of anything that has been changed out.
    const mounts = new Map<PartRole, THREE.Vector3[]>()
    baseClone.traverse((o) => {
      const role = roleOf(base, o.name)
      if (!role || !removed.has(role)) return
      const where = new THREE.Vector3()
      o.getWorldPosition(where)
      const list = mounts.get(role) ?? []
      list.push(where)
      mounts.set(role, list)
      o.visible = false
    })
    for (const role of removed) applyCut(baseClone, base, role)

    // Resize the aircraft's own parts wherever a size has been dialled in.
    for (const role of SWAP_ROLES) {
      const choice = build.slots[role]
      if (!choice || choice.kind !== 'stock') continue
      const factor = choice.scale ?? 1
      const place = choice
      const tilt = role === 'rotor' ? (place.tiltDeg ?? 0) : 0
      const copies = Math.max(1, Math.round(place.count ?? 1))
      const moved =
        Math.abs(factor - 1) > 1e-3 ||
        !!place.fore ||
        !!place.rise ||
        !!place.rollDeg ||
        !!place.pitchDeg ||
        !!place.yawDeg ||
        !!tilt ||
        copies > 1
      if (!moved) continue
      // Which side a node is on has to come from where it actually sits, not
      // from the classifier's label: "right" in model space lands on either
      // world X depending on how the model was authored, and a mirrored guess
      // sweeps one wing forward and the other aft.
      baseClone.updateMatrixWorld(true)
      const span = new THREE.Box3().setFromObject(baseClone)
      const midX = (span.max.x + span.min.x) / 2
      const edge = Math.max((span.max.x - span.min.x) * 0.05, 1e-4)
      const bounds = new THREE.Box3()
      const centre = new THREE.Vector3()
      const nodes: THREE.Object3D[] = []
      // Dihedral and sweep are mirrored, so a part that reaches across the
      // centreline has to become two halves first. The MQ-9's wing is one mesh
      // spanning both tips; rotating it whole banks the aircraft instead of
      // raising both tips together.
      const mirrored = !!(place.rollDeg || place.yawDeg)
      baseClone.traverse((o) => {
        if (roleOf(base, o.name) !== role || !(o as THREE.Mesh).isMesh) return
        bounds.setFromObject(o).getCenter(centre)
        const straddles = bounds.min.x < midX - edge && bounds.max.x > midX + edge
        const part = groupOf(base, o.name)
        if (mirrored && straddles) {
          const other = (o as THREE.Mesh).clone(false)
          o.parent?.add(other)
          clipMaterials(o as THREE.Mesh, [planeBelow(0, midX)], false)
          clipMaterials(other, [planeAbove(0, midX)], false)
          o.userData.ddSide = 'left'
          other.userData.ddSide = 'right'
          o.userData.ddGroup = `${part}:l`
          other.userData.ddGroup = `${part}:r`
          nodes.push(o, other)
          return
        }
        const dx = centre.x - midX
        o.userData.ddSide = dx > edge ? 'right' : dx < -edge ? 'left' : 'center'
        o.userData.ddGroup = part
        nodes.push(o)
      })
      // A welded airframe has no node for this role, only a region of the hull.
      // Split it in two so the region can be transformed like a real part —
      // only once something is actually asking it to move, since the split
      // doubles the geometry.
      nodes.push(...carveWelded(baseClone, base, role, true))
      if (!nodes.length) continue
      const hull = new THREE.Box3().setFromObject(baseClone)
      const size = hull.getSize(new THREE.Vector3())

      // A second and third wing, stacked above the first, is how a biplane and
      // a triplane get built out of an aircraft's own wing.
      if (copies > 1) {
        const step = (place.layout === 'tandem' ? size.z : size.y) * 0.22
        // The copies go onto the assembly rather than alongside the original,
        // because inside the model root a metre is not a metre and "up" is
        // whatever axis the exporter chose.
        baseClone.updateMatrixWorld(true)
        const originals = [...nodes]
        for (let i = 1; i < copies; i++) {
          for (const node of originals) {
            const copy = bakeWorld(node)
            copy.userData.ddSide = node.userData.ddSide
            copy.userData.ddGroup = `${node.userData.ddGroup ?? node.name}#${i}`
            if (place.layout === 'tandem') copy.position.z += step * i
            else copy.position.y += step * i
            assembly.add(copy)
            nodes.push(copy)
          }
        }
      }
      const off = new THREE.Vector3(
        0,
        (place.rise ?? 0) * size.y * 0.5,
        (place.fore ?? 0) * size.z * -0.5,
      )
      scaleRole(assembly, nodes, factor, off, tilt, place, role === 'wing' || role === 'tail')
    }

    // Bolt on whatever is replacing them.
    for (const d of donors) {
      const donorScene = await loadModel(d.model)
      if (disposed || mine !== token) return
      const donorNorm = normaliseTransform(d.model)

      let pieces: THREE.Object3D[] = []
      const donorClone = donorScene.clone(true)
      donorClone.applyMatrix4(donorNorm)
      donorClone.updateMatrixWorld(true)
      donorClone.traverse((o) => {
        if (roleOf(d.model, o.name) === d.fromRole && (o as THREE.Mesh).isMesh) pieces.push(o)
      })
      if (!pieces.length) continue

      // A donor quad contributes four rotors; we want one of them, repeated —
      // otherwise every mounting point gets the whole set and you end up with
      // sixteen. Wings and tails are single assemblies, so they come as they are.
      if (d.role === 'rotor') {
        const firstGroup = groupOf(d.model, pieces[0].name)
        pieces = pieces.filter((p) => groupOf(d.model, p.name) === firstGroup)
      }

      const group = new THREE.Group()
      for (const piece of pieces) group.add(bakeWorld(piece))
      group.scale.setScalar(d.fit)

      // Rotors get laid out on the host's own mounting points where it has
      // them, otherwise spread evenly around the airframe.
      const hostMounts = mounts.get(d.role)
      if (d.role === 'rotor') {
        // Layout is a first-class choice: the same four rotors read completely
        // differently as an X, a plus, a tandem pair of pairs or a stack.
        const spread = 0.25 + (d.place?.spread ?? 0.5) * 0.55
        const radius = (base.spec.span_m * spread) || 0.5
        const rise = base.spec.span_m * 0.03 + (d.place?.rise ?? 0) * base.spec.span_m * 0.25
        const fore = (d.place?.fore ?? 0) * base.spec.length_m * -0.5
        const tilt = ((d.place?.tiltDeg ?? 0) * Math.PI) / 180
        const layout = d.place?.layout ?? 'ring'
        for (let i = 0; i < d.count; i++) {
          const arm = group.clone(true)
          let x = 0
          let y = rise
          let z = fore
          if (layout === 'stacked') {
            y = rise + i * base.spec.span_m * 0.05
          } else if (layout === 'tandem') {
            const pair = Math.floor(i / 2)
            const side = i % 2 === 0 ? 1 : -1
            x = side * radius * 0.6
            z = fore + (pair - (Math.ceil(d.count / 2) - 1) / 2) * radius * 1.4
          } else {
            const phase = layout === 'plus' ? 0 : Math.PI / 4
            const angle = (i / d.count) * Math.PI * 2 + phase
            x = Math.cos(angle) * radius
            z = fore + Math.sin(angle) * radius
          }
          arm.position.set(x, y, z)
          if (tilt) arm.rotateX(-tilt)
          assembly.add(arm)
        }
      } else if (hostMounts && hostMounts.length) {
        const extra = Math.max(1, d.count ?? 1)
        const hull = new THREE.Box3().setFromObject(baseClone)
        const size = hull.getSize(new THREE.Vector3())
        const nudge = new THREE.Vector3(
          0,
          (d.place?.rise ?? 0) * size.y * 0.5,
          (d.place?.fore ?? 0) * size.z * -0.5,
        )
        for (const point of hostMounts.slice(0, Math.max(1, d.count))) {
          // A count above one stacks copies - two wings is a biplane, three a
          // triplane - offset vertically or fore-and-aft by the layout.
          for (let i = 0; i < (d.role === 'wing' || d.role === 'tail' ? extra : 1); i++) {
            const copy = group.clone(true)
            copy.position.copy(point).add(nudge)
            if (i > 0) {
              const step = size.y * 0.14 * i
              if (d.place?.layout === 'tandem') copy.position.z += size.z * 0.22 * i
              else copy.position.y += step
            }
            applyAngles(copy, d.place)
            assembly.add(copy)
          }
        }
      } else {
        // The host never had this role, so there is no mounting point to copy.
        // Put it where that kind of part belongs on an aircraft rather than
        // leaving it at the donor's own coordinates, floating in space.
        const hull = new THREE.Box3().setFromObject(baseClone)
        const size = hull.getSize(new THREE.Vector3())
        const mid = hull.getCenter(new THREE.Vector3())
        switch (d.role) {
          case 'tail':
            group.position.set(0, mid.y + size.y * 0.25, hull.min.z + size.z * 0.06)
            break
          case 'gear':
            group.position.set(0, hull.min.y, mid.z)
            break
          case 'solar':
            group.position.set(0, hull.max.y, mid.z)
            break
          case 'hardpoint':
          case 'payload':
            group.position.set(0, hull.min.y + size.y * 0.1, mid.z + size.z * 0.15)
            break
          default:
            group.position.set(0, mid.y, mid.z)
        }
        assembly.add(group)
      }
    }

    // ---- equipment ---------------------------------------------------------
    // Cameras, turrets and weapons borrow real meshes from other aircraft in
    // the catalog rather than being invented, and replace the host's own part
    // in that role so you don't end up with two sensor balls.
    const equipment = build.payloadIds
      .map((id) => PAYLOADS_BY_ID[id])
      .filter((p) => p?.mesh)
    for (const item of equipment) {
      const spec = item.mesh!
      const donor = AIRCRAFT_BY_ID[spec.aircraftId]
      if (!donor) continue

      // hide whatever the host already had in that role
      const hostPoints: THREE.Vector3[] = []
      baseClone.traverse((o) => {
        if (roleOf(base, o.name) !== spec.role || !(o as THREE.Mesh).isMesh) return
        const at = new THREE.Vector3()
        o.getWorldPosition(at)
        hostPoints.push(at)
        o.visible = false
      })

      const donorScene = await loadModel(donor)
      if (disposed || mine !== token) return
      const donorClone = donorScene.clone(true)
      donorClone.applyMatrix4(normaliseTransform(donor))
      donorClone.updateMatrixWorld(true)

      let pieces: THREE.Object3D[] = []
      donorClone.traverse((o) => {
        if (roleOf(donor, o.name) === spec.role && (o as THREE.Mesh).isMesh) pieces.push(o)
      })
      if (!pieces.length) continue
      const firstGroup = groupOf(donor, pieces[0].name)
      pieces = pieces.filter((p) => groupOf(donor, p.name) === firstGroup)

      const unit = new THREE.Group()
      for (const piece of pieces) unit.add(bakeWorld(piece))
      // The part still carries the offset it had on its donor aircraft, so
      // recentre it on its own geometry before mounting; otherwise it hangs in
      // space wherever it happened to sit on the Reaper.
      const unitBox = new THREE.Box3().setFromObject(unit)
      const unitMid = unitBox.getCenter(new THREE.Vector3())
      for (const child of unit.children) child.position.sub(unitMid)

      // Normalise the borrowed mesh to the item's real size. Doing it by
      // measurement rather than by a multiplier means the result does not
      // depend on how big the part happened to be on its donor aircraft.
      //
      // Equipment is deliberately NOT scaled to suit the host: a 90 kg turret
      // is 90 kg wherever you bolt it, so on a 1.7 kg quadcopter it should look
      // as ridiculous as the thrust-to-weight figure says it is.
      const span = unitBox.getSize(new THREE.Vector3())
      const longest = Math.max(span.x, span.y, span.z, 1e-6)
      unit.scale.setScalar(spec.sizeM / longest)

      if (hostPoints.length) {
        for (const at of hostPoints.slice(0, spec.repeat ?? hostPoints.length)) {
          const copy = unit.clone(true)
          copy.position.copy(at)
          assembly.add(copy)
        }
      } else {
        // nothing equivalent on the host: hang it under the nose
        const hull = new THREE.Box3().setFromObject(baseClone)
        unit.position.set(0, hull.min.y + (hull.max.y - hull.min.y) * 0.12, hull.max.z * 0.45)
        assembly.add(unit)
      }
    }

    assembly.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })

    if (build.paint !== 'stock') applyPaint(assembly, build.paint)

    // Measure the aircraft at its natural size, BEFORE the scale slider is
    // applied. Everything that makes the scene readable — grid spacing, camera
    // distance, lighting — is pinned to this. If it were pinned to the scaled
    // size instead, growing the aircraft 4x would also push the camera back 4x
    // and stretch the grid 4x, and the slider would appear to do nothing.
    const natural = new THREE.Box3().setFromObject(assembly)
    if (natural.isEmpty()) return
    const naturalSize = natural.getSize(new THREE.Vector3())
    const reach = Math.max(naturalSize.x, naturalSize.y, naturalSize.z, 0.05)

    assembly.scale.multiplyScalar(build.scale)

    // Sit it on the ground, centred.
    const box = new THREE.Box3().setFromObject(assembly)
    const size = box.getSize(new THREE.Vector3())
    const centre = box.getCenter(new THREE.Vector3())
    assembly.position.sub(new THREE.Vector3(centre.x, box.min.y, centre.z))
    root.add(assembly)

    // Now that the assembly has stopped moving, carry the cuts into world space,
    // which is the only space three.js clips in.
    assembly.updateMatrixWorld(true)
    for (const plane of cutPlanes) plane.applyMatrix4(assembly.matrixWorld)

    // The grid is a ruler: fixed squares at the base aircraft's scale, so a
    // 4x model visibly covers sixteen times the ground a 1x one does.
    setGrid(reach)
    // setGrid replaces the grid object, so its themed opacity must be restored
    ;(grid.material as THREE.Material & { opacity: number }).opacity =
      document.documentElement.dataset.theme === 'light' ? 0.5 : 0.28
    ground.scale.setScalar(reach * 20)

    camera.near = reach / 800
    camera.far = reach * 400
    camera.updateProjectionMatrix()
    key.position.set(reach * 1.2, reach * 2.4, reach * 0.8)
    const shadowSpan = reach * 4
    const cam = key.shadow.camera as THREE.OrthographicCamera
    cam.left = -shadowSpan
    cam.right = shadowSpan
    cam.top = shadowSpan
    cam.bottom = -shadowSpan
    cam.near = 0.01
    cam.far = shadowSpan * 8
    cam.updateProjectionMatrix()

    // Reframe when the aircraft changes, or when a part has changed its natural
    // size so drastically that the old view no longer contains it — bolting a
    // real 90 kg sensor turret onto a 1.7 kg quad otherwise leaves the whole
    // build off-screen. This is measured before the scale slider is applied, so
    // dragging that still moves the model rather than the camera.
    const jumped = framedReach > 0 && (reach / framedReach > 2.5 || framedReach / reach > 2.5)
    if (framedFor !== build.baseId || jumped) {
      framedFor = build.baseId
      framedReach = reach
      controls.target.set(0, size.y * 0.45, 0)
      camera.position.set(reach * 1.1, reach * 0.85, reach * 1.8)
    }
    controls.update()
  }

  function resize() {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function frame() {
    const box = new THREE.Box3().setFromObject(root)
    if (box.isEmpty()) return
    const size = box.getSize(new THREE.Vector3())
    const reach = Math.max(size.x, size.y, size.z, 0.1)
    camera.position.set(reach * 0.9, reach * 0.75, reach * 1.5)
    controls.target.set(0, size.y * 0.45, 0)
    controls.update()
  }

  setTheme((document.documentElement.dataset.theme as 'light' | 'dark') ?? 'dark')

  resize()
  renderer.setAnimationLoop(() => {
    controls.update()
    renderer.render(scene, camera)
  })

  return {
    setBuild: (b) => void setBuild(b),
    setTheme,
    resize,
    frame,
    screenshot: () => renderer.domElement.toDataURL('image/png'),
    dispose() {
      disposed = true
      renderer.setAnimationLoop(null)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    },
  }
}
