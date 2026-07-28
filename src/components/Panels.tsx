import type { Analysis, Build, PartRole, SlotChoice, StatRow } from '../types'
import { AIRCRAFT, AIRCRAFT_BY_ID } from '../data/aircraft.generated'
import {
  ENERGY_SOURCES,
  ENVIRONMENTS,
  PAINTS,
  PAYLOADS,
  POWERPLANTS,
} from '../data/catalog'
import { donorsFor, slotLabel } from '../lib/build'
import { analyse } from '../lib/physics'
import { format, type UnitSystem } from '../lib/units'

export type PickerTarget =
  | { kind: 'role'; role: PartRole }
  | { kind: 'powerplant' }
  | { kind: 'energy' }
  | { kind: 'payload' }
  | { kind: 'paint' }
  | { kind: 'environment' }

/** Headline numbers used for the before/after comparison in the picker. */
function headline(build: Build) {
  const a = analyse(build)
  const find = (title: string, label: string) =>
    a.groups.find((g) => g.title === title)?.rows.find((r) => r.label === label)?.value ?? NaN
  return {
    mass: a.massKg,
    payload: find('Overall', 'Spare payload'),
    speed: find('Overall', 'Top speed'),
    endurance:
      find('Fuel & endurance', 'Endurance') ||
      find('Energy & endurance', 'Endurance') ||
      find('Energy & endurance', 'Hover time'),
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
  onSelect,
}: {
  build: Build
  roles: PartRole[]
  target: PickerTarget | null
  onSelect: (t: PickerTarget) => void
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
      key: role,
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

  rows.push({ key: 'plant', label: 'Powerplant', value: plant?.name ?? 'None', cls: '', t: { kind: 'powerplant' } })
  rows.push({ key: 'energy', label: 'Energy', value: energy?.name ?? 'None', cls: '', t: { kind: 'energy' } })
  rows.push({
    key: 'payload',
    label: 'Equipment',
    value: payloadNames.length ? payloadNames.join(', ') : 'Nothing',
    cls: '',
    t: { kind: 'payload' },
  })
  rows.push({
    key: 'paint',
    label: 'Paint',
    value: PAINTS.find((p) => p.id === build.paint)?.name ?? 'As delivered',
    cls: '',
    t: { kind: 'paint' },
  })
  rows.push({
    key: 'env',
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
      {rows.map((r) => (
        <button
          key={r.key}
          className={`slot ${isOn(r.t) ? 'active' : ''}`}
          onClick={() => onSelect(r.t)}
        >
          <span className="slot-role">{r.label}</span>
          <span className={`slot-value ${r.cls}`}>{r.value}</span>
        </button>
      ))}
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

  let title = ''
  let body: React.ReactNode = null

  if (target.kind === 'role') {
    const role = target.role
    const donors = donorsFor(role)
    const base = AIRCRAFT_BY_ID[build.baseId]
    const hasOwn = base?.parts.some((p) => p.role === role) || !!base?.cuts[role]
    const choice = build.slots[role]
    title = `${role}`
    const size = choice && choice.kind !== 'none' ? (choice.scale ?? 1) : 1
    const setSlot = (patch: Partial<Extract<SlotChoice, { kind: 'donor' }>>) => {
      const current: SlotChoice = choice ?? { kind: 'stock' }
      if (current.kind === 'none') return
      onChange({ ...build, slots: { ...build.slots, [role]: { ...current, ...patch } } })
    }
    body = (
      <>
        {choice?.kind !== 'none' && (hasOwn || choice?.kind === 'donor') && (
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

        {role === 'rotor' && choice?.kind === 'donor' && (
          <div className="sub-bar">
            <span className="panel-title">How many</span>
            <div className="seg">
              {[2, 3, 4, 6, 8].map((n) => (
                <button
                  key={n}
                  className={(choice.count ?? 4) === n ? 'on' : ''}
                  onClick={() => setSlot({ count: n })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

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
                selected={choice?.kind === 'donor' && choice.aircraftId === d.id}
                onPick={() => onChange({ ...build, ...patch })}
                base={current}
                next={preview(patch)}
                system={system}
              />
            )
          })}
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
          {group.rows.map((r) => {
            const f = format(r.value, r.unit, system)
            return (
              <div className="stat-row" key={r.label} title={r.hint}>
                <span className="stat-label">{r.label}</span>
                <span className="stat-value">
                  {f.value}
                  <span className="stat-unit">{f.unit}</span>
                </span>
              </div>
            )
          })}
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
