#!/usr/bin/env python3
"""Propose the fore/aft and vertical sides of a cut box, from the vertices.

A cut with only a span band is an infinite slab: it takes everything outboard of
the fuselage at every station and every height. On the aircraft it was written
for that is often survivable, because what else is out there is a tail boom you
did not mind losing. Borrowed, it is not: the host gets the donor's booms, its
tailplane tips and its outboard gear along with the wing.

This reads the vertices outboard of the span band and reports where they
actually are. The far outboard slab - past 60% of half-span - can only be wing,
so its own fore/aft and vertical range is what the box should close down to.

    python3 scripts/measure-band.py tb2
    python3 scripts/measure-band.py tb2 --role wing --span 0.22
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
CATALOG = ROOT / "src" / "data" / "aircraft.generated.ts"


def load_vertices(aid):
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
        for node_name in scene.graph.nodes_geometry:
            transform, geom_name = scene.graph[node_name]
            if geom_name != name:
                continue
            if any(fnmatch.fnmatch(node_name, pat) for pat in drop):
                continue
            chunks.append(
                trimesh.transformations.transform_points(np.asarray(geom.vertices), transform)
            )
    if not chunks:
        sys.exit(f"{aid}: no vertices survived exclusion")
    return np.vstack(chunks)


def axes_of(aid):
    """The span/length/vertical axis indices the classifier settled on."""
    text = CATALOG.read_text()
    i = text.index(f'"id": "{aid}"')
    j = text.index('"axes"', i)
    k = text.index("}", j)
    block = "{" + text[j : k + 1].split("{", 1)[1]
    axes = json.loads(block)
    return axes["span"], axes["length"], axes["vertical"]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    aid = sys.argv[1]
    role = sys.argv[sys.argv.index("--role") + 1] if "--role" in sys.argv else "wing"
    ovr = json.loads((OVERRIDES / f"{aid}.json").read_text()) if (OVERRIDES / f"{aid}.json").is_file() else {}
    cut = (ovr.get("_cuts") or {}).get(role) or {}
    keep = float(sys.argv[sys.argv.index("--span") + 1]) if "--span" in sys.argv else float(cut.get("keepBand", 0.1))

    S, L, V = axes_of(aid)
    v = load_vertices(aid)
    s, l, h = v[:, S], v[:, L], v[:, V]
    smid = (s.min() + s.max()) / 2.0
    shalf = (s.max() - s.min()) / 2.0
    sf = np.abs(s - smid) / shalf
    lf = (l - l.min()) / (l.max() - l.min())
    hf = (h - h.min()) / (h.max() - h.min())

    print(f"{aid}  role={role}  keepBand={keep}")
    print(f"  outboard of the band: {(sf > keep).sum()} of {len(v)} vertices ({100 * (sf > keep).mean():.0f}%)")

    outer = sf > max(keep, 0.6)
    if outer.sum() < 50:
        print("  nothing far enough outboard to call a wing - leave the box open")
        return

    # Height first, and from the tip, because a wing is flat: whatever height the
    # outboard slab sits at, the whole panel sits at. Then the fore/aft range of
    # everything outboard AT that height - not of the tip, whose chord is shorter
    # than the root's on any tapered wing, so banding from it would saw the root
    # off along with the boom.
    pad = 0.02
    lo_h, hi_h = np.percentile(hf[outer], [0.5, 99.5])
    band_h = [max(0.0, round(lo_h - pad, 2)), min(1.0, round(hi_h + pad, 2))]
    at_height = (sf > keep) & (hf >= band_h[0]) & (hf <= band_h[1])
    lo_l, hi_l = np.percentile(lf[at_height], [0.5, 99.5])
    band_l = [max(0.0, round(lo_l - pad, 2)), min(1.0, round(hi_l + pad, 2))]
    print(f"  the far outboard slab (past {max(keep, 0.6):.2f}) sits at height {hf[outer].min():.3f}..{hf[outer].max():.3f}")
    print(f"  everything outboard at that height runs fore/aft {lf[at_height].min():.3f}..{lf[at_height].max():.3f}")
    print(f"    lengthBand   [{lo_l:.2f}, {hi_l:.2f}]")
    print(f"    verticalBand [{lo_h:.2f}, {hi_h:.2f}]")
    sel = (sf > keep) & (lf >= band_l[0]) & (lf <= band_l[1]) & (hf >= band_h[0]) & (hf <= band_h[1])
    drop = (sf > keep) & ~sel
    print(f"  proposed box keeps {sel.sum()} outboard vertices and drops {drop.sum()} that the open slab was taking")
    if band_l == [0.0, 1.0] and band_h == [0.0, 1.0]:
        print("  ...which is the whole slab, so the open cut was already right")
    else:
        out = {"axis": cut.get("axis", "span"), "keepBand": keep}
        if band_l != [0.0, 1.0]:
            out["lengthBand"] = band_l
        if band_h != [0.0, 1.0]:
            out["verticalBand"] = band_h
        print("  " + json.dumps(out))


if __name__ == "__main__":
    main()
