#!/usr/bin/env python3
"""Download every source model and normalise it to a single GLB per aircraft.

Sources:
  sketchfab  needs SKETCHFAB_API_TOKEN in the environment (never committed)
  url        direct download, already GLB
  fuel       Gazebo Fuel zip; the SDF is parsed so each <link> becomes a named
             node in the output GLB, which gives us part separation for free

Output: assets-src/<id>.glb   (gitignored - large, regenerated on demand)
"""
import io
import json
import math
import os
import sys
import urllib.request
import urllib.parse
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets-src"
SOURCES = json.loads((ROOT / "scripts" / "sources.json").read_text())


def log(*a):
    print(*a, flush=True)


def get(url, headers=None, timeout=180):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def sketchfab_token():
    tok = os.environ.get("SKETCHFAB_API_TOKEN")
    if tok:
        return tok.strip()
    # session-local fallback so the token never has to live in the repo
    for p in (Path(os.environ.get("SKETCHFAB_TOKEN_FILE", "")), ROOT / ".sketchfab-token"):
        if p and p.is_file():
            return p.read_text().strip()
    return None


def fetch_sketchfab(uid, dest):
    tok = sketchfab_token()
    if not tok:
        log(f"  ! no Sketchfab token; skipping {uid}")
        return False
    meta = json.loads(
        get(f"https://api.sketchfab.com/v3/models/{uid}/download",
            {"Authorization": f"Token {tok}"})
    )
    if "glb" not in meta:
        log(f"  ! no glb variant offered for {uid}")
        return False
    dest.write_bytes(get(meta["glb"]["url"]))
    return True


def pose_matrix(text):
    """SDF pose -> 4x4. Six floats: x y z roll pitch yaw (extrinsic XYZ)."""
    if not text:
        return np.eye(4)
    v = [float(x) for x in text.split()]
    v += [0.0] * (6 - len(v))
    x, y, z, r, p, yw = v[:6]
    cr, sr, cp, sp, cy, sy = (
        math.cos(r), math.sin(r), math.cos(p), math.sin(p), math.cos(yw), math.sin(yw)
    )
    R = np.array([
        [cy * cp, cy * sp * sr - sy * cr, cy * sp * cr + sy * sr],
        [sy * cp, sy * sp * sr + cy * cr, sy * sp * cr - cy * sr],
        [-sp,     cp * sr,                cp * cr],
    ])
    M = np.eye(4)
    M[:3, :3] = R
    M[:3, 3] = [x, y, z]
    return M


def load_mesh(path, scale_text):
    try:
        m = trimesh.load(str(path), force="mesh", process=False)
    except Exception as e:
        log(f"    ! failed to load {path.name}: {e}")
        return None
    if m is None or not hasattr(m, "vertices") or len(m.vertices) == 0:
        return None
    if scale_text:
        s = [float(x) for x in scale_text.split()]
        s += [s[-1]] * (3 - len(s))
        m.apply_scale(s[:3])
    return m


def fuel_package(owner, model):
    """Download and unpack one Fuel package, cached on disk."""
    tmp = OUT / "_fuel" / model.replace(" ", "_")
    if not any(tmp.rglob("*.sdf")):
        url = (f"https://fuel.gazebosim.org/1.0/{urllib.parse.quote(owner)}"
               f"/models/{urllib.parse.quote(model)}.zip")
        tmp.mkdir(parents=True, exist_ok=True)
        zipfile.ZipFile(io.BytesIO(get(url))).extractall(tmp)
    return tmp


def resolve_mesh(uri, owner, home):
    """
    Find the file a <uri> points at.

    PX4's airframes borrow from each other - the tiltrotor's wing and props are
    `model://standard_vtol/meshes/...` - so a URI naming a different package
    means fetching that package too, not giving up on the model.
    """
    fname = uri.split("/")[-1]
    found = next((p for p in home.rglob(fname)), None)
    if found is not None:
        return found
    if not uri.startswith("model://"):
        return None
    pkg = uri[len("model://"):].split("/")[0]
    if pkg.replace(" ", "_").lower() == home.name.lower():
        return None
    for candidate in (pkg, pkg.replace("_", " "), pkg.replace("_", " ").title()):
        try:
            other = fuel_package(owner, candidate)
        except Exception:
            continue
        hit = next((p for p in other.rglob(fname)), None)
        if hit is not None:
            log(f"    borrowed {fname} from {candidate}")
            return hit
    return None


def fetch_fuel(owner, model, dest):
    tmp = fuel_package(owner, model)

    sdf_path = next((p for p in tmp.rglob("*.sdf")), None)
    if sdf_path is None:
        log("  ! no sdf in fuel package")
        return False
    root = ET.parse(sdf_path).getroot()

    scene = trimesh.Scene()
    count = 0
    for link in root.iter("link"):
        link_name = link.get("name") or f"link_{count}"
        link_pose = pose_matrix((link.findtext("pose") or "").strip())
        for vi, vis in enumerate(link.findall("visual")):
            vis_pose = pose_matrix((vis.findtext("pose") or "").strip())
            mesh_el = vis.find("./geometry/mesh")
            if mesh_el is None:
                continue
            uri = (mesh_el.findtext("uri") or "").strip()
            found = resolve_mesh(uri, owner, tmp)
            if found is None:
                continue
            m = load_mesh(found, (mesh_el.findtext("scale") or "").strip())
            if m is None:
                continue
            name = link_name if vi == 0 else f"{link_name}__{vi}"
            scene.add_geometry(m, node_name=name, geom_name=name,
                               transform=link_pose @ vis_pose)
            count += 1
    if count == 0:
        log("  ! no visual meshes assembled")
        return False
    dest.write_bytes(trimesh.exchange.gltf.export_glb(scene))
    log(f"    assembled {count} named links")
    return True


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    only = set(sys.argv[1:])
    ok, skipped = 0, []
    for ac in SOURCES["aircraft"]:
        aid = ac["id"]
        if only and aid not in only:
            continue
        dest = OUT / f"{aid}.glb"
        if dest.exists() and dest.stat().st_size > 1024:
            log(f"= {aid} (cached, {dest.stat().st_size // 1024} KB)")
            ok += 1
            continue
        src = ac["source"]
        log(f"> {aid} <- {src['kind']}")
        try:
            if src["kind"] == "sketchfab":
                good = fetch_sketchfab(src["uid"], dest)
            elif src["kind"] == "url":
                dest.write_bytes(get(src["url"]))
                good = True
            elif src["kind"] == "fuel":
                good = fetch_fuel(src["owner"], src["model"], dest)
            else:
                good = False
        except Exception as e:
            log(f"  ! {aid}: {e}")
            good = False
        if good:
            log(f"  ok {dest.stat().st_size // 1024} KB")
            ok += 1
        else:
            skipped.append(aid)
            if dest.exists():
                dest.unlink()
    log(f"\n{ok} model(s) ready" + (f", skipped: {', '.join(skipped)}" if skipped else ""))


if __name__ == "__main__":
    main()
