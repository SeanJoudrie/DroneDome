import type { UnitKind } from '../types'

export type UnitSystem = 'metric' | 'imperial'

const sig = (v: number, digits = 3) => {
  if (!Number.isFinite(v)) return '—'
  if (v === 0) return '0'
  const abs = Math.abs(v)
  if (abs >= 1000) return Math.round(v).toLocaleString()
  if (abs >= 100) return v.toFixed(0)
  if (abs >= 10) return v.toFixed(1)
  if (abs >= 1) return v.toFixed(2)
  return v.toPrecision(digits)
}

/** Mass reads better in grams for a whoop and tonnes for a Global Hawk. */
function mass(kg: number, system: UnitSystem) {
  if (system === 'imperial') {
    const lb = kg * 2.20462
    if (lb < 1) return { value: sig(lb * 16), unit: 'oz' }
    return { value: sig(lb), unit: 'lb' }
  }
  if (kg < 1) return { value: sig(kg * 1000), unit: 'g' }
  if (kg >= 1000) return { value: sig(kg / 1000), unit: 't' }
  return { value: sig(kg), unit: 'kg' }
}

export function format(value: number, unit: UnitKind, system: UnitSystem) {
  const imp = system === 'imperial'
  switch (unit) {
    case 'kg':
      return mass(value, system)
    case 'm':
      return imp
        ? value < 0.3
          ? { value: sig(value * 39.3701), unit: 'in' }
          : { value: sig(value * 3.28084), unit: 'ft' }
        : value < 1
          ? { value: sig(value * 100), unit: 'cm' }
          : { value: sig(value), unit: 'm' }
    case 'm2':
      return imp
        ? { value: sig(value * 10.7639), unit: 'ft²' }
        : { value: sig(value), unit: 'm²' }
    case 'speed':
      return imp
        ? { value: sig(value * 2.23694), unit: 'mph' }
        : { value: sig(value * 3.6), unit: 'km/h' }
    case 'time_h':
      if (value < 1 / 60) return { value: sig(value * 3600), unit: 's' }
      if (value < 1) return { value: sig(value * 60), unit: 'min' }
      return { value: sig(value), unit: 'h' }
    case 'distance_km':
      return imp
        ? { value: sig(value * 0.621371), unit: 'mi' }
        : { value: sig(value), unit: 'km' }
    case 'power_w':
      return value >= 1000
        ? { value: sig(value / 1000), unit: 'kW' }
        : { value: sig(value), unit: 'W' }
    case 'energy_wh':
      return value >= 1000
        ? { value: sig(value / 1000), unit: 'kWh' }
        : { value: sig(value), unit: 'Wh' }
    case 'force_n':
      return imp
        ? { value: sig(value * 0.224809), unit: 'lbf' }
        : value >= 1000
          ? { value: sig(value / 1000), unit: 'kN' }
          : { value: sig(value), unit: 'N' }
    case 'loading':
      return imp
        ? { value: sig(value * 0.0208854), unit: 'lb/ft²' }
        : { value: sig(value), unit: 'N/m²' }
    case 'rate_kg_h':
      return imp
        ? { value: sig(value * 2.20462), unit: 'lb/h' }
        : { value: sig(value), unit: 'kg/h' }
    case 'ratio':
      return { value: sig(value), unit: ':1' }
    case 'percent':
      return { value: sig(value), unit: '%' }
    default:
      return { value: sig(value), unit: '' }
  }
}
