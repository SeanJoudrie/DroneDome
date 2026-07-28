import type { Build } from '../types'

const KEY = 'dronedome.builds.v1'
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
    return Array.isArray(parsed) ? (parsed as Build[]) : []
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
  const next = { ...build, updatedAt: Date.now() }
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
