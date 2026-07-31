import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { AircraftModel, Build, PartRole, SlotPlacement } from '../types'
import { AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import { PAINTS, PAYLOADS_BY_ID } from '../data/catalog'
import { fitScaleFor } from '../lib/physics'
import { canonical, groupOf, roleOf } from '../lib/names'

const SWAP_ROLES: PartRole[] = ['wing', 'tail', 'rotor', 'gear', 'payload', 'solar', 'hardpoint']

const loader = new GLTFLoader()
const draco = new DRACOLoader()
draco.setDecoderPath(`${import.meta.env.BASE_URL}draco/`)
loader.setDRACOLoader(draco)

const cache = new Map<string, Promise<THREE.Group>>()

function loadModel(
  model: AircraftModel,
  onProgress?: (loaded: number, total: number) => void,
): Promise<THREE.Group> {
  const url = `${import.meta.env.BASE_URL}${model.model}`
  let entry = cache.get(url)
  if (!entry) {
    entry = new Promise<THREE.Group>((resolve, reject) => {
      loader.load(
        url,
        (gltf) => resolve(gltf.scene),
        (e) => onProgress?.(e.loaded, e.total),
        reject,
      )
    })
    // A rejection must not stay in the cache. Keeping it would make one dropped
    // request permanently fatal for that aircraft: every later attempt would
    // await the same rejected promise, so Retry could never work and the model
    // would stay unavailable until the page was reloaded.
    entry.catch(() => cache.delete(url))
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

/**
 * Where an aircraft's rotors actually sit, as distinct stations.
 *
 * One rotor is often several meshes — a disc, a hub, a spinner, a nut. The
 * Phantom 4's four propellers are twenty-three of them, and averaging over the
 * meshes instead of the stations pulls the measured radius in towards the hubs
 * clustered near the middle. Merging anything closer together than a fraction
 * of the airframe's own width recovers the four positions.
 */
function rotorStations(seats: THREE.Vector3[], tolerance: number): THREE.Vector3[] {
  const stations: { sum: THREE.Vector3; n: number }[] = []
  for (const s of seats) {
    const hit = stations.find((st) => {
      const c = st.sum.clone().multiplyScalar(1 / st.n)
      return Math.hypot(c.x - s.x, c.z - s.z) <= tolerance
    })
    if (hit) {
      hit.sum.add(s)
      hit.n++
    } else {
      stations.push({ sum: s.clone(), n: 1 })
    }
  }
  return stations.map((st) => st.sum.multiplyScalar(1 / st.n))
}

/**
 * Mark a subtree as belonging to a role.
 *
 * A part borrowed from another aircraft keeps the name it had in the donor file,
 * and that name means nothing to the host's catalog — so report() resolved it to
 * an empty role, which reads identically to "this mesh belongs to nothing". It
 * does not: a borrowed camera comes off with the equipment like anything else.
 * That ambiguity cost an afternoon chasing a rule-4 violation that was never
 * there, so the role travels with the mesh instead of being inferred from a name
 * the host has never heard of.
 */
function stampRole(object: THREE.Object3D, role: PartRole) {
  object.traverse((o) => {
    o.userData.ddRole = role
  })
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

  // Group by side, then by what actually touches what.
  //
  // Side, because dihedral and sweep mirror across the centreline: rolling
  // every panel the same way banks the aircraft instead of raising both tips.
  //
  // Touch, because a group is only meaningful if its parts move together. A
  // quad's four rotors are four separate things and each has to grow about its
  // own motor — sharing a pivot slid them off their arms. A Black Hornet's tail
  // is five pieces of one assembly, and giving each its own pivot pulled it
  // apart. Whether parts touch tells the two cases apart without a rule per
  // role.
  const bounds = new Map<THREE.Object3D, THREE.Box3>()
  for (const n of nodes) {
    const mesh = n as THREE.Mesh
    const b = new THREE.Box3()
    if (mesh.isMesh && mesh.geometry) {
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
      b.copy(mesh.geometry.boundingBox!).applyMatrix4(relatives.get(n)!)
    }
    bounds.set(n, b)
  }
  const hull = new THREE.Box3()
  for (const b of bounds.values()) if (!b.isEmpty()) hull.union(b)
  const touchSlack = Math.max(...hull.getSize(new THREE.Vector3()).toArray()) * 0.02

  const sides = new Map<string, THREE.Object3D[]>()
  const bySide = new Map<string, THREE.Object3D[]>()
  for (const n of nodes) {
    const side = typeof n.userData.ddSide === 'string' ? n.userData.ddSide : 'center'
    const list = bySide.get(side) ?? []
    list.push(n)
    bySide.set(side, list)
  }
  for (const [side, members] of bySide) {
    const parent = members.map((_, i) => i)
    const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])))
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const a = bounds.get(members[i])!
        const b = bounds.get(members[j])!
        if (a.isEmpty() || b.isEmpty()) continue
        const touch =
          a.min.x - touchSlack <= b.max.x && b.min.x - touchSlack <= a.max.x &&
          a.min.y - touchSlack <= b.max.y && b.min.y - touchSlack <= a.max.y &&
          a.min.z - touchSlack <= b.max.z && b.min.z - touchSlack <= a.max.z
        if (touch) parent[find(i)] = find(j)
      }
    }
    // Pieces that nearly touch belong to the same thing. A Black Hornet's tail
    // is a boom and a rotor with a couple of millimetres between them; an
    // agricultural hexacopter's landing legs are a metre and a half apart and
    // are two separate legs. Judging that by "is it on the centreline" put the
    // legs in one group and scaled them away from each other, so judge it by
    // distance relative to how big the whole role is instead.
    const roleBox = new THREE.Box3()
    for (const n of members) if (!bounds.get(n)!.isEmpty()) roleBox.union(bounds.get(n)!)
    const knit = Math.max(...roleBox.getSize(new THREE.Vector3()).toArray()) * 0.25
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        if (find(i) === find(j)) continue
        const a = bounds.get(members[i])!
        const b = bounds.get(members[j])!
        if (a.isEmpty() || b.isEmpty()) continue
        let gap = 0
        for (const k of ['x', 'y', 'z'] as const) {
          gap = Math.max(gap, b.min[k] - a.max[k], a.min[k] - b.max[k])
        }
        if (gap < knit) parent[find(i)] = find(j)
      }
    }

    members.forEach((n, i) => {
      const key = `${side}|${find(i)}`
      const list = sides.get(key) ?? []
      list.push(n)
      sides.set(key, list)
    })
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
    // A welded part knows exactly where it was cut from, and that beats
    // measuring: clipping does not shrink a mesh's reported bounds, so the box
    // above still describes the entire hull.
    const stated = members.find((n) => Array.isArray(n.userData.ddMount))
    if (stated) {
      const [mx, my, mz] = stated.userData.ddMount as [number, number | null, number | null]
      pivot.x = mx
      if (my !== null) pivot.y = my
      if (mz !== null) pivot.z = mz
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

/** One rendered mesh, in world space, for the geometry self-checks. */
export interface MeshReport {
  name: string
  role: string
  min: [number, number, number]
  max: [number, number, number]
  /**
   * How many clipping planes this mesh is drawn through. A cut removes a wing
   * without touching the geometry's bounds, so measuring boxes alone cannot
   * see it happen — on a TB2 or a Shahed, whose wings are only a cut, taking
   * the wing off looked from outside like nothing at all.
   */
  clips: number
}

/**
 * What the viewer is doing, so the interface can stop disagreeing with it.
 *
 * Without this the panel and the viewport described different aircraft for as
 * long as a model took to arrive: the stats read the build you had just picked
 * while the screen still showed the last one, with nothing to say a change was
 * in flight. For an app whose whole claim is that the numbers describe what you
 * built, that was the most expensive thing it could get wrong.
 */
export type ViewerStatus =
  | { phase: 'ready' }
  | { phase: 'loading'; aircraft: string; loaded: number; total: number }
  | { phase: 'failed'; aircraft: string }

export interface ViewerHandle {
  setBuild(build: Build): void
  setTheme(theme: 'light' | 'dark'): void
  resize(): void
  frame(): void
  dispose(): void
  screenshot(): string
  /** Try the last requested build again, after a load failed. */
  retry(): void
  /**
   * The camera pose, and a way to put it back.
   *
   * The viewer reframes when the aircraft changes or when a part's natural size
   * jumps, which is right for a person and useless for a comparison: two
   * screenshots of the same aircraft with and without its tail were framed
   * differently, so diffing them reported thousands of pixels changed and said
   * nothing about whether the tail had gone. Pinning the pose makes the two
   * images differ only where the geometry does.
   */
  camera(): { position: [number, number, number]; target: [number, number, number] }
  setCamera(pose: { position: [number, number, number]; target: [number, number, number] }): void
  /**
   * Every visible mesh and where it ended up.
   *
   * Exists so a test can ask questions no screenshot can answer — is anything
   * detached from the rest of the aircraft, has the assembly grown a hundred
   * times, is a transform NaN — across every airframe and every operation,
   * rather than a handful someone thought to look at.
   */
  report(): { buildId: string; meshes: MeshReport[] }
  /**
   * Show one role and hide the rest, until the next build.
   *
   * For checking what a borrowed part actually put on screen. The obvious way
   * is to photograph the aircraft with and without it and difference the two,
   * and that is wrong: the scene casts shadows, so fitting a wing of a
   * different shape re-shades the whole fuselage, and the difference lights up
   * an aeroplane-shaped region that no donor ever sent. Asking the renderer to
   * draw the part alone answers the question directly instead of inferring it.
   */
  isolate(role: PartRole | null, invert?: boolean): void
  /**
   * How far a role's geometry is from the rest of the aircraft, in metres.
   *
   * The question every other measurement has failed to answer. Pixel overlap in
   * a render says a wing is attached whenever a wingtip happens to cross the
   * fuselage in projection, which is true of a wing floating a metre clear of
   * it. Bounding boxes are worse: clipping does not shrink one, so a cut
   * donor's box is the whole donor hull.
   *
   * So this walks the real vertices, in world space, discards the ones their
   * own clipping planes have thrown away, and returns the shortest distance
   * from any surviving vertex of the part to any surviving vertex of the rest.
   * Zero means they interpenetrate, which is what a wing through a fuselage
   * should read as.
   */
  joinGap(role: PartRole, against?: PartRole): { gap: number; partPoints: number; hostPoints: number } | null
}

export function createViewer(
  container: HTMLElement,
  onStatus: (status: ViewerStatus) => void = () => {},
): ViewerHandle {
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
  /** The build most recently asked for, so a failed load can be retried. */
  let lastRequested: Build | null = null
  /** Which aircraft the camera was last framed for, and at what natural size. */
  /** Set by setCamera: hold the view still instead of reframing each build. */
  let pinned = false
  let framedFor: string | null = null
  let framedReach = 0

  let lastAssembly: THREE.Object3D | null = null
  let lastBase: AircraftModel | null = null
  let lastBuildKey = ''

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

  /** True if nothing between this node and `root` has been hidden. */
  function visibleHere(node: THREE.Object3D, root: THREE.Object3D) {
    for (let o: THREE.Object3D | null = node; o && o !== root.parent; o = o.parent) {
      if (!o.visible) return false
    }
    return true
  }

  /**
   * Stop drawing what came with the upload but is not the aircraft.
   *
   * Display stands, flight cases, and in the X-47B's case a second lump of hull
   * parked beside the aeroplane. The classifier already refuses to measure
   * these; this is what stops them being drawn — which is how the Matrice spent
   * a while sitting on top of its own flight case.
   *
   * It has to run on a donor as much as on the host. It did not, and so
   * borrowing a wing from the X-47B also handed over the lump: ten metres of it,
   * scaled to the host and dragging the mount point with it, because a unit's
   * offset is measured from the box around everything in it.
   */
  function hideScenery(root: THREE.Object3D, model: AircraftModel) {
    if (!model.hidden.length) return
    const scenery = new Set(model.hidden.map(canonical))
    root.traverse((o) => {
      if (scenery.has(canonical(o.name))) o.visible = false
    })
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
      if (!visibleHere(mesh, root)) return
      const meshRole = roleOf(model, o.name)
      if (meshRole && meshRole !== 'body' && meshRole !== role) return
      out.push(mesh)
    })
    return out
  }

  /**
   * Where a part meets the body, per side, from the vertices.
   *
   * The socket. Everything before this positioned a borrowed part by its
   * bounding-box centre, which is not a feature of the part at all — for a
   * clipped region it is the centre of the whole donor hull, so the height and
   * the fore/aft station a wing arrived at were arbitrary. That is why parts
   * floated: nothing ever asked where on the wing the wing is supposed to touch
   * a fuselage.
   *
   * The answer is the root: of the geometry that belongs to this role, the part
   * nearest the centreline. Taking the innermost tenth by |x| and averaging it
   * gives a point that survives a ragged edge, and it is computed the same way
   * on the host and on the donor — so the host's answer is the socket, the
   * donor's is the plug, and fitting one to the other is a subtraction.
   *
   * Vertices thrown away by their own clipping planes are skipped, because a
   * cut hull still carries every vertex it ever had.
   */
  function rolePoints(root: THREE.Object3D, side: 'left' | 'right') {
    root.updateMatrixWorld(true)
    const sign = side === 'right' ? 1 : -1
    const points: THREE.Vector3[] = []
    const v = new THREE.Vector3()
    root.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh || !mesh.visible) return
      const position = mesh.geometry?.getAttribute('position')
      if (!position) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      const planes = mats.flatMap((m) => (m as THREE.Material).clippingPlanes ?? [])
      const stride = Math.max(1, Math.floor(position.count / 4000))
      for (let i = 0; i < position.count; i += stride) {
        v.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld)
        if (v.x * sign < 0) continue
        let kept = true
        for (const plane of planes) {
          if (plane.distanceToPoint(v) < 0) {
            kept = false
            break
          }
        }
        if (kept) points.push(v.clone())
      }
    })
    return points
  }

  /**
   * The part's own root: the innermost slice of it, averaged.
   *
   * For a donor this is where its wing left its fuselage, and it is what gets
   * placed on the host's socket.
   */
  function rootAnchor(root: THREE.Object3D, side: 'left' | 'right') {
    const points = rolePoints(root, side)
    if (points.length < 4) return null
    points.sort((a, b) => Math.abs(a.x) - Math.abs(b.x))
    const inner = points.slice(0, Math.max(3, Math.round(points.length * 0.1)))
    const at = new THREE.Vector3()
    for (const p of inner) at.add(p)
    return at.divideScalar(inner.length)
  }

  /**
   * The host's socket: where its own part crosses the side of its fuselage.
   *
   * NOT the innermost slice, which is what the first attempt used and why it
   * made things worse. The Reaper's wing includes one mesh running tip to tip
   * straight through the fuselage, so its innermost vertices sit on the
   * centreline — the socket came out at x = 0 and every donor was dragged into
   * the middle of the aircraft.
   *
   * The join is at the fuselage side, so that is where to measure: take the
   * part's own vertices in a band around the body's half-width and average
   * them. Height and fore/aft then come from the wing where it actually meets
   * the body rather than from wherever the mesh happens to be centred.
   */
  function socketAt(points: THREE.Vector3[], side: 'left' | 'right', bodyHalf: number) {
    if (points.length < 4) return null
    const sign = side === 'right' ? 1 : -1
    for (const width of [0.25, 0.5, 1, 2]) {
      const band = Math.max(bodyHalf * width, 0.05)
      const near = points.filter((p) => Math.abs(Math.abs(p.x) - bodyHalf) <= band)
      if (near.length >= 4) {
        const at = new THREE.Vector3()
        for (const p of near) at.add(p)
        at.divideScalar(near.length)
        // The x is the body's edge by definition; only the height and station
        // are being read off the geometry.
        at.x = sign * bodyHalf
        return at
      }
    }
    return null
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

  /**
   * Where newly made planes are collected, and what they will be transformed by.
   *
   * The host's own cuts live in the assembly's frame. A borrowed part does not:
   * its geometry arrives in the donor's frame and is then scaled and moved onto
   * the host, so its planes have to ride that same transform or the clip lands
   * somewhere else entirely. Each batch therefore records the object whose world
   * matrix carries it.
   */
  let planeSink: THREE.Plane[] = cutPlanes
  let deferredPlanes: { planes: THREE.Plane[]; node: THREE.Object3D }[] = []

  /** Keeps coordinates on `axis` at or above `lo`. */
  function planeAbove(axis: 0 | 1 | 2, lo: number) {
    const n = new THREE.Vector3().setComponent(axis, 1)
    const p = new THREE.Plane(n, -lo)
    planeSink.push(p)
    return p
  }

  /** Keeps coordinates on `axis` at or below `hi`. */
  function planeBelow(axis: 0 | 1 | 2, hi: number) {
    const n = new THREE.Vector3().setComponent(axis, -1)
    const p = new THREE.Plane(n, hi)
    planeSink.push(p)
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
    // Which side of the band is the aircraft, and which is the part.
    //
    // A wing is outboard, so the aircraft keeps the middle and the sides come
    // off. A centreline part is the reverse: the fin is the middle, and both
    // sides of it are aircraft. Getting this wrong does not fail quietly — it
    // removes the fuselage and leaves the tail.
    if (cut.removeCentre) {
      keeps.push([...inside, planeAbove(0, keep)])
      keeps.push([...inside, planeBelow(0, -keep)])
    } else {
      keeps.push([...inside, planeBelow(0, keep), planeAbove(0, -keep)])
    }

    // Where the cut runs is where the part is attached, and the bands say how
    // far along and how high it sits. A clipped mesh still reports the geometry
    // of the whole hull it was cut from, so without this the pivot for the
    // right wing came out at the left wingtip.
    const band = (axis: 1 | 2) => {
      const l = limits.find((x) => x.axis === axis)
      return l ? (l.lo + l.hi) / 2 : null
    }
    // One piece for a centreline part, two mirrored halves for a wing or a
    // tailplane — so dihedral and sweep still mirror correctly on the pair, and a
    // fin is not split down the middle into halves that scale apart.
    const parts = cut.removeCentre
      ? [
          {
            side: 'center' as const,
            planes: [...inside, planeBelow(0, keep), planeAbove(0, -keep)],
            mountX: 0,
          },
        ]
      : [
          { side: 'right' as const, planes: [...inside, planeAbove(0, keep)], mountX: keep },
          { side: 'left' as const, planes: [...inside, planeBelow(0, -keep)], mountX: -keep },
        ]

    return {
      keeps,
      parts,
      mountY: band(1),
      mountZ: band(2),
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
        for (const part of regions.parts) {
          const half = mesh.clone(false)
          mesh.parent?.add(half)
          clipMaterials(half, part.planes, false)
          half.userData.ddSide = part.side
          half.userData.ddGroup = `${mesh.name}:${part.side}`
          half.userData.ddMount = [part.mountX, regions.mountY, regions.mountZ]
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
    lastRequested = build

    onStatus({ phase: 'loading', aircraft: base.name, loaded: 0, total: 0 })
    let baseScene: THREE.Group
    try {
      baseScene = await loadModel(base, (loaded, total) => {
        if (!disposed && mine === token) {
          onStatus({ phase: 'loading', aircraft: base.name, loaded, total })
        }
      })
    } catch {
      // Leave whatever is on screen where it is. A blank viewport gives no way
      // to tell a dropped request from a build that renders nothing, and this
      // app has both failure modes.
      if (!disposed && mine === token) onStatus({ phase: 'failed', aircraft: base.name })
      return
    }
    if (disposed || mine !== token) return

    clearRoot()

    const assembly = new THREE.Group()
    cutPlanes = []
    planeSink = cutPlanes
    deferredPlanes = []
    const baseClone = baseScene.clone(true)
    baseClone.applyMatrix4(normaliseTransform(base))
    hideScenery(baseClone, base)
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
    // Where the part physically was, as opposed to where its transform node
    // sits. For a mesh with baked geometry those are different: the node is at
    // the model's origin, so four rotors all report the same point and any ring
    // measured from them has no radius at all.
    const seats = new Map<PartRole, THREE.Vector3[]>()
    // The host's own part, sampled before it is taken away. Once the wing is
    // hidden there is nothing left to ask where the wing root was, and it is not
    // recoverable from the fuselage alone. Kept as points rather than as a
    // single anchor because the socket needs the body's width to be known, and
    // that is measured later.
    const hostPoints = new Map<PartRole, { left: THREE.Vector3[]; right: THREE.Vector3[] }>()
    const cutSockets = new Map<PartRole, { left: THREE.Vector3 | null; right: THREE.Vector3 | null }>()
    baseClone.updateMatrixWorld(true)
    for (const role of removed) {
      // Isolate the role, sample it, put everything back. Cheaper and far less
      // error-prone than threading a filter through the vertex walk.
      const restore: THREE.Object3D[] = []
      baseClone.traverse((o) => {
        if (!(o as THREE.Mesh).isMesh || !o.visible) return
        if (roleOf(base, o.name) !== role) {
          o.visible = false
          restore.push(o)
        }
      })
      hostPoints.set(role, {
        left: rolePoints(baseClone, 'left'),
        right: rolePoints(baseClone, 'right'),
      })
      for (const o of restore) o.visible = true
      // A host whose part is entirely a cut has no meshes to sample - the
      // Global Hawk's wing is the same primitive as its fuselage. The cut knows
      // where that role attaches, because the band is drawn at the join.
      const regions = cutRegions(base, role)
      if (regions) {
        const y = regions.mountY ?? 0
        const z = regions.mountZ ?? 0
        const from: { left: THREE.Vector3 | null; right: THREE.Vector3 | null } = { left: null, right: null }
        for (const part of regions.parts) {
          if (part.side === 'right') from.right = new THREE.Vector3(part.mountX, y, z)
          if (part.side === 'left') from.left = new THREE.Vector3(part.mountX, y, z)
        }
        cutSockets.set(role, from)
      }
    }
    baseClone.updateMatrixWorld(true)
    baseClone.traverse((o) => {
      const role = roleOf(base, o.name)
      if (!role || !removed.has(role)) return
      const where = new THREE.Vector3()
      o.getWorldPosition(where)
      const list = mounts.get(role) ?? []
      list.push(where)
      mounts.set(role, list)
      if ((o as THREE.Mesh).isMesh) {
        const box = new THREE.Box3().setFromObject(o)
        if (!box.isEmpty()) {
          const seat = seats.get(role) ?? []
          seat.push(box.getCenter(new THREE.Vector3()))
          seats.set(role, seat)
        }
      }
      o.visible = false
    })
    for (const role of removed) applyCut(baseClone, base, role)

    // There used to be a pass here that hid anything left hanging once a part
    // came off — an Akinci's hardpoints when its wing goes. It is gone, but not
    // for the reason first written here: it was blamed for the Global Hawk
    // emptying its screen and it was innocent. That was lookupPart above,
    // mapping a bare group name onto the wing. The reason it stays out is
    // narrower — deciding what is debris from bounding-box adjacency is a guess,
    // and a guess is not allowed to delete an aeroplane. So a pylon may hang in
    // the air where its wing was. That is the smaller lie, and it is the honest
    // one: you did take the wing off.

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
        o.userData.ddOffset = dx
        o.userData.ddHalf = (bounds.max.x - bounds.min.x) / 2
        nodes.push(o)
      })
      // Being off-centre is not the same as being one of a pair. A Black
      // Hornet's tail sits three centimetres off the middle of a twenty-seven
      // centimetre aircraft, and calling that a left-hand part split its tail
      // into pieces that then scaled away from each other. A part is only
      // sided if something of its own kind sits opposite it.
      for (const o of nodes) {
        if (o.userData.ddSide === 'center') continue
        const dx = o.userData.ddOffset as number
        const half = (o.userData.ddHalf as number) ?? 0
        const partner = nodes.some((q) => {
          if (q === o || q.userData.ddSide === o.userData.ddSide) return false
          const qx = q.userData.ddOffset as number
          return typeof qx === 'number' && Math.abs(qx + dx) <= Math.max(edge, half)
        })
        if (!partner) o.userData.ddSide = 'center'
      }

      // A welded airframe has no node for this role, only a region of the hull.
      // Split it in two so the region can be transformed like a real part —
      // only once something is actually asking it to move, since the split
      // doubles the geometry.
      nodes.push(...carveWelded(baseClone, base, role, true))
      if (!nodes.length) continue
      const hull = new THREE.Box3().setFromObject(baseClone)
      const size = hull.getSize(new THREE.Vector3())

      // "How many" means two different things depending on the part, and the
      // renderer has to mean the same thing the stats do.
      //
      // For a rotor it is a rotor count: the stats read it straight off as the
      // number of discs producing thrust. The renderer used to read it as
      // "copies of the whole rotor set", so asking a quadcopter for eight
      // rotors drew thirty-two of them in a tower a metre tall while the panel
      // beside it said eight. Either number could have been the honest one;
      // showing both at once is the one thing this app cannot do.
      // "How many" means two different things depending on the part, and only
      // one of them belongs here.
      //
      // A rotor count is a number of rotors, and it is already handled by the
      // layout path above, which hides the aircraft's own set and lays `count`
      // of them out on a ring. Repeating them here as well would draw a second
      // set on top — and because the originals are hidden by then, every copy
      // made here inherits that and never shows up anyway.
      if (role !== 'rotor' && copies > 1) {
        // A wing count is a number of wings, and a second and third stacked
        // above the first is how a biplane and a triplane get built.
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
      // A donor mesh that will not load costs you that part, not the aircraft.
      let donorScene: THREE.Group
      try {
        donorScene = await loadModel(d.model)
      } catch {
        continue
      }
      if (disposed || mine !== token) return
      const donorNorm = normaliseTransform(d.model)

      let pieces: THREE.Object3D[] = []
      const donorClone = donorScene.clone(true)
      donorClone.applyMatrix4(donorNorm)
      hideScenery(donorClone, d.model)
      donorClone.updateMatrixWorld(true)
      donorClone.traverse((o) => {
        if (!visibleHere(o, donorClone)) return
        if (roleOf(d.model, o.name) === d.fromRole && (o as THREE.Mesh).isMesh) pieces.push(o)
      })

      // A welded donor has no separate mesh for the part. The Global Hawk's wing
      // is the same primitive as its fuselage; the Cessna's is inside its body
      // mesh and is not labelled a wing at all, so collecting meshes by role
      // fetched only its ailerons and flaps. Where the donor has a cut for this
      // role, that cut is the only thing that knows which region is the part —
      // so take the meshes the cut applies to, and clip them to it.
      //
      // Before the empty check, not after. An aircraft whose part is ENTIRELY a
      // cut has no meshes in that role at all — the Akinci, once its two hull
      // meshes were labelled as the fuselage they are — so bailing on an empty
      // list first meant it contributed nothing whatsoever.
      const donorCut = d.model.cuts[d.fromRole]
      if (donorCut) {
        const welded = weldedMeshes(donorClone, d.model, d.fromRole)
        if (welded.length) pieces = welded
      }
      if (!pieces.length) continue

      // A donor quad contributes four rotors; we want one of them, repeated —
      // otherwise every mounting point gets the whole set and you end up with
      // sixteen. Wings and tails are single assemblies, so they come as they are.
      if (d.role === 'rotor' && !donorCut) {
        const firstGroup = groupOf(d.model, pieces[0].name)
        pieces = pieces.filter((p) => groupOf(d.model, p.name) === firstGroup)
      }

      /**
       * Build one mountable copy of the part.
       *
       * Made fresh per mounting point rather than cloned, because a clipped copy
       * needs clipping planes of its own. Planes are positioned in world space,
       * and every copy sits somewhere different — sharing one set put the
       * Global Hawk's cut nowhere near the Global Hawk.
       */
      const makeUnit = (side?: 'left' | 'right') => {
        const unit = new THREE.Group()
        const held: THREE.Plane[] = []
        if (donorCut) {
          const previous = planeSink
          planeSink = held
          const regions = cutRegions(d.model, d.fromRole)
          planeSink = previous
          if (regions) {
            for (const piece of pieces) {
              for (const part of regions.parts) {
                if (side && part.side !== 'center' && part.side !== side) continue
                const slice = bakeWorld(piece)
                clipMaterials(slice as THREE.Mesh, part.planes, false)
                unit.add(slice)
              }
            }
          } else {
            for (const piece of pieces) unit.add(bakeWorld(piece))
          }
        } else {
          // A donor whose part is its own mesh still arrives as a pair, and the
          // pair has to come apart for each half to be butted against the host's
          // body. Split on which side of the donor's centreline the mesh sits;
          // anything straddling it belongs to both and is left whole.
          for (const piece of pieces) {
            if (side) {
              const box = new THREE.Box3().setFromObject(piece)
              const straddles = box.min.x < 0 && box.max.x > 0
              const mine = box.min.x + box.max.x > 0 ? 'right' : 'left'
              if (!straddles && mine !== side) continue
            }
            unit.add(bakeWorld(piece))
          }
        }
        unit.scale.setScalar(d.fit)
        // Where the part's own middle sits, so mounting can put THAT on the
        // mounting point rather than the donor's model origin.
        //
        // Reported, not applied. Shifting the meshes inside the group would
        // move the geometry out from under its own clipping planes, which ride
        // the group's transform and know nothing about a child-level nudge. The
        // Global Hawk survived that because its wing mesh is already centred on
        // its aircraft; the Akinci's is a metre off, and the cut walked clean
        // off the wing and took everything with it.
        unit.updateMatrixWorld(true)
        const ownBox = new THREE.Box3().setFromObject(unit)
        const mid = ownBox.isEmpty() ? new THREE.Vector3() : ownBox.getCenter(new THREE.Vector3())
        // Where this half's root is, which is NOT the edge of its bounding box
        // whenever the half is a clipped region: clipping does not shrink a
        // mesh's box, so a cut donor's half still reports the whole hull and its
        // "edge" is the far wingtip. The cut knows the answer - its keep band is
        // the donor's own root - so ask that, and only fall back to the box for
        // a donor whose part is really its own mesh.
        let inboard = 0
        if (side) {
          const sign = side === 'right' ? 1 : -1
          inboard = donorCut
            ? sign * donorCut.keep * d.model.scaleToMetres * d.fit
            : sign > 0
              ? ownBox.min.x
              : ownBox.max.x
        }
        return { unit, held, mid, box: ownBox, inboard, empty: ownBox.isEmpty() }
      }

      // Only split a donor that really is a pair. A wing running tip to tip as
      // one mesh has no gap to close, and halving it would draw it twice.
      const pairs =
        (d.role === 'wing' || d.role === 'tail') &&
        (donorCut
          ? !donorCut.removeCentre
          : pieces.every((p) => {
              const box = new THREE.Box3().setFromObject(p)
              return !(box.min.x < 0 && box.max.x > 0)
            }) && pieces.some((p) => new THREE.Box3().setFromObject(p).max.x <= 0))

      const first = makeUnit()
      const group = first.unit

      // Rotors get laid out on the host's own mounting points where it has
      // them, otherwise spread evenly around the airframe.
      const hostMounts = mounts.get(d.role)
      if (d.role === 'rotor') {
        // Layout is a first-class choice: the same four rotors read completely
        // differently as an X, a plus, a tandem pair of pairs or a stack.
        //
        // The ring is sized from where the host's own rotors were, and only
        // falls back to a fraction of its span when it never had any. A
        // quadcopter's motors sit at about a third of its span from the middle,
        // so a ring sized from the span alone put every borrowed rotor out
        // beyond the arm tips with nothing under it.
        const spread = 0.25 + (d.place?.spread ?? 0.5) * 0.55
        const hull = new THREE.Box3().setFromObject(baseClone)
        const across = Math.max(hull.max.x - hull.min.x, base.spec.span_m, 1e-3)
        const hostSeats = rotorStations(seats.get('rotor') ?? [], across * 0.15)
        const onRing = hostSeats.filter((s) => Math.hypot(s.x, s.z) > across * 0.02)
        const seatRing = onRing.length
          ? onRing.reduce((a, s) => a + Math.hypot(s.x, s.z), 0) / onRing.length
          : 0
        const radius =
          (seatRing > 0 ? seatRing * (0.5 + (d.place?.spread ?? 0.5)) : base.spec.span_m * spread) ||
          0.5
        // Keep whatever angle this aircraft's own rotors are at, so an X-quad
        // taken to six or eight stays an X rather than rotating to a shape it
        // never had. A plus is the explicit alternative: arms on the axes.
        const phase = onRing.length ? Math.atan2(onRing[0].z, onRing[0].x) : Math.PI / 4
        const seatRise = hostSeats.length
          ? hostSeats.reduce((a, s) => a + s.y, 0) / hostSeats.length
          : base.spec.span_m * 0.03
        const rise = seatRise + (d.place?.rise ?? 0) * base.spec.span_m * 0.25
        const fore = (d.place?.fore ?? 0) * base.spec.length_m * -0.5
        const tilt = ((d.place?.tiltDeg ?? 0) * Math.PI) / 180
        const layout = d.place?.layout ?? 'ring'
        for (let i = 0; i < d.count; i++) {
          const made = makeUnit()
          const arm = made.unit
          if (made.held.length) deferredPlanes.push({ planes: made.held, node: arm })
          let x = 0
          let y = rise
          let z = fore
          if (layout === 'stacked') {
            // Coaxial pairs over the arms the host already has is a real X8.
            // Stacking them all on the centreline instead built a tower through
            // the middle of the fuselage.
            const tier = base.spec.span_m * 0.05
            if (hostSeats.length) {
              const seat = hostSeats[i % hostSeats.length]
              x = seat.x
              z = fore + seat.z
              y = rise + Math.floor(i / hostSeats.length) * tier
            } else {
              y = rise + i * tier
            }
          } else if (layout === 'tandem') {
            const pair = Math.floor(i / 2)
            const side = i % 2 === 0 ? 1 : -1
            x = side * radius * 0.6
            z = fore + (pair - (Math.ceil(d.count / 2) - 1) / 2) * radius * 1.4
          } else {
            const angle = (i / d.count) * Math.PI * 2 + (layout === 'plus' ? 0 : phase)
            x = Math.cos(angle) * radius
            z = fore + Math.sin(angle) * radius
          }
          arm.position.set(x, y, z)
          arm.position.sub(made.mid)
          if (tilt) arm.rotateX(-tilt)
          stampRole(arm, d.role)
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
        // Where the host's own part physically sat, not where its transform node
        // happened to be. On a model with baked geometry every node reports the
        // model origin, so mounting on those put a borrowed wing at the nose.
        // A wing is one assembly across the centreline, so its stations average
        // to the single station it belongs at.
        const seat = seats.get(d.role) ?? []
        const stations =
          (d.role === 'wing' || d.role === 'tail') && seat.length
            ? [seat.reduce((a, v) => a.add(v), new THREE.Vector3()).divideScalar(seat.length)]
            : seat.length
              ? seat
              : hostMounts
        /**
         * How far out the host's body reaches at a given station.
         *
         * A borrowed wing is a pair, and the gap between its roots is the
         * donor's fuselage, scaled to the host's span. Put that pair on the
         * host centred and the gap stays the donor's: the Raven's roots ended
         * up outboard of the Reaper's body with the fuselage sitting on a plank
         * between them, and the PX4 quadplane's left daylight either side of the
         * boom. Nothing measured that, because span, centring and symmetry were
         * all correct - the wing was simply not attached to anything.
         *
         * So each half is butted against the body instead. This measures where
         * the body is, from the geometry rather than from the span figure, in a
         * window around the station the part mounts at - a fuselage is not the
         * same width at the nose as at the wing.
         */
        const bodyHalfWidthAt = (z: number, depth: number) => {
          let half = 0
          baseClone.updateMatrixWorld(true)
          baseClone.traverse((o) => {
            const mesh = o as THREE.Mesh
            if (!mesh.isMesh || !mesh.visible) return
            if (roleOf(base, mesh.name) === d.role) return
            const box = new THREE.Box3().setFromObject(mesh)
            if (box.isEmpty()) return
            if (box.max.z < z - depth || box.min.z > z + depth) return
            half = Math.max(half, Math.min(Math.abs(box.min.x), Math.abs(box.max.x)))
          })
          return half
        }

        for (const point of stations.slice(0, Math.max(1, d.count))) {
          const root = pairs ? bodyHalfWidthAt(point.z, Math.max(size.z * 0.12, 0.05)) : 0
          // A count above one stacks copies - two wings is a biplane, three a
          // triplane - offset vertically or fore-and-aft by the layout.
          for (let i = 0; i < (d.role === 'wing' || d.role === 'tail' ? extra : 1); i++) {
            for (const side of pairs ? (['left', 'right'] as const) : [undefined]) {
              const made = makeUnit(side)
              if (made.empty) continue
              const copy = made.unit
              if (made.held.length) deferredPlanes.push({ planes: made.held, node: copy })
              // Seat it first, then let the placement sliders offset from
              // seated. Nudging before the socket alignment would have the
              // alignment cancel it, and the fore/rise controls would silently
              // do nothing.
              copy.position.copy(point).sub(made.mid)
              // The socket, resolved now that the body's width at this station
              // is known. Geometry first; the cut band only where the host has
              // no mesh for this role at all.
              const pts = side ? hostPoints.get(d.role)?.[side] : null
              const socket = side
                ? (pts && pts.length ? socketAt(pts, side, root) : null) ??
                  cutSockets.get(d.role)?.[side] ??
                  null
                : null
              const plug = side ? rootAnchor(copy, side) : null
              if (socket && plug) {
                // Socket to plug, all three axes at once. Height and fore/aft
                // used to come from the unit's bounding-box centre, which for a
                // clipped region is the centre of the whole donor hull and so
                // has nothing to do with where the wing root is. Aligning the
                // roots instead is what stops a part arriving beside the
                // aircraft rather than on it.
                copy.position.add(socket).sub(plug)
              } else if (side) {
                // No socket to read — the host never had this part as geometry
                // and has no cut for it either. Falling back to butting the
                // root against the body is worse but still beats the donor's
                // own coordinates.
                const sign = side === 'right' ? 1 : -1
                copy.position.x = sign * root * 0.85 - made.inboard
              }
              copy.position.add(nudge)
              if (i > 0) {
                const step = size.y * 0.14 * i
                if (d.place?.layout === 'tandem') copy.position.z += size.z * 0.22 * i
                else copy.position.y += step
              }
              applyAngles(copy, d.place)
              stampRole(copy, d.role)
              assembly.add(copy)
            }
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
        group.position.sub(first.mid)
        stampRole(group, d.role)
        if (first.held.length) deferredPlanes.push({ planes: first.held, node: group })
        assembly.add(group)
      }
    }

    // ---- equipment ---------------------------------------------------------
    // Cameras, turrets and weapons borrow real meshes from other aircraft in
    // the catalog rather than being invented, and replace the host's own part
    // in that role so you don't end up with two sensor balls.
    const equipment =
      build.slots.payload?.kind === 'none'
        ? []
        : build.payloadIds.map((id) => PAYLOADS_BY_ID[id]).filter((p) => p?.mesh)
    for (const item of equipment) {
      const spec = item.mesh!
      const donor = AIRCRAFT_BY_ID[spec.aircraftId]
      if (!donor) continue

      // Hide whatever the host already had in that role, and note where it
      // physically sat — the middle of its geometry, not the origin of its
      // transform node. On a model with baked geometry every node reports the
      // model origin, so all four of the Reaper's sensor stations came back as
      // the same point in the middle of the fuselage. Four copies of one turret
      // were mounted there, inside the body, invisible: fitting the EO/IR
      // changed nothing you could see, and so did taking it off again.
      baseClone.updateMatrixWorld(true)
      const hostPoints: THREE.Vector3[] = []
      baseClone.traverse((o) => {
        if (roleOf(base, o.name) !== spec.role || !(o as THREE.Mesh).isMesh) return
        const box = new THREE.Box3().setFromObject(o)
        if (!box.isEmpty()) hostPoints.push(box.getCenter(new THREE.Vector3()))
        o.visible = false
      })
      // Furthest forward first: a sensor turret belongs at the nose station, not
      // at whichever one the exporter happened to write down first.
      hostPoints.sort((a, c) => c.z - a.z)

      // Same rule as the donor parts: a piece of equipment that cannot be
      // fetched is missing its picture, and that is all.
      let donorScene: THREE.Group
      try {
        donorScene = await loadModel(donor)
      } catch {
        continue
      }
      if (disposed || mine !== token) return
      const donorClone = donorScene.clone(true)
      donorClone.applyMatrix4(normaliseTransform(donor))
      hideScenery(donorClone, donor)
      donorClone.updateMatrixWorld(true)

      let pieces: THREE.Object3D[] = []
      donorClone.traverse((o) => {
        if (!visibleHere(o, donorClone)) return
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
        // One turret is one turret. Mounting it at every station the host had
        // gave the Reaper four of them; `repeat` is for equipment that really is
        // carried in numbers, like a rack of missiles.
        for (const at of hostPoints.slice(0, Math.max(1, spec.repeat ?? 1))) {
          const copy = unit.clone(true)
          copy.position.copy(at)
          stampRole(copy, 'payload')
          assembly.add(copy)
        }
      } else {
        // nothing equivalent on the host: hang it under the nose
        const hull = new THREE.Box3().setFromObject(baseClone)
        unit.position.set(0, hull.min.y + (hull.max.y - hull.min.y) * 0.12, hull.max.z * 0.45)
        stampRole(unit, 'payload')
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
    if (natural.isEmpty()) {
      // Nothing measurable came out of this build. Report ready anyway: a
      // spinner that never stops is worse than an empty stage, and the stage
      // being empty is itself the honest answer here.
      onStatus({ phase: 'ready' })
      return
    }
    const naturalSize = natural.getSize(new THREE.Vector3())
    const reach = Math.max(naturalSize.x, naturalSize.y, naturalSize.z, 0.05)

    assembly.scale.multiplyScalar(build.scale)

    // Sit it on the ground, centred — on the host's own geometry, not on
    // everything bolted to it.
    //
    // Measured from the whole assembly, the aircraft moved whenever a borrowed
    // part reached past it. A Black Hornet's tail hangs a long way below a
    // Reaper, so taking the lowest point of anything put the Reaper twenty feet
    // in the air, and a part slung out to one side slid it sideways. The host
    // is the thing that should stay still: it is what the view is framed on and
    // what everything else is judged against. A badly placed part now hangs
    // wherever it hangs, which is the honest picture and much easier to see.
    const hostBox = new THREE.Box3()
    assembly.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh || !mesh.visible) return
      if (mesh.userData.ddRole) return // stamped means borrowed
      hostBox.expandByObject(mesh)
    })
    const whole = new THREE.Box3().setFromObject(assembly)
    const box = hostBox.isEmpty() ? whole : hostBox
    const size = whole.getSize(new THREE.Vector3())
    const centre = box.getCenter(new THREE.Vector3())
    assembly.position.sub(new THREE.Vector3(centre.x, box.min.y, centre.z))
    root.add(assembly)
    lastAssembly = assembly
    lastBase = base
    lastBuildKey = JSON.stringify([build.baseId, build.slots, build.scale])

    // Now that the assembly has stopped moving, carry the cuts into world space,
    // which is the only space three.js clips in.
    assembly.updateMatrixWorld(true)
    for (const plane of cutPlanes) plane.applyMatrix4(assembly.matrixWorld)
    // A borrowed part's planes ride its own group, which already includes the
    // assembly's transform.
    for (const batch of deferredPlanes) {
      for (const plane of batch.planes) plane.applyMatrix4(batch.node.matrixWorld)
    }

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
    if (!pinned && (framedFor !== build.baseId || jumped)) {
      framedFor = build.baseId
      framedReach = reach
      controls.target.set(0, size.y * 0.45, 0)
      camera.position.set(reach * 1.1, reach * 0.85, reach * 1.8)
    }
    controls.update()

    // Only now is what is on screen the build the panel is describing.
    onStatus({ phase: 'ready' })
  }

  function resize() {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function frame() {
    pinned = false
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
    retry: () => {
      if (lastRequested) void setBuild(lastRequested)
    },
    camera: () => ({
      position: [camera.position.x, camera.position.y, camera.position.z],
      target: [controls.target.x, controls.target.y, controls.target.z],
    }),
    setCamera: (pose) => {
      camera.position.set(...pose.position)
      controls.target.set(...pose.target)
      controls.update()
      // Hold it there. Clearing framedFor would have done the opposite and
      // forced a reframe on the next build.
      pinned = true
    },
    screenshot: () => renderer.domElement.toDataURL('image/png'),
    report() {
      const out: MeshReport[] = []
      // Stamped with the build it belongs to, so a test can tell the difference
      // between "this aircraft has finished loading" and "you are still looking
      // at the last one". Without it a slow model made every later reading look
      // five times too big.
      if (!lastAssembly) return { buildId: lastBuildKey, meshes: out }
      lastAssembly.updateMatrixWorld(true)
      const box = new THREE.Box3()
      lastAssembly.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (!mesh.isMesh || !mesh.visible) return
        // A parent further up may be hidden even when this node is not.
        for (let p: THREE.Object3D | null = mesh.parent; p; p = p.parent) {
          if (!p.visible) return
        }
        box.setFromObject(mesh)
        if (box.isEmpty()) return
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        out.push({
          clips: mats.reduce((n, m) => n + ((m as THREE.Material).clippingPlanes?.length ?? 0), 0),
          name: mesh.name,
          // Resolved the same way the builder resolves it, so a test can ask
          // whether the app can actually find a part rather than guessing at
          // the name-matching rules from outside.
          // The stamp first, because a borrowed part's name belongs to the
          // aircraft it came from and will not resolve against this one.
          role:
            (typeof mesh.userData.ddRole === 'string' ? mesh.userData.ddRole : null) ??
            (lastBase && roleOf(lastBase, mesh.name)) ??
            '',
          min: [box.min.x, box.min.y, box.min.z],
          max: [box.max.x, box.max.y, box.max.z],
        })
      })
      return { buildId: lastBuildKey, meshes: out }
    },
    joinGap(role, against) {
      if (!lastAssembly) return null
      lastAssembly.updateMatrixWorld(true)
      const mine: number[] = []
      const theirs: number[] = []
      const v = new THREE.Vector3()
      lastAssembly.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (!mesh.isMesh || !mesh.visible) return
        for (let p: THREE.Object3D | null = mesh.parent; p; p = p.parent) if (!p.visible) return
        const position = mesh.geometry?.getAttribute('position')
        if (!position) return
        const resolved =
          (typeof mesh.userData.ddRole === 'string' ? mesh.userData.ddRole : null) ??
          (lastBase && roleOf(lastBase, mesh.name)) ??
          ''
        // Measured against the body by default rather than against anything at
        // all. The Reaper carries missiles and pylons a metre outboard, and a
        // wing floating clear of the fuselage still passes close to those - it
        // read as attached to the aircraft while being attached to nothing. A
        // wing joins a fuselage.
        const wanted = against ?? 'body'
        if (resolved !== role && resolved !== wanted) return
        const into = resolved === role ? mine : theirs
        // A clipped mesh still carries every vertex it ever had, including the
        // ones on the far side of the cut that are not drawn. Counting those
        // would measure a wing against a fuselage that is not on screen.
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        const planes = mats.flatMap((m) => (m as THREE.Material).clippingPlanes ?? [])
        // Sample rather than take every vertex: a hull can carry 60,000 of them
        // and the answer does not need that resolution.
        const stride = Math.max(1, Math.floor(position.count / 1500))
        for (let i = 0; i < position.count; i += stride) {
          v.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld)
          let kept = true
          for (const plane of planes) {
            if (plane.distanceToPoint(v) < 0) {
              kept = false
              break
            }
          }
          if (kept) into.push(v.x, v.y, v.z)
        }
      })
      if (!mine.length || !theirs.length) return null
      let best = Infinity
      for (let a = 0; a < mine.length; a += 3) {
        for (let b = 0; b < theirs.length; b += 3) {
          const dx = mine[a] - theirs[b]
          const dy = mine[a + 1] - theirs[b + 1]
          const dz = mine[a + 2] - theirs[b + 2]
          const d = dx * dx + dy * dy + dz * dz
          if (d < best) best = d
        }
      }
      return {
        gap: Math.sqrt(best),
        partPoints: mine.length / 3,
        hostPoints: theirs.length / 3,
      }
    },
    isolate(role, invert = false) {
      if (!lastAssembly) return
      lastAssembly.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (!mesh.isMesh) return
        if (mesh.userData.ddShown === undefined) mesh.userData.ddShown = mesh.visible
        if (role === null) {
          mesh.visible = mesh.userData.ddShown as boolean
          return
        }
        // The same resolution report() uses, and the stamp first: a borrowed
        // part's name belongs to the aircraft it came from and will not resolve
        // against this one.
        const mine =
          (typeof mesh.userData.ddRole === 'string' ? mesh.userData.ddRole : null) ??
          (lastBase && roleOf(lastBase, mesh.name)) ??
          ''
        const match = invert ? mine !== role : mine === role
        mesh.visible = (mesh.userData.ddShown as boolean) && match
      })
    },
    dispose() {
      disposed = true
      renderer.setAnimationLoop(null)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    },
  }
}
