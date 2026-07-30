/**
 * Run the three browser-driven gates against the build that actually ships.
 *
 * They used to be run by hand against whatever `vite preview` was already
 * serving, which meant base '/' — while GitHub Pages serves the app from
 * '/DroneDome/'. Every runtime asset path in the viewer is composed from
 * import.meta.env.BASE_URL: the 35 models, the Draco decoder, the favicon. Under
 * base '/' that value is a single slash, so a subpath-only regression — a
 * leading slash added somewhere, a path joined by hand — passed all three gates
 * and would only have appeared on the live site.
 *
 * So this builds with the deployed base, serves it at that subpath, and points
 * each gate at it. Roughly 2,400 automated operations move onto the
 * configuration that is really published.
 *
 *   npm run gates              # all three
 *   npm run gates removal      # one of them
 */
import { spawn, spawnSync } from 'node:child_process'

const BASE = '/DroneDome/'
const PORT = 4173
const URL = `http://localhost:${PORT}${BASE}`

const GATES = {
  strip: 'scripts/strip-sweep.mjs',
  cuts: 'scripts/cut-sweep.mjs',
  removal: 'scripts/removal-sweep.mjs',
  capability: 'scripts/capability-sweep.mjs',
  geometry: 'scripts/geometry-sweep.mjs',
}

const wanted = process.argv.slice(2)
const chosen = wanted.length ? wanted : Object.keys(GATES)
for (const name of chosen) {
  if (!GATES[name]) {
    console.error(`unknown gate "${name}" — expected one of ${Object.keys(GATES).join(', ')}`)
    process.exit(2)
  }
}

const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', shell: false })

console.log(`\n· building with base ${BASE}`)
if (run('npx', ['vite', 'build', `--base=${BASE}`, '--outDir', 'dist-ci']).status !== 0) {
  console.error('build failed')
  process.exit(1)
}

console.log(`· serving dist-ci at ${URL}`)
const server = spawn(
  'npx',
  ['vite', 'preview', `--base=${BASE}`, '--outDir', 'dist-ci', '--port', String(PORT), '--strictPort'],
  { stdio: 'ignore' },
)
const stop = () => {
  try {
    server.kill('SIGTERM')
  } catch {
    /* already gone */
  }
}
process.on('exit', stop)
process.on('SIGINT', () => {
  stop()
  process.exit(130)
})

// Wait for the server rather than sleeping a fixed amount: a cold Vite start is
// slower than a warm one, and a fixed sleep either wastes time or races.
const ready = await (async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(URL)
      if (res.ok) return true
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
})()
if (!ready) {
  console.error(`server never answered at ${URL}`)
  process.exit(1)
}

let failed = 0
for (const name of chosen) {
  console.log(`\n──── ${name} ────`)
  const res = run('node', [GATES[name], URL])
  if (res.status !== 0) failed++
}

stop()
console.log(failed ? `\n${failed} gate(s) failed.\n` : '\nall gates passed.\n')
process.exit(failed ? 1 : 0)
