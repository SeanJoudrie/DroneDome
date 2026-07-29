#!/usr/bin/env python3
"""Work out which mesh in a downloaded model is the wing, the tail, the gear...

Downloaded models rarely have useful node names - Sketchfab exports arrive as a
pile of nodes all called 'defaultMaterial'. So we classify geometrically:

  1. The model's overall bounding box gives us its axes. For an aircraft the
     widest axis is span, the next is length, the smallest is vertical.
  2. Parts that mirror across the centreline are paired up. Symmetric pairs are
     the strong signal - tails, landing gear and wing hardpoints all come in
     twos, and their position tells them apart.
  3. Name hints win when a name is actually meaningful (Gazebo models name their
     links properly), geometry decides otherwise.

Anything it gets wrong is corrected by scripts/overrides/<id>.json, which maps
node name -> role and is merged in last.

Output: assets-src/<id>.parts.json
"""
import fnmatch
import json
import re
import sys
from pathlib import Path

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OVERRIDES = ROOT / "scripts" / "overrides"
SOURCES = json.loads((ROOT / "scripts" / "sources.json").read_text())

NAME_HINTS = [
    (r"rotor|propel|prop\b|blade|airscrew", "rotor"),
    (r"solar|panel", "solar"),
    (r"wing(?!let)|aerofoil|airfoil", "wing"),
    (r"tail|elevator|rudder|stabil|vtail|\bfin\b|empennage", "tail"),
    (r"\bleg\b|gear|wheel|skid|strut|undercarr", "gear"),
    (r"cam\b|cams|gimbal|turret|sensor|payload|\bpod\b|eo_ir", "payload"),
    (r"motor|bell|esc\b", "motor"),
    (r"\barm\b|boom", "arm"),
    (r"batt", "battery"),
    (r"body|base|fuselage|frame|hull|chassis|\bbus\b|core", "body"),
]

# roles the builder lets you remove or swap
SWAPPABLE = {"wing", "tail", "rotor", "gear", "payload", "solar", "hardpoint"}


def log(*a):
    print(*a, flush=True)


def name_role(name):
    # trimesh appends a uniquifying hash ("bus_a1b2c3"), which glues itself to
    # the word and defeats \b anchors - strip it before matching
    n = re.sub(r"(__\d+|_[0-9a-f]{6})$", "", name).lower()
    if re.fullmatch(r"(g|node|mesh|object|defaultmaterial|group)[\W_]*\d*", n):
        return None  # meaningless exporter name
    for pat, role in NAME_HINTS:
        if re.search(pat, n):
            return role
    return None


def collect(scene):
    """-> list of {name, center, size, min, max, verts} in world space."""
    parts = []
    for i, node in enumerate(scene.graph.nodes_geometry):
        transform, geom_name = scene.graph[node]
        mesh = scene.geometry.get(geom_name)
        if mesh is None or len(mesh.vertices) == 0:
            continue
        v = trimesh.transform_points(np.asarray(mesh.vertices), transform)
        lo, hi = v.min(axis=0), v.max(axis=0)
        parts.append({
            "node": node,
            "index": i,
            "min": lo, "max": hi,
            "center": (lo + hi) / 2.0,
            "size": hi - lo,
            "verts": int(len(mesh.vertices)),
        })
    return parts


def classify(aid, spec):
    # the normalised copy has Draco decoded; trimesh reads compressed GLB as
    # silently-zeroed vertices, so never classify the raw download
    path = SRC / f"{aid}.norm.glb"
    if not path.is_file():
        path = SRC / f"{aid}.glb"
    scene = trimesh.load(str(path), process=False)
    if isinstance(scene, trimesh.Trimesh):
        scene = trimesh.Scene(scene)
    parts = collect(scene)
    if not parts:
        return None

    ovr_path = OVERRIDES / f"{aid}.json"
    overrides = json.loads(ovr_path.read_text()) if ovr_path.is_file() else {}

    # Published models often ship with scenery: a display stand, a pilot, or in
    # the Matrice's case the flight case it travels in. That geometry is not the
    # aircraft, and leaving it in wrecks the bounding box, and with it the scale,
    # the axes and every dimension derived from them. Dropped before anything is
    # measured, by node-name glob.
    drop = overrides.get("_exclude") or []
    hidden = []
    if drop:
        keep = []
        for part in parts:
            if any(fnmatch.fnmatch(part["node"], pat) for pat in drop):
                hidden.append(part["node"])
            else:
                keep.append(part)
        if not keep:
            raise RuntimeError(f"{aid}: _exclude removed every part")
        parts = keep
        print(f"  {aid}: excluded {len(hidden)} node(s) as scenery")

    span_check = np.max([p["max"] for p in parts], axis=0) - np.min([p["min"] for p in parts], axis=0)
    if float(np.max(span_check)) < 1e-9:
        raise RuntimeError(
            f"{aid}: all vertices collapsed to a point - the source is probably "
            f"still compressed. Run scripts/normalize.mjs first.")

    allmin = np.min([p["min"] for p in parts], axis=0)
    allmax = np.max([p["max"] for p in parts], axis=0)
    extent = allmax - allmin
    origin = (allmin + allmax) / 2.0

    order = np.argsort(-extent)          # widest first
    rotors = int(spec.get("rotors") or 0)
    is_multirotor = rotors >= 3
    if is_multirotor:
        # span ~= length on a multirotor; vertical is simply the thinnest axis
        vert = int(order[2])
        span, length = int(order[0]), int(order[1])
    else:
        # Taking the widest axis as the span is wrong for anything longer than
        # it is wide - a Shahed-136 is 3.5 m long across a 2.5 m span, and
        # guessing put its wing cut down the fuselage. The manifest knows which
        # way round the aircraft is, so ask it.
        vert = int(order[2])
        big, next_big = int(order[0]), int(order[1])
        pub_span = float(spec.get("span_m") or 0)
        pub_len = float(spec.get("length_m") or 0)
        if pub_span and pub_len and pub_len > pub_span:
            span, length = next_big, big
        else:
            span, length = big, next_big

    S, L, V = span, length, vert
    total_span = float(extent[S])
    total_len = float(extent[L])

    for p in parts:
        c = p["center"] - origin
        p["s"], p["l"], p["v"] = float(c[S]), float(c[L]), float(c[V])
        p["ds"], p["dl"], p["dv"] = (float(p["size"][S]), float(p["size"][L]),
                                     float(p["size"][V]))

    # ---- pair up parts that mirror across the centreline -------------------
    tol_s = total_span * 0.03
    tol_o = max(total_len, total_span) * 0.05
    for p in parts:
        p["pair"] = None
        p["side"] = "center" if abs(p["s"]) <= tol_s else ("left" if p["s"] > 0 else "right")
    for a in parts:
        if a["pair"] or a["side"] == "center":
            continue
        for b in parts:
            if b is a or b["pair"] or b["side"] == a["side"]:
                continue
            if (abs(a["s"] + b["s"]) <= tol_s
                    and abs(a["l"] - b["l"]) <= tol_o
                    and abs(a["v"] - b["v"]) <= tol_o
                    and abs(a["ds"] - b["ds"]) <= tol_o):
                a["pair"], b["pair"] = b["node"], a["node"]
                break

    # ---- which end is the nose? -------------------------------------------
    # Tail surfaces are symmetric pairs sitting well off the centreline near one
    # end. Take the biggest such cluster; that end is aft.
    offcentre = [p for p in parts if p["pair"] and abs(p["s"]) > total_span * 0.02]
    aft_sign = 1.0
    if offcentre:
        far = max(offcentre, key=lambda p: abs(p["l"]))
        if abs(far["l"]) > total_len * 0.15:
            aft_sign = 1.0 if far["l"] > 0 else -1.0

    # ---- assign roles ------------------------------------------------------
    body_v = np.median([p["v"] for p in parts])
    wing_candidates = [
        p for p in parts
        if p["ds"] > total_span * 0.5 and p["dv"] < p["ds"] * 0.25
    ]
    main_wing = max(wing_candidates, key=lambda p: p["ds"]) if wing_candidates else None

    for p in parts:
        role = name_role(p["node"])
        if role is None:
            role = geometric_role(p, main_wing, parts, total_span, total_len,
                                  body_v, aft_sign, is_multirotor)
        p["role"] = role

    # a single-mesh model can only be a body
    if len(parts) == 1:
        parts[0]["role"] = "body"

    # A rotor blade and a wing look identical to the geometry: long, thin, and
    # symmetric. The manifest already says whether the aircraft has a wing at
    # all, so use it - on a pure rotorcraft, anything wing-shaped is a blade.
    if not spec.get("wing_area_m2") and (spec.get("rotors") or 0) >= 1:
        for p in parts:
            if p["role"] != "wing":
                continue
            blade = p["ds"] > max(p["dl"], p["dv"]) * 2.5
            p["role"] = "rotor" if blade else "body"

    # Safety net: if the manifest says this thing has rotors, the model has to
    # end up with at least one, or the builder will report a helicopter as
    # generating no lift at all. Promote the most blade-like candidate.
    if (spec.get("rotors") or 0) >= 1 and not any(p["role"] == "rotor" for p in parts):
        pool = [p for p in parts if p["role"] in ("body", "arm", "wing")]
        if pool:
            def bladeness(p):
                thin = max(p["dl"], p["dv"], 1e-9)
                return p["ds"] / thin
            best = max(pool, key=bladeness)
            best["role"] = "rotor"

    for p in parts:
        if p["node"] in overrides:
            p["role"] = overrides[p["node"]]

    # Welded models can't toggle a node off, so a role can instead be defined as
    # a region of the mesh to clip away at runtime.
    #
    # The span band alone is an infinite slab, which takes the tailplane off with
    # the wings on anything that has both fused into one hull. lengthBand and
    # verticalBand close the other two sides of the box; both are fractions of
    # the model's own extent, 0 at the low end of the axis and 1 at the high one,
    # and both are optional - leaving one out means "all the way through".
    def band(cut, key, axis):
        pair = cut.get(key)
        if not pair:
            return None
        half = float(extent[axis]) / 2.0
        return [round((float(f) - 0.5) * 2.0 * half, 6) for f in pair]

    cuts = {}
    for role, cut in (overrides.get("_cuts") or {}).items():
        axis = {"span": S, "length": L, "vertical": V}[cut.get("axis", "span")]
        half = float(extent[axis]) / 2.0
        entry = {
            "axis": axis,
            "axisName": cut.get("axis", "span"),
            "keep": round(half * float(cut["keepBand"]), 6),
            "origin": round(float(origin[axis]), 6),
        }
        along = band(cut, "lengthBand", L)
        up = band(cut, "verticalBand", V)
        if along:
            entry["bandLength"] = along
        if up:
            entry["bandVertical"] = up
        cuts[role] = entry

    # ---- real-world scale --------------------------------------------------
    real_span = float(spec.get("span_m") or spec.get("rotor_diameter_m") or 1.0)
    model_span = total_span if total_span > 1e-9 else 1.0
    scale = real_span / model_span

    return {
        "id": aid,
        "axes": {"span": S, "length": L, "vertical": V},
        "aftSign": aft_sign,
        "modelExtent": [float(x) for x in extent],
        "origin": [float(x) for x in origin],
        "scaleToMetres": scale,
        "cuts": cuts,
        "hidden": hidden,
        "parts": [{
            "node": p["node"],
            # several visuals can belong to one physical link (a rotor's blade
            # and its bell); the group is what the UI shows and toggles
            "group": re.sub(r"(__\d+|_[0-9a-f]{6})$", "", p["node"]),
            "role": p["role"],
            "side": p["side"],
            "pair": p["pair"],
            "verts": p["verts"],
            "center": [round(float(x), 5) for x in (p["center"] - origin)],
            "size": [round(float(x), 5) for x in p["size"]],
            "swappable": p["role"] in SWAPPABLE,
        } for p in sorted(parts, key=lambda q: -q["verts"])],
    }


def geometric_role(p, main_wing, parts, total_span, total_len, body_v, aft, multi):
    s, l, v = p["s"], p["l"], p["v"]
    ds, dl, dv = p["ds"], p["dl"], p["dv"]
    below = v < body_v - max(total_len, total_span) * 0.012

    if main_wing is not None and p is main_wing:
        return "wing"

    if multi:
        # flat disc away from centre = rotor; central mass = body; low = gear
        flat = dv < max(ds, dl) * 0.3
        if flat and abs(ds - dl) < max(ds, dl) * 0.45 and (abs(s) + abs(l)) > total_span * 0.15:
            return "rotor"
        if below:
            return "gear"
        if abs(s) < total_span * 0.15 and abs(l) < total_len * 0.15:
            return "body"
        return "arm"

    # fixed wing
    if ds > total_span * 0.45 and dv < ds * 0.3:
        return "wing"
    outboard = abs(s) > total_span * 0.15
    if p["pair"]:
        if below:
            # gear sits near the centreline; anything slung well outboard and
            # under the wing is a pylon, not a wheel
            if outboard:
                return "hardpoint"
            return "gear" if dl > dv * 1.4 else "hardpoint"
        if l * aft > total_len * 0.12:
            return "tail"
        if main_wing is not None and v < main_wing["v"] + 1e-9 and dl > dv:
            return "hardpoint"
        return "tail" if abs(s) > total_span * 0.05 else "body"
    if below and abs(l) > total_len * 0.2:
        return "payload"
    if below:
        return "gear" if dl > dv else "payload"
    if l * aft > total_len * 0.35 and dv > dl:
        return "tail"
    return "body"


def main():
    only = set(sys.argv[1:])
    OVERRIDES.mkdir(parents=True, exist_ok=True)
    for ac in SOURCES["aircraft"]:
        aid = ac["id"]
        if only and aid not in only:
            continue
        if not (SRC / f"{aid}.glb").is_file():
            continue
        res = classify(aid, ac.get("spec", {}))
        if res is None:
            log(f"! {aid}: no geometry")
            continue
        (SRC / f"{aid}.parts.json").write_text(json.dumps(res, indent=2))
        counts = {}
        for p in res["parts"]:
            counts[p["role"]] = counts.get(p["role"], 0) + 1
        summary = "  ".join(f"{k}x{v}" for k, v in sorted(counts.items()))
        log(f"{aid:<14} {len(res['parts']):>3} parts  scale={res['scaleToMetres']:.4g}  {summary}")


if __name__ == "__main__":
    main()
