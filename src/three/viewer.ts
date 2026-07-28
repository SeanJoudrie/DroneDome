import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { AircraftModel, Build, PartRole } from '../types'
import { AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import { PAINTS } from '../data/catalog'
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

/** Which physical part a node belongs to — a rotor's blade and bell share one. */
function groupOf(model: AircraftModel, objectName: string): string {
  const part = model.parts.find((p) => p.node === objectName || p.group === objectName)
  return part ? part.group : objectName
}

export interface ViewerHandle {
  setBuild(build: Build): void
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
  scene.background = new THREE.Color('#eef1f4')

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

  const grid = new THREE.GridHelper(1, 20, '#b9c4d0', '#d5dce4')
  ;(grid.material as THREE.Material).transparent = true
  ;(grid.material as THREE.Material).opacity = 0.55
  scene.add(grid)

  const root = new THREE.Group()
  scene.add(root)

  let disposed = false
  let token = 0

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
    const donors: { role: PartRole; model: AircraftModel; fit: number; count: number }[] = []
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
          fit: choice.scale ?? fitScaleFor(base, donor),
          count: choice.count ?? donor.spec.rotors ?? 1,
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
      for (const piece of pieces) {
        const copy = piece.clone(true)
        copy.applyMatrix4(piece.matrixWorld)
        copy.position.copy(new THREE.Vector3().setFromMatrixPosition(piece.matrixWorld))
        group.add(copy)
      }
      group.scale.setScalar(d.fit)

      // Rotors get laid out on the host's own mounting points where it has
      // them, otherwise spread evenly around the airframe.
      const hostMounts = mounts.get(d.role)
      if (d.role === 'rotor' && (!hostMounts || hostMounts.length < d.count)) {
        const radius = (base.spec.span_m * 0.32) || 0.5
        for (let i = 0; i < d.count; i++) {
          const arm = group.clone(true)
          const angle = (i / d.count) * Math.PI * 2 + Math.PI / 4
          arm.position.set(Math.cos(angle) * radius, base.spec.span_m * 0.03, Math.sin(angle) * radius)
          assembly.add(arm)
        }
      } else if (hostMounts && hostMounts.length) {
        for (const point of hostMounts.slice(0, Math.max(1, d.count))) {
          const copy = group.clone(true)
          copy.position.copy(point)
          assembly.add(copy)
        }
      } else {
        assembly.add(group)
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
    assembly.scale.multiplyScalar(build.scale)

    // Sit it on the ground and frame it.
    const box = new THREE.Box3().setFromObject(assembly)
    if (box.isEmpty()) return
    const size = box.getSize(new THREE.Vector3())
    const centre = box.getCenter(new THREE.Vector3())
    assembly.position.sub(new THREE.Vector3(centre.x, box.min.y, centre.z))
    root.add(assembly)

    const reach = Math.max(size.x, size.y, size.z, 0.1)
    grid.scale.setScalar(reach * 3)
    ground.scale.setScalar(reach * 8)
    controls.target.set(0, size.y * 0.45, 0)
    camera.position.set(reach * 0.9, reach * 0.75, reach * 1.5)
    camera.near = reach / 400
    camera.far = reach * 200
    camera.updateProjectionMatrix()
    key.position.set(reach * 1.2, reach * 2, reach * 0.8)
    const shadowSpan = reach * 2
    const cam = key.shadow.camera as THREE.OrthographicCamera
    cam.left = -shadowSpan
    cam.right = shadowSpan
    cam.top = shadowSpan
    cam.bottom = -shadowSpan
    cam.near = 0.01
    cam.far = shadowSpan * 6
    cam.updateProjectionMatrix()
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

  resize()
  renderer.setAnimationLoop(() => {
    controls.update()
    renderer.render(scene, camera)
  })

  return {
    setBuild: (b) => void setBuild(b),
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
