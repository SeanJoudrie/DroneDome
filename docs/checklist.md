# DroneDome — working checklist

Every specific thing raised across both conversations, numbered so it can be
ticked off. Nothing here is done until it has been shown in a render.

Status key: `[ ]` open · `[~]` in progress · `[x]` done and shown · `[?]` needs a
decision from the owner · `[-]` deliberately parked

---

## A. Method — fix the ruler before trusting any fix

- [x] **A1.** Replace the attachment test. The current one measures whether the
      part and the aircraft overlap **in a 2-D projection**, so a wingtip
      crossing behind the fuselage on screen reads as "attached" while the root
      sits a metre away in 3-D. It also shoots the whole aircraft, where a 30 cm
      gap on a 20 m span is one pixel against a six-pixel tolerance. The
      replacement must measure the join in 3-D: distance from the part's root to
      the host's surface, in metres. **Done** — `joinGap(role)` walks the real
      vertices in world space, discards the ones their own clipping planes threw
      away, and returns the shortest distance from the part to the *fuselage*.
      Against the whole aircraft it was still too lenient: the Reaper carries
      missiles and pylons a metre outboard, so a wing floating clear of the body
      passed by being near those. A wing joins a fuselage.
- [x] **A2.** Prove A1 fails on today's build before changing anything else.
      A test that has never failed is not evidence. **Baseline, wing root to
      fuselage:** ALTIUS 0.06 m · Predator 0.01 m · Reaper-on-itself 0.03 m ·
      **Raven 0.35 m · Cessna 1.75 m · Global Hawk 1.85 m.** Matches the
      screenshots exactly. Tolerance for "bolted on" is 0.10 m.
- [x] **A3.** Every attachment claim from here on gets a close-in render of the
      root, not a whole-aircraft shot. **Done** — scripts/show-root.mjs.

## B. Sockets — the core fix

- [ ] **B1.** Define six sockets on the MQ-9: wing, tail, gear, rotor,
      hardpoint, payload. Each is a point plus an orientation on the host body.
      Each slot owns its own root, so the app knows what to remove and what
      replaces it.
- [ ] **B2.** Give every part its own registered attach point — the specific
      spot meant to touch a fuselage. Not its centre, not its bounding-box
      middle. This is the half that does not exist today, which is why parts
      land wherever their donor's origin happened to be, and why ALTIUS works
      (its origin coincidentally lands close).
- [ ] **B3.** Snap = put the part's attach point on the host's socket. No
      per-donor special cases.
- [ ] **B4.** MQ-9 only, as proof of concept. The other 34 airframes keep
      current behaviour until the pattern proves out.
- [-] **B5.** Visible socket outline. **Cut** — parts vary enormously in size
      and the difference is legible by clicking through.

## C. Wings — one line per wing, each verified at the root

- [ ] **C1.** MQ-1 Predator — nearly seated, gap at the root; rear rotor/tail
      surfaces also floating.
- [ ] **C2.** RQ-4 Global Hawk — panel detached outboard, clear daylight.
- [ ] **C3.** Cessna C-172 — floating, gap at the root.
- [ ] **C4.** RQ-11B Raven — not attached; sits under the aircraft, which
      appears to sink below the grid.
- [ ] **C5.** Advanced Plane (px4-plane) — floating both sides.
- [ ] **C6.** Standard VTOL — floating (and duplicated, see D1).
- [ ] **C7.** Zephyr Delta Wing — rotated/sideways, swallows the fuselage.
      Orientation vs. scale, needs a second look.
- [x] **C8.** Anduril ALTIUS 700M — **correct.** The reference for what seated
      looks like. Do not touch.
- [ ] **C9.** X-47B — 22 px off centre against a 21 px threshold. Marginal;
      recheck once sockets land.
- [ ] **C10.** V-22 Osprey — 21% lopsided.
- [ ] **C11.** Shahed-136 — hands over most of its airframe including the tail
      fin, roughly twice the Reaper's span.
- [?] **C12.** VBAT — **its model has no wing at all.** What draws is a ducted
      fan and a fuselage tube; the "wing" cut was slicing that tube lengthwise.
      Dropping the cut turns the parts gate red, because the app offers a wing
      slot to anything whose spec has a wing area. Two real answers, both roster
      decisions: replace the model, or take the VBAT off the roster.

## D. Other geometry bugs

- [ ] **D1.** Standard VTOL renders **four copies** of the wing, stacked
      vertically per side, all detached. Read: the four quadplane rotor
      positions are being applied to the wing mesh instead of to the rotors.
- [ ] **D2.** Standard VTOL and Tiltrotor VTOL draw the **same mesh**. Picker
      stats differ correctly (+1.06 t vs +1.09 t, −10.9 h vs −10.6 h, −62.7 vs
      −47.7 km/h), so the data is fine and the mesh swap is not taking.
      Independently confirmed: in the wing sweep both returned identical figures
      across three camera angles, including the same lit-pixel count to the
      digit (55551). Three renders agreeing exactly is one mesh, not two.

## E. Tails — same family as the wings

- [ ] **E1.** Black Hornet tail **throws the whole model ~20 ft into the air.**
      Every other part leaves the MQ-9 anchored; this one moves the host. The
      host must stay put, always.
- [ ] **E2.** Raven tail broken.
- [ ] **E3.** Realistically no tail attaches correctly — sweep all of them once
      the wing sockets prove out.

## F. Spec sheet

- [ ] **F1.** Wingspan frozen at 20.1 m regardless of wing, while wing area
      correctly changes (21.3 / 12.8 / 57.6 / 54.2 / 30.2 / 45.5 / 30.4 m²).
      Cause: every borrowed wing is physically scaled to the host's span on the
      way in, so the geometry really is 20.1 m; wing area comes from a different
      path, which is why the two disagree. **Not a display fix.** Owner's call:
      attachment matters more than size, so span-fitting stays for now and the
      two figures need to at least agree with each other.
- [ ] **F2.** Aspect ratio is derived from span, so it is wrong on every swapped
      build too. Falls out of F1.
- [x] **F3.** Verdict ignores overload — structural load hits 101%, 103%, 105%
      (amber) and the banner still reads "Flies, and keeps flying — you'll get
      bored before it does." **Done** — a new rung, "Flies, over its limit",
      reads 101% and 105% as marginal. The warning already existed in the panel;
      the headline never looked at it, and the headline is read first.
- [x] **F4.** Spare payload `0 g` should read `0 kg` or "none". **Done** — zero
      is not a small mass, and picking the unit by size sent it to the bottom of
      the scale.

## G. Later

- [x] **G1.** No-wing state — behaviour is good, keep it.
- [?] **G2.** Small unattached payload that drifts up and fades out after a
      couple of seconds. Came through garbled on voice — needs confirming.
- [ ] **G3.** Environments should be more than a grid recolour. Even a simple
      backdrop/horizon would sell sea level vs. Mars.
- [x] **G4.** Quadcopter rotors/arms as a wing-slot option from specific real
      drones, purely for the absurdity. **Already built** — the "use something
      else as a wing" drawer offers 63 cross-role parts for the wing slot, 27 of
      them rotors, from Ingenuity, the X500, the Typhoon, the Black Hornet, the
      delivery quad and more. Whether they land squarely is B's problem, not a
      missing feature.
- [-] **G5.** "Auto-adjust" button to shrink an oversized wing to fit.
      **Parked** — polish, not core. Attachment first.

## H. Do not touch

MQ-9 base model · paint and colour treatment · no-wing hover · ALTIUS 700M
attachment · the "+ Use something else as a wing" escape hatch.
