import { useMemo, useState } from 'react'
import type {
  Analysis,
  Build,
  PartRole,
  SlotChoice,
  SlotPlacement,
  StatRow,
} from '../types'
import { AIRCRAFT, AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import {
  ENERGY_SOURCES,
  ENVIRONMENTS,
  PAINTS,
  PAYLOADS,
  POWERPLANTS,
} from '../data/catalog'
import { crossRolePartsFor, donorsFor, hasStockRole, slotLabel } from '../lib/build'
import { analyse } from '../lib/physics'
import { format, type UnitSystem } from '../lib/units'

export type PickerTarget =
  | { kind: 'role'; role: PartRole }
  | { kind: 'powerplant' }
  | { kind: 'energy' }
  | { kind: 'payload' }
  | { kind: 'paint' }
  | { kind: 'environment' }

/** Numeric fields a fitted slot can carry, for the sliders below. */
type SlotNumber = Exclude<keyof SlotPlacement, 'layout'> | 'scale' | 'count'

/**
 * Read one number off a slot choice. A removed slot carries no placement at
 * all, so it answers with the default rather than forcing every caller to
 * re-narrow the union.
 */
function slotNum(choice: SlotChoice | undefined, key: SlotNumber, fallback = 0): number {
  if (!choice || choice.kind === 'none') return fallback
  const v = choice[key]
  return typeof v === 'number' ? v : fallback
}

/** How multiples are arranged, defaulting to a ring. */
function slotLayout(choice: SlotChoice | undefined): NonNullable<SlotPlacement['layout']> {
  if (!choice || choice.kind === 'none') return 'ring'
  return choice.layout ?? 'ring'
}

/** Headline numbers used for the before/after comparison in the picker. */
function headline(build: Build) {
  const a = analyse(build)
  // An aircraft that cannot leave the ground has no meaningful endurance or
  // speed - the maths still produces a number, and it is a nonsense one. NaN
  // makes Delta skip the row rather than advertise "+5,597h" for a brick.
  const flies = a.verdict.level !== 'grounded'
  const find = (title: string, label: string) =>
    a.groups.find((g) => g.title === title)?.rows.find((r) => r.label === label)?.value ?? NaN
  return {
    mass: a.massKg,
    payload: find('Overall', 'Spare payload'),
    speed: flies ? find('Overall', 'Top speed') : NaN,
    endurance: flies
      ? find('Fuel & endurance', 'Endurance') ||
        find('Energy & endurance', 'Endurance') ||
        find('Energy & endurance', 'Hover time')
      : NaN,
  }
}

function Delta({
  label,
  before,
  after,
  unit,
  system,
  higherIsBetter = true,
}: {
  label: string
  before: number
  after: number
  unit: StatRow['unit']
  system: UnitSystem
  higherIsBetter?: boolean
}) {
  if (!Number.isFinite(before) || !Number.isFinite(after)) return null
  const diff = after - before
  const rel = before !== 0 ? Math.abs(diff / before) : Math.abs(diff)
  if (rel < 0.005) return <span className="delta flat">{label} ·</span>
  const good = higherIsBetter ? diff > 0 : diff < 0
  const f = format(Math.abs(diff), unit, system)
  return (
    <span className={`delta ${good ? 'up' : 'down'}`}>
      {label} {diff > 0 ? '+' : '−'}
      {f.value}
      {f.unit}
    </span>
  )
}

function OptionRow({
  name,
  note,
  selected,
  onPick,
  base,
  next,
  system,
}: {
  name: string
  note?: string
  selected: boolean
  onPick: () => void
  base?: ReturnType<typeof headline>
  next?: ReturnType<typeof headline>
  system: UnitSystem
}) {
  return (
    <button className={`option ${selected ? 'on' : ''}`} onClick={onPick}>
      <div className="option-top">
        <span className="option-name">{name}</span>
        {selected && <span className="chimera-badge">fitted</span>}
      </div>
      {note && <div className="option-note">{note}</div>}
      {base && next && (
        <div className="deltas">
          <Delta label="mass" before={base.mass} after={next.mass} unit="kg" system={system} higherIsBetter={false} />
          <Delta label="payload" before={base.payload} after={next.payload} unit="kg" system={system} />
          <Delta label="endurance" before={base.endurance} after={next.endurance} unit="time_h" system={system} />
          <Delta label="speed" before={base.speed} after={next.speed} unit="speed" system={system} />
        </div>
      )}
    </button>
  )
}

export function SlotList({
  build,
  roles,
  target,
  system,
  onSelect,
  onChange,
}: {
  build: Build
  roles: PartRole[]
  target: PickerTarget | null
  system: UnitSystem
  onSelect: (t: PickerTarget | null) => void
  onChange: (b: Build) => void
}) {
  const isOn = (t: PickerTarget) =>
    target !== null &&
    target.kind === t.kind &&
    (t.kind !== 'role' || (target.kind === 'role' && target.role === t.role))

  const rows: { key: string; label: string; value: string; cls: string; t: PickerTarget }[] = []

  for (const role of roles) {
    const choice = build.slots[role]
    const value = slotLabel(build, role)
    rows.push({
      key: `role:${role}`,
      label: role,
      value,
      cls: choice?.kind === 'none' ? 'removed' : choice?.kind === 'donor' ? 'donor' : '',
      t: { kind: 'role', role },
    })
  }

  const plant = POWERPLANTS.find((p) => p.id === build.powerplantId)
  const energy = ENERGY_SOURCES.find((e) => e.id === build.energyId)
  const payloadNames = build.payloadIds
    .map((id) => PAYLOADS.find((p) => p.id === id)?.name ?? '')
    .filter((n) => n && n !== 'Nothing')

  rows.push({ key: 'cat:plant', label: 'Powerplant', value: plant?.name ?? 'None', cls: '', t: { kind: 'powerplant' } })
  rows.push({ key: 'cat:energy', label: 'Energy', value: energy?.name ?? 'None', cls: '', t: { kind: 'energy' } })
  rows.push({
    key: 'cat:payload',
    label: 'Equipment',
    value: payloadNames.length ? payloadNames.join(', ') : 'Nothing',
    cls: '',
    t: { kind: 'payload' },
  })
  rows.push({
    key: 'cat:paint',
    label: 'Paint',
    value: PAINTS.find((p) => p.id === build.paint)?.name ?? 'As delivered',
    cls: '',
    t: { kind: 'paint' },
  })
  rows.push({
    key: 'cat:env',
    label: 'Environment',
    value: ENVIRONMENTS.find((e) => e.id === build.environment)?.name ?? 'Earth',
    cls: '',
    t: { kind: 'environment' },
  })

  return (
    <section className="panel">
      <div className="panel-head">
        <span className="panel-title">Build</span>
      </div>
      {rows.map((r) => {
        const open = isOn(r.t)
        return (
          <div key={r.key} className="slot-group">
            <button
              className={`slot ${open ? 'active' : ''}`}
              aria-expanded={open}
              onClick={() => onSelect(open ? null : r.t)}
            >
              <span className="slot-role">{r.label}</span>
              <span className="slot-right">
                <span className={`slot-value ${r.cls}`}>{r.value}</span>
                <span className="slot-caret" aria-hidden="true">
                  {open ? '\u2212' : '+'}
                </span>
              </span>
            </button>
            {/* Options open directly under the row you tapped, so choosing a
                wing never means scrolling to the bottom of the page and back. */}
            {open && (
              <div className="slot-expand">
                <Picker
                  build={build}
                  target={r.t}
                  system={system}
                  onChange={onChange}
                  onClose={() => onSelect(null)}
                />
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}

export function Picker({
  build,
  target,
  system,
  onChange,
  onClose,
}: {
  build: Build
  target: PickerTarget
  system: UnitSystem
  onChange: (b: Build) => void
  onClose: () => void
}) {
  const current = headline(build)
  const preview = (patch: Partial<Build>) => headline({ ...build, ...patch })
  // Hooks cannot live inside the branch below, so the drawer state is declared
  // here even though only the role picker uses it.
  const [drawer, setDrawer] = useState(false)
  const crossParts = useMemo(
    () => (target.kind === 'role' ? crossRolePartsFor(target.role) : []),
    [target],
  )
  const [find, setFind] = useState('')
  const [adjust, setAdjust] = useState(false)
  // Sixty-odd parts per slot is a list you scroll past, not one you choose
  // from. Matching on the aircraft and the part's own name covers both ways
  // people look for something: "reaper" and "rotor".
  const shownCrossParts = useMemo(() => {
    const q = find.trim().toLowerCase()
    if (!q) return crossParts
    return crossParts.filter(
      (p) =>
        p.aircraft.name.toLowerCase().includes(q) ||
        p.fromRole.includes(q) ||
        p.aircraft.family.includes(q),
    )
  }, [crossParts, find])

  let title = ''
  let body: React.ReactNode = null

  if (target.kind === 'role') {
    const role = target.role
    const donors = donorsFor(role)
    const base = AIRCRAFT_BY_ID[build.baseId]
    const hasOwn = hasStockRole(base, role)
    const choice = build.slots[role]
    title = `${role}`
    const size = choice && choice.kind !== 'none' ? (choice.scale ?? 1) : 1
    // How many rotors this build has before you touch anything — the same
    // fallback the stats use. Hard-coding four highlighted "4" on a hexacopter
    // and on a single-rotor helicopter, so the control disagreed with the panel
    // next to it about what was already fitted.
    const naturalRotors =
      (choice?.kind === 'donor' ? AIRCRAFT_BY_ID[choice.aircraftId]?.spec.rotors : undefined) ??
      base?.spec.rotors ??
      4
    const rotorCounts = [...new Set([1, 2, 3, 4, 6, 8, naturalRotors])].sort((a, b) => a - b)
    const setSlot = (patch: Record<string, unknown>) => {
      const current: SlotChoice = choice ?? { kind: 'stock' }
      if (current.kind === 'none') return
      onChange({ ...build, slots: { ...build.slots, [role]: { ...current, ...patch } } })
    }
    body = (
      <>
        {hasOwn && (
          <OptionRow
            name={`Standard ${role}`}
            note={`As fitted to the ${base?.name}.`}
            selected={!choice || choice.kind === 'stock'}
            onPick={() => onChange({ ...build, slots: { ...build.slots, [role]: { kind: 'stock' } } })}
            base={current}
            next={preview({ slots: { ...build.slots, [role]: { kind: 'stock' } } })}
            system={system}
          />
        )}
        <OptionRow
          name={`No ${role}`}
          note="Take it off entirely and see what happens."
          selected={choice?.kind === 'none'}
          onPick={() => onChange({ ...build, slots: { ...build.slots, [role]: { kind: 'none' } } })}
          base={current}
          next={preview({ slots: { ...build.slots, [role]: { kind: 'none' } } })}
          system={system}
        />
        {donors.filter((d) => d.id !== build.baseId).length > 0 && (
          <div className="parts-head">
            {donors.filter((d) => d.id !== build.baseId).length} {role}s from other drones
          </div>
        )}
        {donors
          .filter((d) => d.id !== build.baseId)
          .map((d) => {
            const patch = {
              slots: { ...build.slots, [role]: { kind: 'donor' as const, aircraftId: d.id } },
            }
            return (
              <OptionRow
                key={d.id}
                name={`${d.name} ${role}`}
                note={d.blurb}
                selected={
                  choice?.kind === 'donor' && choice.aircraftId === d.id && !choice.fromRole
                }
                onPick={() => onChange({ ...build, ...patch })}
                base={current}
                next={preview(patch)}
                system={system}
              />
            )
          })}

        {/* The Lego drawer. Any part in the catalog can do any job — the slot
            decides what it does, the mesh decides what it looks like. */}
        <button className="drawer-toggle" onClick={() => setDrawer((v) => !v)}>
          {drawer ? '−' : '+'} Use something else as a {role} ({crossParts.length})
        </button>
        {drawer && (
          <input
            className="drawer-find"
            type="search"
            placeholder={`Find a part — try "reaper", "rotor", "solar"`}
            value={find}
            onChange={(e) => setFind(e.target.value)}
          />
        )}
        {drawer &&
          shownCrossParts.map(({ aircraft: d, fromRole }) => {
            const patch = {
              slots: {
                ...build.slots,
                [role]: { kind: 'donor' as const, aircraftId: d.id, fromRole },
              },
            }
            return (
              <OptionRow
                key={`${d.id}:${fromRole}`}
                name={`${d.name} ${fromRole}`}
                note={`Fitted as a ${role}. ${d.blurb}`}
                selected={
                  choice?.kind === 'donor' &&
                  choice.aircraftId === d.id &&
                  choice.fromRole === fromRole
                }
                onPick={() => onChange({ ...build, ...patch })}
                base={current}
                next={preview(patch)}
                system={system}
              />
            )
          })}

        {/* Fit comes after the choice, not before it. Opening a wing slot has
            to answer "which wing?" first — burying twelve other aircraft's
            wings under seven sliders made the whole point of the app look
            like a size control. */}
        {choice?.kind !== 'none' && (hasOwn || choice?.kind === 'donor') && (
          <>
            <button className="drawer-toggle" onClick={() => setAdjust((v) => !v)}>
              {adjust ? '\u2212' : '+'} Adjust how it is fitted
            </button>
            {adjust && (
              <>
        {(hasOwn || choice?.kind === 'donor') && (
          <div className="sub-bar">
            <span className="panel-title">Size</span>
            <input
              type="range"
              min={0.25}
              max={3}
              step={0.05}
              value={size}
              onChange={(e) => setSlot({ scale: Number(e.target.value) })}
            />
            <span className="scale-value">{size.toFixed(2)}×</span>
            {Math.abs(size - 1) > 0.001 && (
              <button className="btn ghost" onClick={() => setSlot({ scale: 1 })}>
                Reset
              </button>
            )}
          </div>
        )}

        {(hasOwn || choice?.kind === 'donor') && (
          <>
            <div className="sub-bar">
              <span className="panel-title">Fore / aft</span>
              <input
                type="range"
                min={-1}
                max={1}
                step={0.05}
                value={slotNum(choice, 'fore')}
                onChange={(e) => setSlot({ fore: Number(e.target.value) })}
              />
              <span className="scale-value">
                {(slotNum(choice, 'fore') * 100).toFixed(0)}
              </span>
            </div>
            <div className="sub-bar">
              <span className="panel-title">Up / down</span>
              <input
                type="range"
                min={-1}
                max={1}
                step={0.05}
                value={slotNum(choice, 'rise')}
                onChange={(e) => setSlot({ rise: Number(e.target.value) })}
              />
              <span className="scale-value">
                {(slotNum(choice, 'rise') * 100).toFixed(0)}
              </span>
            </div>
          </>
        )}

        {(hasOwn || choice?.kind === 'donor') && (
          <>
            {(role === 'wing' || role === 'tail') && (
              <div className="sub-bar">
                <span className="panel-title">How many</span>
                <div className="seg">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      className={slotNum(choice, 'count', 1) === n ? 'on' : ''}
                      onClick={() => setSlot({ count: n })}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <span className="scale-value">
                  {['', 'mono', 'bi', 'tri', 'quad'][slotNum(choice, 'count', 1)]}
                </span>
              </div>
            )}
            {([
              ['Dihedral', 'rollDeg', -45, 45],
              ['Incidence', 'pitchDeg', -30, 30],
              ['Sweep', 'yawDeg', -45, 45],
            ] as const).map(([label, key, lo, hi]) => (
              <div className="sub-bar" key={key}>
                <span className="panel-title">{label}</span>
                <input
                  type="range"
                  min={lo}
                  max={hi}
                  step={1}
                  value={slotNum(choice, key)}
                  onChange={(e) => setSlot({ [key]: Number(e.target.value) })}
                />
                <span className="scale-value">{slotNum(choice, key).toFixed(0)}°</span>
              </div>
            ))}
          </>
        )}

        {role === 'rotor' && (
          <div className="sub-bar">
            <span className="panel-title">Tilt</span>
            <input
              type="range"
              min={0}
              max={90}
              step={5}
              value={slotNum(choice, 'tiltDeg')}
              onChange={(e) => setSlot({ tiltDeg: Number(e.target.value) })}
            />
            <span className="scale-value">{slotNum(choice, 'tiltDeg').toFixed(0)}°</span>
          </div>
        )}

        {role === 'rotor' && (hasOwn || choice?.kind === 'donor') && (
          <>
            <div className="sub-bar">
              <span className="panel-title">Spread</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={slotNum(choice, 'spread', 0.5)}
                onChange={(e) => setSlot({ spread: Number(e.target.value) })}
              />
              <span className="scale-value">
                {(slotNum(choice, 'spread', 0.5) * 100).toFixed(0)}
              </span>
            </div>
            <div className="sub-bar">
              <span className="panel-title">Layout</span>
              <div className="seg">
                {(['ring', 'plus', 'tandem', 'stacked'] as const).map((l) => (
                  <button
                    key={l}
                    className={slotLayout(choice) === l ? 'on' : ''}
                    onClick={() => setSlot({ layout: l })}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {role === 'rotor' && (hasOwn || choice?.kind === 'donor') && (
          <div className="sub-bar">
            <span className="panel-title">How many</span>
            <div className="seg">
              {rotorCounts.map((n) => (
                <button
                  key={n}
                  className={slotNum(choice, 'count', naturalRotors) === n ? 'on' : ''}
                  onClick={() => setSlot({ count: n })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
              </>
            )}
          </>
        )}
      </>
    )
  } else if (target.kind === 'powerplant') {
    title = 'powerplant'
    body = (
      <>
        {POWERPLANTS.map((p) => (
          <OptionRow
            key={p.id}
            name={p.name}
            note={p.note}
            selected={build.powerplantId === p.id}
            onPick={() => onChange({ ...build, powerplantId: p.id })}
            base={current}
            next={preview({ powerplantId: p.id })}
            system={system}
          />
        ))}
      </>
    )
  } else if (target.kind === 'energy') {
    title = 'energy'
    body = (
      <>
        {ENERGY_SOURCES.map((e) => (
          <OptionRow
            key={e.id}
            name={e.name}
            note={e.note}
            selected={build.energyId === e.id}
            onPick={() => onChange({ ...build, energyId: e.id })}
            base={current}
            next={preview({ energyId: e.id })}
            system={system}
          />
        ))}
      </>
    )
  } else if (target.kind === 'payload') {
    title = 'payload'
    body = (
      <>
        {PAYLOADS.map((p) => {
          const on = build.payloadIds.includes(p.id)
          const next =
            p.id === 'none'
              ? ['none']
              : on
                ? build.payloadIds.filter((x) => x !== p.id)
                : [...build.payloadIds.filter((x) => x !== 'none'), p.id]
          return (
            <OptionRow
              key={p.id}
              name={p.name}
              note={p.note}
              selected={on}
              onPick={() => onChange({ ...build, payloadIds: next.length ? next : ['none'] })}
              base={current}
              next={preview({ payloadIds: next.length ? next : ['none'] })}
              system={system}
            />
          )
        })}
      </>
    )
  } else if (target.kind === 'paint') {
    title = 'paint'
    body = (
      <>
        {PAINTS.map((p) => (
          <OptionRow
            key={p.id}
            name={p.name}
            selected={build.paint === p.id}
            onPick={() => onChange({ ...build, paint: p.id })}
            system={system}
          />
        ))}
      </>
    )
  } else {
    title = 'environment'
    body = (
      <>
        {ENVIRONMENTS.map((e) => (
          <OptionRow
            key={e.id}
            name={e.name}
            note={e.note}
            selected={build.environment === e.id}
            onPick={() => onChange({ ...build, environment: e.id })}
            base={current}
            next={preview({ environment: e.id })}
            system={system}
          />
        ))}
      </>
    )
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <span className="panel-title">Choose {title}</span>
        <button className="btn ghost" onClick={onClose}>
          Done
        </button>
      </div>
      {body}
    </section>
  )
}

/**
 * One telemetry row. With a gauge range it becomes a bar, coloured against the
 * value's own meaning: a thrust-to-weight below its 1.0 floor reads red, and
 * hover throttle inverts because a high number there is bad news.
 */
function StatLine({ row, system }: { row: StatRow; system: UnitSystem }) {
  const f = format(row.value, row.unit, system)
  const g = row.gauge
  const pct = g ? Math.max(0, Math.min(1, row.value / g.max)) * 100 : 0

  let tone = ''
  if (g) {
    if (g.floor !== undefined) {
      tone = row.value < g.floor ? 'bad' : row.value < g.floor * 1.35 ? 'warn' : 'good'
    } else if (g.invert) {
      tone = pct > 85 ? 'bad' : pct > 65 ? 'warn' : 'good'
    } else {
      tone = pct < 12 ? 'warn' : 'good'
    }
  }

  return (
    <div className={`stat-row${g ? ' has-gauge' : ''}`} title={row.hint}>
      <div className={g ? 'stat-line' : undefined} style={g ? undefined : { display: 'contents' }}>
        <span className="stat-label">{row.label}</span>
        <span className="stat-value">
          {f.value}
          <span className="stat-unit">{f.unit}</span>
        </span>
      </div>
      {g && (
        <div
          className="gauge"
          role="meter"
          aria-valuenow={Math.round(row.value * 100) / 100}
          aria-valuemin={0}
          aria-valuemax={g.max}
          aria-label={row.label}
        >
          <div className={`gauge-fill ${tone}`} style={{ width: `${pct}%` }} />
          {g.floor !== undefined && g.floor < g.max && (
            <div className="gauge-floor" style={{ left: `${(g.floor / g.max) * 100}%` }} />
          )}
        </div>
      )}
    </div>
  )
}

export function Stats({ analysis, system }: { analysis: Analysis; system: UnitSystem }) {
  return (
    <>
      <div className={`verdict ${analysis.verdict.level}`}>
        <div className="verdict-head">{analysis.verdict.headline}</div>
        <div className="verdict-reason">{analysis.verdict.reason}</div>
      </div>

      {analysis.groups.map((group) => (
        <section className="panel" key={group.title}>
          <div className="panel-head">
            <span className="panel-title">{group.title}</span>
          </div>
          {group.rows.map((r) => (
            <StatLine key={r.label} row={r} system={system} />
          ))}
        </section>
      ))}

      <section className="panel">
        <div className="panel-head">
          <span className="panel-title">Mass breakdown</span>
        </div>
        {analysis.masses
          .filter((m) => m.kg > 0)
          .sort((a, b) => b.kg - a.kg)
          .map((m, i) => {
            const f = format(m.kg, 'kg', system)
            return (
              <div className="mass-row" key={`${m.label}-${i}`}>
                <span>{m.label}</span>
                <span className="m">
                  {f.value} {f.unit}
                </span>
              </div>
            )
          })}
      </section>

      {/* The physics has always worked out where the weight sits and whether the
          aircraft is stable about it. None of it was ever on screen, which for a
          builder whose whole point is moving parts around is the one number you
          most want after you move one. */}
      <section className="panel">
        <div className="panel-head">
          <span className="panel-title">Balance</span>
        </div>
        <StatLine
          row={{ label: 'Centre of gravity', value: analysis.balance.cgM, unit: 'm',
                 hint: 'Where the whole aircraft balances, measured aft of its own origin.' }}
          system={system}
        />
        {analysis.balance.macM !== null && (
          <StatLine
            row={{ label: 'Mean chord', value: analysis.balance.macM, unit: 'm',
                   hint: 'Average wing chord, which is the yardstick stability is measured in.' }}
            system={system}
          />
        )}
        {analysis.balance.staticMarginPct !== null && (
          <StatLine
            row={{
              label: 'Static margin',
              value: analysis.balance.staticMarginPct,
              unit: 'percent',
              hint:
                analysis.balance.staticMarginPct < 0
                  ? 'Negative: the lift acts ahead of the weight, so it diverges instead of settling. Move the wing aft or the mass forward.'
                  : analysis.balance.staticMarginPct > 40
                    ? 'Very stable, and correspondingly reluctant to manoeuvre.'
                    : 'Positive is stable: nose-down when it speeds up, nose-up when it slows.',
            }}
            system={system}
          />
        )}
        {analysis.balance.rotorOffsetRatio !== null && (
          <StatLine
            row={{
              label: 'CG off rotor centre',
              value: analysis.balance.rotorOffsetRatio * 100,
              unit: 'percent',
              hint: 'How far the weight sits from the middle of the rotors, as a fraction of arm length. Past 100% no amount of throttle differential holds it level.',
              gauge: { max: 100, invert: true },
            }}
            system={system}
          />
        )}
      </section>

      {analysis.warnings.length > 0 && (
        <section className="panel">
          <div className="panel-head">
            <span className="panel-title">Notes</span>
          </div>
          <div className="warnings">
            {analysis.warnings.map((w, i) => (
              <div className={`warning ${w.severity === 'info' ? 'info' : ''}`} key={i}>
                {w.text}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export function Credits({ onClose }: { onClose: () => void }) {
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="panel-head">
          <span className="panel-title">Credits</span>
          <button className="btn ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          <p>
            Every aircraft in DroneDome is a real 3D model made by someone else. Downloadable
            models are provided by <a href="https://sketchfab.com">Sketchfab</a>,{' '}
            <a href="https://app.gazebosim.org">Gazebo Fuel</a> and{' '}
            <a href="https://github.com/nasa/NASA-3D-Resources">NASA</a>, and each is used under
            the licence shown below.
          </p>
          <table>
            <thead>
              <tr>
                <th>Aircraft</th>
                <th>Author</th>
                <th>Licence</th>
              </tr>
            </thead>
            <tbody>
              {AIRCRAFT.map((a) => (
                <tr key={a.id}>
                  <td>
                    {a.credit.url ? (
                      <a href={a.credit.url} target="_blank" rel="noreferrer">
                        {a.name}
                      </a>
                    ) : (
                      a.name
                    )}
                  </td>
                  <td>{a.credit.author}</td>
                  <td>{a.credit.licenseName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: 'var(--ink-2)', fontSize: 13 }}>
            Performance figures come from published manufacturer data and are run through a
            deliberately simplified model — momentum theory for rotors, a parabolic drag polar for
            wings, Breguet for fuel burn. The numbers move the way real ones would, but this is a
            toy. Do not build anything from it.
          </p>
        </div>
      </div>
    </div>
  )
}
