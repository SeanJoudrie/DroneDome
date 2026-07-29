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
 * The nodes for that role are lifted into a group hanging off the model root,
 * keeping their transforms relative to it, so scaling the group grows the part
 * outward from the aircraft's centreline — bigger wings reach further out from
 * the fuselage rather than sliding sideways off it.
 */
function scaleRole(
  modelRoot: THREE.Object3D,
  nodes: THREE.Object3D[],
  factor: number,
  offset?: THREE.Vector3,
  tiltDeg = 0,
) {
  const moved = offset && offset.lengthSq() > 1e-9
  if (!nodes.length || (Math.abs(factor - 1) < 0.001 && !moved && !tiltDeg)) return
  modelRoot.updateMatrixWorld(true)
  const invRoot = new THREE.Matrix4().copy(modelRoot.matrixWorld).invert()
  const relatives = nodes.map((n) =>
    new THREE.Matrix4().multiplyMatrices(invRoot, n.matrixWorld),
  )
  const group = new THREE.Group()
  modelRoot.add(group)
  nodes.forEach((node, i) => {
    group.add(node)
    node.matrixAutoUpdate = false
    node.matrix.copy(relatives[i])
  })
  group.scale.setScalar(factor)
  if (offset) group.position.add(offset)
  if (tiltDeg) group.rotateX((-tiltDeg * Math.PI) / 180)
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
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mesh.material = mats.map((m) => {
        const clone = (m as THREE.MeshStandardMaterial).clone()
        clone.color = colour.clone()
        clone.map = null
        clone.needsUpdate = true
        return clone
      })
      if (!Array.isArray(mesh.material)) mesh.material = mesh.material[0]
    })
  }

  /**
   * Hide the part of a welded mesh that a role occupies. NASA's Global Hawk has
   * its wings fused into the fuselage, so removing them means keeping only the
   * centre band — two opposed planes, whose intersection is that band.
   */
  function applyCut(object: THREE.Object3D, model: AircraftModel, role: PartRole) {
    const cut = model.cuts[role]
    if (!cut) return
    // After normalisation the span axis is world X.
    const keep = cut.keep * model.scaleToMetres
    const planes = [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), keep),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), keep),
    ]
    object.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      for (const m of mats) {
        const mat = m as THREE.Material
        mat.clippingPlanes = planes
        mat.clipIntersection = false
        mat.side = THREE.DoubleSide
        mat.needsUpdate = true
      }
    })
  }

  async function setBuild(build: Build) {
    const mine = ++token
    const base = AIRCRAFT_BY_ID[build.baseId]
    if (!base) return

    const baseScene = await loadModel(base)
    if (disposed || mine !== token) return

    clearRoot()

    const assembly = new THREE.Group()
    const baseClone = baseScene.clone(true)
    baseClone.applyMatrix4(normaliseTransform(base))
    assembly.add(baseClone)

    // Work out what each role is doing before touching the scene graph.
    const removed = new Set<PartRole>()
    const donors: {
      role: PartRole
      model: AircraftModel
      fit: number
      count: number
      place?: SlotPlacement
    }[] = []
    for (const role of SWAP_ROLES) {
      const choice = build.slots[role]
      if (!choice || choice.kind === 'stock') continue
      removed.add(role)
      if (choice.kind === 'donor') {
        const donor = AIRCRAFT_BY_ID[choice.aircraftId]
        if (!donor) continue
        donors.push({
          role,
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
      const nodes: THREE.Object3D[] = []
      baseClone.traverse((o) => {
        if (roleOf(base, o.name) === role && (o as THREE.Mesh).isMesh) nodes.push(o)
      })
      if (!nodes.length) continue
      const hull = new THREE.Box3().setFromObject(baseClone)
      const size = hull.getSize(new THREE.Vector3())
      const off = new THREE.Vector3(
        0,
        (place.rise ?? 0) * size.y * 0.5,
        (place.fore ?? 0) * size.z * -0.5,
      )
      scaleRole(baseClone, nodes, factor, off, tilt)
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
        if (roleOf(d.model, o.name) === d.role && (o as THREE.Mesh).isMesh) pieces.push(o)
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
        const hull = new THREE.Box3().setFromObject(baseClone)
        const size = hull.getSize(new THREE.Vector3())
        const nudge = new THREE.Vector3(
          0,
          (d.place?.rise ?? 0) * size.y * 0.5,
          (d.place?.fore ?? 0) * size.z * -0.5,
        )
        for (const point of hostMounts.slice(0, Math.max(1, d.count))) {
          const copy = group.clone(true)
          copy.position.copy(point).add(nudge)
          assembly.add(copy)
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
