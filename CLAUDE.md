# DroneDome — standing rules

Read this before doing anything. These are hard constraints from the owner, not
preferences to weigh against other goals.

## 1. Drones only

Uncrewed aircraft. Nothing with a pilot in it.

If an airframe would be useful purely as a physics reference or a source of
donor parts, that is not a reason to add it as a preset. Keep test fixtures in
the test harness.

*Current exceptions, both added before this rule was written and both known to
the owner: `cessna-172` and `v22-osprey`. Do not add more. Do not remove these
without being asked.*

## 2. Never model anything

Every mesh in this app is a file somebody else made and published under a
licence that allows reuse. No procedural geometry, no hand-built shapes, no
"I'll just approximate the fuselage."

Sources are Gazebo Fuel, NASA-3D-Resources, PX4-gazebo-models and Sketchfab.
The Sketchfab API token lives in `.sketchfab-token` (gitignored) or
`SKETCHFAB_API_TOKEN` — use it, never commit it.

What *is* fair to hand-author is metadata pointing at someone else's mesh:
which node is a wing, where to slice a welded hull. That is a description, not
a model.

## 3. The point is swapping, not resizing

This is Lego. Pop the wings off an MQ-9 and bolt them onto a quadcopter. Take a
Reaper's tail, a Global Hawk's wing, an X500's rotors, and see what the stats
say about the result. Change the payload, change the weight, watch the numbers
move.

Resizing, placement and angles are the *garnish*. Swapping is the meal. When
deciding what to build next, ask "does this let someone build a drone they
couldn't build yesterday?" — not "does this add another slider?"

The sandbox never refuses. An unflyable abomination is a valid build; the stats
say zero across the board and that is the fun.

## 4. Anything added must come apart

Hardline. A new airframe is not done when it renders. It is done when every
role on it can be removed, hidden, or replaced by a donor part.

Two mechanisms, in order of preference:

1. **Node toggle** — the classifier found a separate mesh for that role, so it
   can simply be hidden.
2. **Cut** — the role is welded into a shared mesh, so it is defined as a box
   in `scripts/overrides/<id>.json` (`keepBand` plus optional `lengthBand` and
   `verticalBand`) and clipped away at runtime. The same box, inverted, is what
   lets that region be moved and angled like a real part.

An airframe that can only be looked at does not belong in the catalog.

## 5. Working agreement

- Push to `main` on every change, without asking. GitHub Pages deploys from it.
- Scope changes get asked about, not announced mid-status-update. A roster
  addition is a scope change.
- `npm run check:physics` and `npm run fuzz` gate every commit, along with
  typecheck and build.
