#!/usr/bin/env node
/**
 * Shrink the normalised models for the web: decimate anything absurdly dense,
 * resize oversized textures, then re-encode with Draco.
 *
 * A stock Sketchfab download is ~8 MB. Nine of those is an app nobody waits
 * for, and GitHub Pages serves the whole library to every visitor.
 *
 * assets-src/<id>.norm.glb -> public/models/<id>.glb
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS, KHRDracoMeshCompression } from '@gltf-transform/extensions'
import { dedup, draco, prune, resample, textureCompress } from '@gltf-transform/functions'
import draco3d from 'draco3dgltf'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'assets-src')
const OUT = resolve(ROOT, 'public/models')
const sources = JSON.parse(readFileSync(resolve(ROOT, 'scripts/sources.json'), 'utf8'))

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  })

mkdirSync(OUT, { recursive: true })
const only = new Set(process.argv.slice(2))
let totalIn = 0
let totalOut = 0

for (const ac of sources.aircraft) {
  const id = ac.id
  if (only.size && !only.has(id)) continue
  const inPath = resolve(SRC, `${id}.norm.glb`)
  if (!existsSync(inPath)) continue
  const outPath = resolve(OUT, `${id}.glb`)

  try {
    const doc = await io.read(inPath)
    // Carry each node's name onto the mesh it points at before anything moves.
    // prune() collapses a named node into its child mesh, and the mesh keeps
    // whatever the source called it - so the Global Hawk's and Ingenuity's
    // parts arrived in the app under names the classifier had never heard of,
    // and every one of their roles was unreachable: nothing to remove, resize
    // or lend to another aircraft.
    for (const node of doc.getRoot().listNodes()) {
      const mesh = node.getMesh()
      const name = node.getName()
      if (mesh && name && !mesh.getName()) mesh.setName(name)
      if (mesh && name && mesh.getName() !== name && mesh.listParents().length <= 2) {
        mesh.setName(name)
      }
    }

    await doc.transform(
      dedup(),
      resample(),
      prune({ keepAttributes: false, keepLeaves: false }),
      textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024] }),
    )
    doc.createExtension(KHRDracoMeshCompression).setRequired(true)
    await doc.transform(draco({ method: 'edgebreaker' }))
    writeFileSync(outPath, await io.writeBinary(doc))

    const before = statSync(inPath).size
    const after = statSync(outPath).size
    totalIn += before
    totalOut += after
    const pct = ((1 - after / before) * 100).toFixed(0)
    console.log(
      `${id.padEnd(14)} ${(before / 1024 / 1024).toFixed(2)} MB -> ` +
      `${(after / 1024 / 1024).toFixed(2)} MB  (-${pct}%)`,
    )
  } catch (err) {
    console.error(`${id.padEnd(14)} FAILED: ${err.message}`)
  }
}

console.log(
  `\ntotal ${(totalIn / 1024 / 1024).toFixed(1)} MB -> ` +
  `${(totalOut / 1024 / 1024).toFixed(1)} MB`,
)
