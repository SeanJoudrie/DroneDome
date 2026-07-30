import { useEffect, useMemo, useRef, useState } from 'react'
import type { Build } from './types'
import { AIRCRAFT } from './data/aircraft.generated'
import {
  availableRoles,
  capabilityMatrix,
  createBuild,
  isChimera,
  newId,
  randomBuild,
} from './lib/build'
import { analyse } from './lib/physics'
import {
  deleteBuild,
  loadBuilds,
  loadPrefs,
  savePrefs,
  upsertBuild,
} from './lib/storage'
import { createViewer, type ViewerHandle, type ViewerStatus } from './three/viewer'
import { Credits, SlotList, Stats, type PickerTarget } from './components/Panels'
import { describeBuild } from './lib/build'
import { buildFromQuery, buildToQuery, shareUrl } from './lib/share'

/**
 * Can this browser draw at all?
 *
 * Asked before the viewer is built rather than after it throws. Without this
 * the error boundary caught the failure and told the reader "that build broke
 * something — a build should never be able to do this", which sends someone
 * looking at their wings when the answer is in their graphics settings. On a
 * managed laptop with a GPU blocklist that was the entire first impression.
 */
function webglAvailable(): boolean {
  try {
    const probe = document.createElement('canvas')
    return !!(probe.getContext('webgl2') || probe.getContext('webgl'))
  } catch {
    return false
  }
}

const FAMILY_ORDER = ['military', 'experimental', 'consumer', 'hobby'] as const
const FAMILY_LABEL: Record<string, string> = {
  military: 'Military',
  experimental: 'Experimental',
  consumer: 'Consumer',
  hobby: 'Hobby & FPV',
}

export default function App() {
  // A link wins over the default, so a shared build opens as the thing that was
  // shared rather than as an MQ-9 the recipient then has to rebuild.
  const [build, setBuild] = useState<Build>(
    () => buildFromQuery(location.search) ?? createBuild('mq9-reaper'),
  )
  const [saved, setSaved] = useState<Build[]>(() => loadBuilds())
  const [units, setUnits] = useState(() => loadPrefs().units)
  const [theme, setTheme] = useState(() => loadPrefs().theme)
  const [target, setTarget] = useState<PickerTarget | null>(null)
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [status, setStatus] = useState<ViewerStatus>({ phase: 'ready' })
  const [copied, setCopied] = useState(false)
  const [canRender] = useState(webglAvailable)

  const mountRef = useRef<HTMLDivElement | null>(null)
  const viewerRef = useRef<ViewerHandle | null>(null)

  // ---- viewer lifecycle ---------------------------------------------------
  useEffect(() => {
    if (!mountRef.current || !canRender) return
    const viewer = createViewer(mountRef.current, setStatus)
    viewerRef.current = viewer
    // Handle for the geometry self-checks. They drive the real interface and
    // then ask the renderer where every mesh actually ended up, which is the
    // only way to catch a part quietly floating off across 35 airframes.
    ;(window as unknown as { dronedome?: unknown }).dronedome = {
      report: () => viewer.report(),
      setBuild: (b: Build) => setBuild(b),
      // Which parts the app itself believes are swappable, so the capability
      // check tests the live catalog rather than a snapshot of it.
      caps: () => capabilityMatrix(),
      // Holding the view still is what makes two renders comparable: a cut can
      // then be confirmed by what changed in the picture rather than inferred.
      camera: () => viewer.camera(),
      setCamera: (pose: Parameters<ViewerHandle['setCamera']>[0]) => viewer.setCamera(pose),
      // Releases the pin and re-frames on whatever is loaded now. A check that
      // pins the view for one aircraft must let go before the next, or every
      // later airframe is photographed from the distance the previous one
      // needed — a 35 cm quadcopter shot from where a 20 m Reaper was framed is
      // a speck, and every removal on it reads as changing nothing.
      frame: () => viewer.frame(),
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
  }, [canRender])

  useEffect(() => {
    viewerRef.current?.setBuild(build)
  }, [build])

  // Keep the address bar describing what is on screen, with replaceState rather
  // than pushState: a slider drag would otherwise stack a hundred history
  // entries and make Back useless.
  useEffect(() => {
    const query = buildToQuery(build)
    history.replaceState(null, '', `${location.pathname}?${query}`)
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

  const busy = status.phase === 'loading'
  const description = describeBuild(build)

  return (
    <div className="app">
      {/* 24 tab stops used to stand between the keyboard and the first control
          that changes the aircraft. */}
      <a className="skip" href="#build">
        Skip to the build controls
      </a>
      <header className="topbar">
        <h1 className="brand">
          Drone<span>Dome</span>
        </h1>

        <label className="sr-only" htmlFor="aircraft">
          Aircraft
        </label>
        <select
          id="aircraft"
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
            aria-label="Load a saved build"
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
        <button
          className="btn"
          title="Copy a link to this exact build"
          onClick={async () => {
            const url = shareUrl(build)
            try {
              await navigator.clipboard.writeText(url)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1600)
            } catch {
              // Clipboard access needs permission and a secure context, and is
              // refused often enough that failing silently would look broken.
              window.prompt('Copy this link', url)
            }
          }}
        >
          {copied ? 'Link copied' : 'Copy link'}
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

      <main className="stage" id="build">
        <div className="col col-build">
          <h2 className="sr-only">Build</h2>
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
          <h2 className="sr-only">The aircraft</h2>
          {!canRender ? (
            <div className="viewer viewer-fallback">
              <div className="fallback-card">
                <strong>This browser cannot draw 3D.</strong>
                <p>
                  DroneDome needs WebGL to show the aircraft. It is usually turned off in one
                  of two places: hardware acceleration in your browser settings, or a policy
                  set by whoever manages this machine.
                </p>
                <p>
                  Every number below is still correct — the simulation is arithmetic and needs
                  no graphics card.
                </p>
              </div>
            </div>
          ) : (
          <div className="viewer" ref={mountRef} aria-busy={busy}>
            {/* The render is the product, and to a screen reader it was an
                unlabelled canvas. */}
            <div className="sr-only" role="img" aria-label={description} />
            <div className="sr-only" role="status" aria-live="polite">
              {busy ? `Loading ${status.aircraft}` : description}
            </div>
            {busy && (
              <div className="viewer-busy">
                <span>Loading {status.aircraft}</span>
                {status.total > 0 ? (
                  <progress value={status.loaded} max={status.total} />
                ) : (
                  <progress />
                )}
              </div>
            )}
            {status.phase === 'failed' && (
              <div className="viewer-busy viewer-failed" role="alert">
                <span>{status.aircraft} could not be downloaded.</span>
                <button className="btn" onClick={() => viewerRef.current?.retry()}>
                  Try again
                </button>
              </div>
            )}
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
                  // Via a Blob rather than the data: URL directly, and from an
                  // anchor that is actually in the document. A synthetic click on
                  // a disconnected node is honoured inconsistently across
                  // engines, and a data: URL puts the whole image in an
                  // attribute — fine at 139 KB, less so as the viewport grows.
                  const bytes = Uint8Array.from(atob(png.split(',')[1]), (c) => c.charCodeAt(0))
                  const url = URL.createObjectURL(new Blob([bytes], { type: 'image/png' }))
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `${build.name.replace(/[^\w-]+/g, '-').toLowerCase()}.png`
                  document.body.appendChild(a)
                  a.click()
                  a.remove()
                  URL.revokeObjectURL(url)
                }}
              >
                Snapshot
              </button>
            </div>
            <div className="viewer-hint">drag to orbit · scroll to zoom</div>
          </div>
          )}

          <section className="panel">
            <div className="scale-bar">
              <label className="panel-title" htmlFor="scale">
                Scale
              </label>
              <input
                id="scale"
                type="range"
                min={0.25}
                max={4}
                step={0.05}
                value={build.scale}
                // Read aloud, a bare 0.25-to-4 range carries no unit.
                aria-valuetext={`${build.scale.toFixed(2)} times normal size`}
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
          <h2 className="sr-only">Figures</h2>
          <Stats analysis={analysis} system={units} pending={busy} />
        </div>
      </main>

      {creditsOpen && <Credits onClose={() => setCreditsOpen(false)} />}
    </div>
  )
}
