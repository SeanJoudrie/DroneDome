import { useEffect, useMemo, useRef, useState } from 'react'
import type { Build } from './types'
import { AIRCRAFT } from './data/aircraft.generated'
import { availableRoles, createBuild, isChimera, newId, randomBuild } from './lib/build'
import { analyse } from './lib/physics'
import {
  deleteBuild,
  loadBuilds,
  loadPrefs,
  savePrefs,
  upsertBuild,
} from './lib/storage'
import { createViewer, type ViewerHandle } from './three/viewer'
import { Credits, SlotList, Stats, type PickerTarget } from './components/Panels'

const FAMILY_ORDER = ['military', 'experimental', 'consumer', 'hobby'] as const
const FAMILY_LABEL: Record<string, string> = {
  military: 'Military',
  experimental: 'Experimental',
  consumer: 'Consumer',
  hobby: 'Hobby & FPV',
}

export default function App() {
  const [build, setBuild] = useState<Build>(() => createBuild('mq9-reaper'))
  const [saved, setSaved] = useState<Build[]>(() => loadBuilds())
  const [units, setUnits] = useState(() => loadPrefs().units)
  const [theme, setTheme] = useState(() => loadPrefs().theme)
  const [target, setTarget] = useState<PickerTarget | null>(null)
  const [creditsOpen, setCreditsOpen] = useState(false)

  const mountRef = useRef<HTMLDivElement | null>(null)
  const viewerRef = useRef<ViewerHandle | null>(null)

  // ---- viewer lifecycle ---------------------------------------------------
  useEffect(() => {
    if (!mountRef.current) return
    const viewer = createViewer(mountRef.current)
    viewerRef.current = viewer
    // Handle for the geometry self-checks. They drive the real interface and
    // then ask the renderer where every mesh actually ended up, which is the
    // only way to catch a part quietly floating off across 35 airframes.
    ;(window as unknown as { dronedome?: unknown }).dronedome = {
      report: () => viewer.report(),
      setBuild: (b: Build) => setBuild(b),
    }
    ;(window as unknown as { __mk?: unknown }).__mk = (id: string) => createBuild(id)
    const onResize = () => viewer.resize()
    window.addEventListener('resize', onResize)
    const observer = new ResizeObserver(onResize)
    observer.observe(mountRef.current)
    return () => {
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      viewer.dispose()
      viewerRef.current = null
    }
  }, [])

  useEffect(() => {
    viewerRef.current?.setBuild(build)
  }, [build])

  useEffect(() => {
    savePrefs({ units, theme })
    // Components read theme only through CSS variables, so one attribute on the
    // root element restyles the whole app.
    document.documentElement.dataset.theme = theme
    viewerRef.current?.setTheme(theme)
  }, [units, theme])

  const analysis = useMemo(() => analyse(build), [build])
  const roles = useMemo(() => availableRoles(build.baseId), [build.baseId])
  const chimera = isChimera(build)

  const update = (next: Build) => setBuild({ ...next, updatedAt: Date.now() })

  const pickPreset = (id: string) => {
    setTarget(null)
    setBuild(createBuild(id))
  }

  const save = () => {
    const name = window.prompt('Name this build', build.name)?.trim()
    if (!name) return
    // Saving a loaded build again updates it; a renamed one becomes its own.
    const exists = saved.some((b) => b.id === build.id)
    const toSave: Build =
      exists && name === build.name ? { ...build, name } : { ...build, id: newId(), name }
    setSaved(upsertBuild(toSave))
    setBuild(toSave)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          Drone<span>Dome</span>
        </div>

        <select
          value={build.baseId}
          onChange={(e) => pickPreset(e.target.value)}
          title="Start from a real aircraft"
        >
          {FAMILY_ORDER.map((family) => (
            <optgroup key={family} label={FAMILY_LABEL[family]}>
              {AIRCRAFT.filter((a) => a.family === family).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {chimera && <span className="chimera-badge">modified</span>}

        <div className="spacer" />

        <div className="seg">
          <button className={units === 'metric' ? 'on' : ''} onClick={() => setUnits('metric')}>
            Metric
          </button>
          <button className={units === 'imperial' ? 'on' : ''} onClick={() => setUnits('imperial')}>
            Imperial
          </button>
        </div>

        <div className="seg" title="Interface theme">
          <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>
            Terminal
          </button>
          <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>
            Workshop
          </button>
        </div>

        {saved.length > 0 && (
          <select
            value=""
            onChange={(e) => {
              const found = saved.find((b) => b.id === e.target.value)
              if (found) setBuild(found)
            }}
            title="Load a saved build"
          >
            <option value="">My builds ({saved.length})</option>
            {saved.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        )}

        <button
          className="btn primary"
          title="Splice something at random"
          onClick={() => {
            setTarget(null)
            setBuild(randomBuild())
          }}
        >
          Randomise
        </button>
        <button className="btn" onClick={save}>
          Save
        </button>
        {saved.some((b) => b.id === build.id) && (
          <button
            className="btn ghost"
            onClick={() => {
              setSaved(deleteBuild(build.id))
            }}
          >
            Delete
          </button>
        )}
        <button className="btn ghost" onClick={() => setCreditsOpen(true)}>
          Credits
        </button>
      </header>

      <div className="stage">
        <div className="col col-build">
          <SlotList
            build={build}
            roles={roles}
            target={target}
            system={units}
            onSelect={setTarget}
            onChange={update}
          />
        </div>

        <div className="col col-stage">
          <div className="viewer" ref={mountRef}>
            <div className="viewer-tools">
              <button className="btn" onClick={() => viewerRef.current?.frame()}>
                Recentre
              </button>
              {/* The renderer has always been able to hand back a PNG. Nothing
                  ever asked it for one, so there was no way to keep a picture
                  of a build you liked. */}
              <button
                className="btn"
                title="Save a PNG of this build"
                onClick={() => {
                  const png = viewerRef.current?.screenshot()
                  if (!png) return
                  const a = document.createElement('a')
                  a.href = png
                  a.download = `${build.name.replace(/[^\w-]+/g, '-').toLowerCase()}.png`
                  a.click()
                }}
              >
                Snapshot
              </button>
            </div>
            <div className="viewer-hint">drag to orbit · scroll to zoom</div>
          </div>

          <section className="panel">
            <div className="scale-bar">
              <span className="panel-title">Scale</span>
              <input
                type="range"
                min={0.25}
                max={4}
                step={0.05}
                value={build.scale}
                onChange={(e) => update({ ...build, scale: Number(e.target.value) })}
              />
              <span className="scale-value">{build.scale.toFixed(2)}×</span>
              {build.scale !== 1 && (
                <button className="btn ghost" onClick={() => update({ ...build, scale: 1 })}>
                  Reset
                </button>
              )}
            </div>
          </section>
        </div>

        <div className="col col-data">
          <Stats analysis={analysis} system={units} />
        </div>
      </div>

      {creditsOpen && <Credits onClose={() => setCreditsOpen(false)} />}
    </div>
  )
}
