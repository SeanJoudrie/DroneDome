#!/usr/bin/env python3
"""Measure where a part actually is, so a cut box can be written from evidence.

A cut is three numbers - a span band, a fore/aft band and a vertical band - and
picking them by eye is how you take the nose off instead of the tail. Bounding
boxes are no help either: a welded airframe is one mesh whose box covers the
whole aircraft, so every slice of it looks full width.

So this reads the vertices. It walks the model along its length axis and reports,
for each slice, how wide and how tall the geometry in that slice actually is,
using the same axis convention and the same exclusions the classifier uses. A
tailplane shows up as a slice near one end that is much wider than the boom in
front of it; a fin shows up as one that is much taller.

    python3 scripts/measure-region.py mq1-predator
    python3 scripts/measure-region.py mq1-predator --slices 24

Fractions printed on the left are what goes into lengthBand and verticalBand in
scripts/overrides/<id>.json: 0 at the low end of the axis, 1 at the high end.
"""
import fnmatch
import json
import sys
from pathlib import Path

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OVERRIDES = ROOT / "scripts" / "overrides"
SOURCES = json.loads((ROOT / "scripts" / "sources.json").read_text())


def load_vertices(aid):
    """Every vertex of the aircraft, in model space, scenery excluded."""
    path = SRC / f"{aid}.norm.glb"
    if not path.is_file():
        path = SRC / f"{aid}.glb"
    if not path.is_file():
        sys.exit(f"no mesh for {aid} in {SRC}")
    scene = trimesh.load(str(path), process=False)
    if isinstance(scene, trimesh.Trimesh):
        scene = trimesh.Scene(scene)

    ovr = OVERRIDES / f"{aid}.json"
    drop = (json.loads(ovr.read_text()).get("_exclude") or []) if ovr.is_file() else []

    chunks = []
    for name, geom in scene.geometry.items():
        if not hasattr(geom, "vertices") or not len(geom.vertices):
            continue
        # The same node-name matching the classifier uses, so an excluded
        # display stand does not skew the axes here either.
        node = name
        for parent, _ in scene.graph.transforms.edge_data.items():
            pass
        if any(fnmatch.fnmatch(node, pat) for pat in drop):
            continue
        for node_name in scene.graph.nodes_geometry:
            transform, geom_name = scene.graph[node_name]
            if geom_name != name:
                continue
            if any(fnmatch.fnmatch(node_name, pat) for pat in drop):
                continue
            v = trimesh.transformations.transform_points(np.asarray(geom.vertices), transform)
            chunks.append(v)
    if not chunks:
        sys.exit(f"{aid}: no vertices survived exclusion")
    return np.vstack(chunks)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    aid = sys.argv[1]
    slices = 20
    if "--slices" in sys.argv:
        slices = int(sys.argv[sys.argv.index("--slices") + 1])

    spec = next((a for a in SOURCES["aircraft"] if a["id"] == aid), None)
    if spec is None:
        sys.exit(f"{aid} is not in sources.json")

    v = load_vertices(aid)
    extent = v.max(axis=0) - v.min(axis=0)

    # Axes the same way the classifier picks them: the published span decides
    # which axis is span rather than assuming the widest one is.
    published = spec.get("spec", spec)
    span_m = float(published.get("span_m") or published.get("rotor_diameter_m") or 0) or None
    length_m = float(published.get("length_m") or 0) or None
    order = list(np.argsort(-extent))
    S, L, V = order[0], order[1], order[2]
    if span_m and length_m and length_m > span_m:
        S, L = L, S

    lo, hi = v.min(axis=0), v.max(axis=0)
    half_span = max(abs(lo[S]), abs(hi[S])) or 1.0
    z0, z1 = lo[L], hi[L]
    span_len = (z1 - z0) or 1.0
    height = (hi[V] - lo[V]) or 1.0

    scale = (span_m / extent[S]) if span_m else 1.0
    print(f"\n{aid}   span {extent[S] * scale:.2f} m   length {extent[L] * scale:.2f} m   height {extent[V] * scale:.2f} m")
    print(f"axes: span={S} length={L} vertical={V}   {len(v)} vertices")
    print(f"\n  lengthBand   halfWidth  topOfHull  verts   profile (half-span)")
    for i in range(slices):
        a = z0 + span_len * i / slices
        c = z0 + span_len * (i + 1) / slices
        m = (v[:, L] >= a) & (v[:, L] <= c)
        n = int(m.sum())
        if not n:
            print(f"  {i / slices:.2f}-{(i + 1) / slices:.2f}       -          -        0")
            continue
        sl = v[m]
        w = max(abs(sl[:, S].min()), abs(sl[:, S].max())) / half_span
        top = (sl[:, V].max() - lo[V]) / height
        bar = "#" * round(w * 40)
        print(f"  {i / slices:.2f}-{(i + 1) / slices:.2f}     {w:.3f}      {top:.3f}   {n:6d}  {bar}")
    print()


if __name__ == "__main__":
    main()
