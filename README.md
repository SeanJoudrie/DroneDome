# DroneDome

Build a drone out of real aircraft, then find out whether it flies.

Pick something real — an MQ-9 Reaper, a Global Hawk, a Mars helicopter — pull its
wings off, bolt quadcopter rotors onto it, scale it to four times its size, fly
it on Mars, and watch a full spec sheet tell you exactly how badly that went.

Nothing is forbidden. If a build cannot fly, DroneDome says so and explains why,
rather than stopping you making it.

## Running it

```bash
npm install
npm run dev
```

The model library is committed, so this is all you need. Regenerating the models
from source is a separate step and needs Python (see **Asset pipeline** below).

| script | what it does |
| --- | --- |
| `npm run dev` | development server |
| `npm run build` | typecheck and build for production |
| `npm run check:physics` | compare every preset against published figures |
| `npm run assets` | re-download and reprocess the whole model library |
| `npm run assets:repack` | reprocess already-downloaded models |

## How it works

### One universal airframe

There is no "quadcopter mode" and "aeroplane mode". Every aircraft is a body
plus some combination of wings, tail, rotors, gear, hardpoints and payload. Each
of those is a slot you can empty or fill from any *other* aircraft in the
catalog. That is the whole trick: a Reaper wearing X500 rotors is just the rotor
slot pointed at a different donor.

Borrowed parts are resized to suit the airframe they land on, and the physics
uses that same scale factor — so what you see and what the numbers say agree.

### Finding the parts

Downloaded models almost never say which mesh is a wing. A Sketchfab export
arrives as thirty nodes all named `defaultMaterial`. So `scripts/classify.py`
works it out geometrically:

- the model's bounding box gives its axes — widest is span, then length, then vertical
- parts that mirror across the centreline are paired up, and symmetric pairs are
  the strong signal: tails, landing gear and wing pylons all come in twos, and
  their position tells them apart
- meaningful names win when they exist (Gazebo models name their links properly)

On the MQ-9 this finds the wing as a single mesh, the V-tail, all six hardpoints,
the sensor turret and the landing gear, with no manual work at all. Anything it
gets wrong is corrected in `scripts/overrides/<id>.json`.

Some models are welded — NASA's Global Hawk has its wings fused into the same
primitive as its fuselage. Those get a **cut** instead: two opposed clipping
planes keep only the centre band, which removes both wings at once and leaves a
face to mount a replacement on.

### The numbers

Real formulas, real constants, deliberately simplified:

- **Rotors** — momentum theory, inverted to get static thrust from shaft power,
  with a figure of merit that falls off in thin air (which is why Ingenuity's
  rotors are so much worse than their Earth equivalents)
- **Wings** — parabolic drag polar, lift-to-drag from aspect ratio and
  zero-lift drag, stall from CL max, top speed solved by bisection
- **Fuel** — Breguet range and endurance, so the aircraft gets lighter as it
  burns; turbofans burn by thrust-hour and shaft engines by kWh
- **Scaling** — mass with the cube, lifting area with the square, which is why
  a 2× Reaper is a dog and a 0.5× one is sprightly

`npm run check:physics` compares every preset with its manufacturer's published
figures. Everything currently lands within 2× except Ingenuity, whose real
90-second flights are limited by battery heating rather than aerodynamics.

It is a toy. Do not build anything from it.

## Asset pipeline

```
scripts/fetch.py          download from Sketchfab, NASA and Gazebo Fuel
scripts/normalize.mjs     decode Draco so the classifier can read geometry
scripts/classify.py       work out which mesh is which part
scripts/optimize.mjs      decimate, WebP textures, re-encode: 31 MB -> 3.1 MB
scripts/build-catalog.mjs emit the generated catalog and ATTRIBUTIONS.md
```

Sketchfab downloads need an API token in `SKETCHFAB_API_TOKEN` (or a
`.sketchfab-token` file — both are gitignored). Everything else downloads
without credentials.

## Credits

Every aircraft is a 3D model made by someone else, used under the licence shown
in [ATTRIBUTIONS.md](ATTRIBUTIONS.md) and in the app's Credits panel. Sources are
[NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) (public domain),
[Gazebo Fuel](https://app.gazebosim.org), [PX4](https://github.com/PX4/PX4-gazebo-models)
and [Sketchfab](https://sketchfab.com) (CC Attribution).

If you are one of the authors credited and want something corrected or removed,
please open an issue.
