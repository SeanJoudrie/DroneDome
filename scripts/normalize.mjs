#!/usr/bin/env node
/**
 * Decode compressed source models into plain GLB so the classifier can read
 * their geometry. NASA's models ship Draco-compressed, and trimesh returns
 * silently-zeroed vertices for those rather than raising - so this runs first.
 *
 * assets-src/<id>.glb -> assets-src/<id>.norm.glb
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { dedup, weld } from '@gltf-transform/functions'
import draco3d from 'draco3dgltf'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'assets-src')
const sources = JSON.parse(readFileSync(resolve(ROOT, 'scripts/sources.json'), 'utf8'))

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  })

const only = new Set(process.argv.slice(2))

for (const ac of sources.aircraft) {
  const id = ac.id
  if (only.size && !only.has(id)) continue
  const inPath = resolve(SRC, `${id}.glb`)
  const outPath = resolve(SRC, `${id}.norm.glb`)
  if (!existsSync(inPath)) continue

  try {
    const doc = await io.read(inPath)
    // Dropping the Draco extension on write is what actually decodes it.
    for (const ext of doc.getRoot().listExtensionsUsed()) {
      if (ext.extensionName === 'KHR_draco_mesh_compression') ext.dispose()
    }
    await doc.transform(dedup(), weld({ tolerance: 0 }))
    writeFileSync(outPath, await io.writeBinary(doc))

    const meshes = doc.getRoot().listMeshes().length
    const prims = doc.getRoot().listMeshes().reduce((n, m) => n + m.listPrimitives().length, 0)
    const kb = Math.round(readFileSync(outPath).length / 1024)
    console.log(`${id.padEnd(14)} decoded  meshes=${meshes} prims=${prims}  ${kb} KB`)
  } catch (err) {
    console.error(`${id.padEnd(14)} FAILED: ${err.message}`)
  }
}
