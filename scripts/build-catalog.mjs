#!/usr/bin/env node
/**
 * Fold the source manifest and the classifier output into one generated
 * TypeScript module the app imports, and write the credits file.
 *
 * CC-BY requires attribution to travel with the asset, so ATTRIBUTIONS.md and
 * the in-app credits panel are both generated from the same metadata rather
 * than maintained by hand.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'assets-src')
const sources = JSON.parse(readFileSync(resolve(ROOT, 'scripts/sources.json'), 'utf8'))

const LICENSE_NAMES = {
  'CC-BY-4.0': 'CC Attribution 4.0',
  'CC0-1.0': 'CC0 1.0 (public domain dedication)',
  'public-domain': 'Public domain (NASA)',
  'BSD-3-Clause': 'BSD 3-Clause',
}

const entries = []
for (const ac of sources.aircraft) {
  const partsPath = resolve(SRC, `${ac.id}.parts.json`)
  if (!existsSync(partsPath) || !existsSync(resolve(ROOT, `public/models/${ac.id}.glb`))) {
    console.warn(`skipping ${ac.id}: not built`)
    continue
  }
  const geo = JSON.parse(readFileSync(partsPath, 'utf8'))
  entries.push({
    id: ac.id,
    name: ac.name,
    family: ac.family,
    blurb: ac.blurb,
    environment: ac.environment ?? 'earth',
    model: `models/${ac.id}.glb`,
    // Underscore keys in the manifest are notes to whoever reads it next, not
    // data the app has a type for.
    spec: Object.fromEntries(Object.entries(ac.spec).filter(([k]) => !k.startsWith('_'))),
    axes: geo.axes,
    aftSign: geo.aftSign,
    scaleToMetres: geo.scaleToMetres,
    modelExtent: geo.modelExtent,
    origin: geo.origin,
    cuts: geo.cuts ?? {},
    hidden: geo.hidden ?? [],
    parts: geo.parts.map((p) => ({
      node: p.node,
      group: p.group,
      role: p.role,
      side: p.side,
      center: p.center,
      size: p.size,
      swappable: p.swappable,
    })),
    credit: {
      author: ac.source.author,
      license: ac.source.license,
      licenseName: LICENSE_NAMES[ac.source.license] ?? ac.source.license,
      url: ac.source.url ?? ac.source.credit_url ?? '',
    },
  })
}

const banner = `// GENERATED FILE - do not edit.
// Produced by scripts/build-catalog.mjs from scripts/sources.json and the
// classifier output in assets-src/. Regenerate with: npm run assets
`

mkdirSync(resolve(ROOT, 'src/data'), { recursive: true })
writeFileSync(
  resolve(ROOT, 'src/data/aircraft.generated.ts'),
  `${banner}
import type { AircraftModel } from '../types'

export const AIRCRAFT: AircraftModel[] = ${JSON.stringify(entries, null, 2)}

export const AIRCRAFT_BY_ID: Record<string, AircraftModel> = Object.fromEntries(
  AIRCRAFT.map((a) => [a.id, a]),
)
`,
)

// ---- credits -------------------------------------------------------------
const rows = entries
  .map((e) => `| ${e.name} | ${e.credit.author} | ${e.credit.licenseName} | ${e.credit.url ? `[source](${e.credit.url})` : '—'} |`)
  .join('\n')

writeFileSync(
  resolve(ROOT, 'ATTRIBUTIONS.md'),
  `# Attributions

DroneDome is built from 3D models made by other people. Every aircraft below is
used under the licence shown, and the same credits appear inside the app under
**Credits** so that attribution travels with the asset as the licences require.

If you are one of the authors listed here and want a credit corrected or your
model removed, please open an issue.

| Aircraft | Author | Licence | Source |
| --- | --- | --- | --- |
${rows}

## Sources

- **NASA 3D Resources** — https://github.com/nasa/NASA-3D-Resources — NASA
  material is generally not subject to copyright. Credit is given as a courtesy.
- **Gazebo Fuel** — https://app.gazebosim.org — community robotics models under
  Creative Commons licences.
- **PX4** — https://github.com/PX4/PX4-gazebo-models — BSD 3-Clause.
- **Sketchfab** — https://sketchfab.com — downloadable models provided by
  Sketchfab, used under Creative Commons Attribution. Attribution to the
  original author and to Sketchfab is required wherever the model appears.

## Software

- [three.js](https://threejs.org) — MIT
- [glTF-Transform](https://gltf-transform.dev) — MIT
- [Draco](https://github.com/google/draco) — Apache 2.0

## Specifications

Published performance figures in \`scripts/sources.json\` are drawn from
manufacturer and public reference data. They anchor the simulation to reality,
but DroneDome is a toy, not an engineering tool — do not use its numbers to
build anything that leaves the ground.
`,
)

console.log(`catalog: ${entries.length} aircraft`)
for (const e of entries) {
  const roles = {}
  for (const p of e.parts) roles[p.role] = (roles[p.role] ?? 0) + 1
  const cuts = Object.keys(e.cuts)
  console.log(
    `  ${e.id.padEnd(14)} ${String(e.parts.length).padStart(2)} parts  ` +
    `${Object.entries(roles).map(([k, v]) => `${k}:${v}`).join(' ')}` +
    (cuts.length ? `  cuts[${cuts.join(',')}]` : ''),
  )
}
