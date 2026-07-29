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
`npm run check:parts` enforces this across the whole catalog and fails the
build if a role has neither a mesh nor a cut.

A third mechanism exists for what is *not* the aircraft: `_exclude` in the same
override file drops nodes by name glob, for uploads that ship with a display
stand or, in the Matrice's case, its flight case.

## 5. How the catalog is checked

Six gates, because each catches something the others cannot:

- `npm run check:physics` — every preset against its published figures.
- `npm run fuzz` — adversarial builds; every rendered number must be finite.
- `npm run check:parts` — static. The span axis must measure what the manifest
  says, the tail must sit behind the wing, every role must have a mesh or a
  cut, every equipment item must still resolve to real geometry, and every part
  name in the catalog must resolve back to its own role through the same
  resolver the app uses.
- `npm run check:geometry` — drives the real app across every airframe and
  operation, then asks the renderer where each mesh ended up. Catches parts
  drifting away from the aircraft, which no static check can see.
- `npm run check:capability` — asks the prior question: does the change happen
  at all. A control that silently does nothing raises no error and looks right
  in a screenshot, which is how "how many" sat dead on stock wings for weeks.
- `npm run check:removal` — taking one part off must not take the aircraft with
  it. Its own failure mode: removing the Global Hawk's wing emptied the screen,
  and nothing else noticed, because an aircraft that is simply gone has no
  parts left to drift and the change did technically happen.

The last three need a built app being served; they drive it with Playwright.

Name resolution lives in one place, `src/lib/names.ts`. A part name has to
survive the classifier writing it, the optimiser rewriting the file and three.js
loading it, and it has broken at every one of those — each time appearing as a
control that silently did nothing on one airframe. The renderer and the checks
must ask the same resolver, or a gate passes on a rule the app does not follow.

## 6. Working agreement

- Push to `main` on every change, without asking. GitHub Pages deploys from it.
- Scope changes get asked about, not announced mid-status-update. A roster
  addition is a scope change.
- `npm run check:physics` and `npm run fuzz` gate every commit, along with
  typecheck and build.
