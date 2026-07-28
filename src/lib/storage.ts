import type { Build } from '../types'
import { AIRCRAFT_BY_ID } from '../data/aircraft.generated'

const KEY = 'dronedome.builds.v1'
/** Bump when the Build shape changes incompatibly. */
export const BUILD_SCHEMA = 1
const PREFS = 'dronedome.prefs.v1'

export type ThemeId = 'light' | 'dark'

export interface Prefs {
  units: 'metric' | 'imperial'
  theme: ThemeId
}

export function loadBuilds(): Build[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // A saved build can outlive the aircraft it was built from - a renamed or
    // removed model would otherwise reach analyse() and take the whole app
    // down with it on load.
    return (parsed as Build[]).filter(
      (b) =>
        b &&
        typeof b.id === 'string' &&
        (b.v ?? 1) === BUILD_SCHEMA &&
        !!AIRCRAFT_BY_ID[b.baseId],
    )
  } catch {
    return []
  }
}

export function saveBuilds(builds: Build[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(builds))
  } catch {
    // Private browsing, quota, whatever — losing saves is not worth crashing over.
  }
}

export function upsertBuild(build: Build): Build[] {
  const all = loadBuilds()
  const next = { ...build, v: BUILD_SCHEMA, updatedAt: Date.now() }
  const at = all.findIndex((b) => b.id === build.id)
  if (at >= 0) all[at] = next
  else all.unshift(next)
  saveBuilds(all)
  return all
}

export function deleteBuild(id: string): Build[] {
  const all = loadBuilds().filter((b) => b.id !== id)
  saveBuilds(all)
  return all
}

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS)
    if (raw) return { units: 'metric', theme: 'dark', ...JSON.parse(raw) }
  } catch {
    /* fall through to defaults */
  }
  return { units: 'metric', theme: 'dark' }
}

export function savePrefs(prefs: Prefs) {
  try {
    localStorage.setItem(PREFS, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}
