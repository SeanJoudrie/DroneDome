import type { PartRole } from '../types'

/**
 * Where a part's root sits on a host aircraft, in metres, in the assembly's own
 * frame. Hand-written, measured off the host's own geometry, corrected by eye.
 *
 * Three attempts were made to compute this from the meshes instead, and all
 * three failed in a different way, because every model in the catalog is shaped
 * differently: one has a wing running tip to tip straight through the fuselage,
 * so "the innermost vertex" is on the centreline; one hangs missiles two metres
 * outboard, so "the edge of the body" is a pylon; one has its span and length
 * axes transposed. Each fix was correct and the next model broke it.
 *
 * A table cannot fail that way. If a wing sits twenty centimetres high, you
 * subtract 0.20 from a number and look again. There is no algorithm to be
 * wrong about — only a number, and a picture of whether it is right.
 *
 * x is the half-width: the right side sits at +x, the left at -x.
 *
 * The MQ-9's wing, measured: its body is 0.420 m half-width, and the innermost
 * wing panel runs y 0.79 to 1.07 and z -1.02 to -0.66 where it leaves the body.
 * So the root is the centre of that: 0.93 up, 0.84 forward of the origin.
 */
export const SOCKETS: Record<string, Partial<Record<PartRole, [number, number, number]>>> = {
  'mq9-reaper': {
    wing: [0.42, 0.93, -0.84],
  },
}

export function socketFor(hostId: string, role: PartRole, side: 'left' | 'right') {
  const at = SOCKETS[hostId]?.[role]
  if (!at) return null
  return { x: (side === 'right' ? 1 : -1) * at[0], y: at[1], z: at[2] }
}
