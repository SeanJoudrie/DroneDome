// GENERATED FILE - do not edit.
// Produced by scripts/build-catalog.mjs from scripts/sources.json and the
// classifier output in assets-src/. Regenerate with: npm run assets

import type { AircraftModel } from '../types'

export const AIRCRAFT: AircraftModel[] = [
  {
    "id": "mq9-reaper",
    "name": "MQ-9 Reaper",
    "family": "military",
    "blurb": "Turboprop hunter-killer UAV. Long wings, pusher prop, six hardpoints.",
    "environment": "earth",
    "model": "models/mq9-reaper.glb",
    "spec": {
      "span_m": 20.12,
      "length_m": 11,
      "wing_area_m2": 21.5,
      "empty_mass_kg": 2223,
      "mtow_kg": 4760,
      "powertrain": "fuel",
      "fuel_capacity_kg": 1815,
      "engine": "Honeywell TPE331-10GD turboprop",
      "shaft_power_kw": 671,
      "sfc_kg_per_kwh": 0.32,
      "prop_diameter_m": 2.3,
      "prop_blades": 3,
      "payload_kg": 1701,
      "cruise_kmh": 313,
      "max_speed_kmh": 482,
      "endurance_h": 27,
      "ceiling_m": 15420
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": -1,
    "scaleToMetres": 1.553381530071715,
    "modelExtent": [
      5.63143919317065,
      1.608492387638497,
      12.952387813617895
    ],
    "origin": [
      0,
      3.124882347327329e-8,
      -5.040018180579864e-9
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "defaultMaterial",
        "group": "defaultMaterial",
        "role": "gear",
        "side": "left",
        "center": [
          -0.19824,
          -0.50047,
          1.64094
        ],
        "size": [
          1.48434,
          0.2168,
          0.2168
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_4",
        "group": "defaultMaterial_4",
        "role": "gear",
        "side": "right",
        "center": [
          -0.17331,
          -0.56422,
          -1.66971
        ],
        "size": [
          1.69786,
          0.24799,
          0.24799
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_3",
        "group": "defaultMaterial_3",
        "role": "gear",
        "side": "right",
        "center": [
          -0.17331,
          -0.56422,
          -1.20968
        ],
        "size": [
          1.69786,
          0.24799,
          0.24799
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_1",
        "group": "defaultMaterial_1",
        "role": "gear",
        "side": "left",
        "center": [
          -0.19824,
          -0.50047,
          1.23852
        ],
        "size": [
          1.48434,
          0.2168,
          0.2168
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_19",
        "group": "defaultMaterial_19",
        "role": "wing",
        "side": "center",
        "center": [
          -0.24685,
          -0.10462,
          0
        ],
        "size": [
          0.82171,
          0.25473,
          12.95239
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_28",
        "group": "defaultMaterial_28",
        "role": "body",
        "side": "center",
        "center": [
          0.13373,
          0.03107,
          -0.00002
        ],
        "size": [
          5.36398,
          0.64744,
          0.54021
        ],
        "swappable": false
      },
      {
        "node": "defaultMaterial_2",
        "group": "defaultMaterial_2",
        "role": "hardpoint",
        "side": "left",
        "center": [
          -0.10251,
          -0.28692,
          1.4397
        ],
        "size": [
          0.90825,
          0.28031,
          0.46247
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_5",
        "group": "defaultMaterial_5",
        "role": "gear",
        "side": "right",
        "center": [
          -0.0638,
          -0.31995,
          -1.4397
        ],
        "size": [
          1.0389,
          0.32064,
          0.52899
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_27",
        "group": "defaultMaterial_27",
        "role": "payload",
        "side": "center",
        "center": [
          1.49555,
          -0.36507,
          0
        ],
        "size": [
          0.30165,
          0.30165,
          0.22262
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_25",
        "group": "defaultMaterial_25",
        "role": "body",
        "side": "center",
        "center": [
          0.59838,
          0.00037,
          0
        ],
        "size": [
          0.84622,
          0.7499,
          0.07382
        ],
        "swappable": false
      },
      {
        "node": "defaultMaterial_8",
        "group": "defaultMaterial_8",
        "role": "gear",
        "side": "left",
        "center": [
          0.12027,
          -0.39914,
          0.72013
        ],
        "size": [
          2.21312,
          0.33732,
          0.33732
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_6",
        "group": "defaultMaterial_6",
        "role": "gear",
        "side": "right",
        "center": [
          0.12027,
          -0.39914,
          -0.71985
        ],
        "size": [
          2.21312,
          0.33732,
          0.33732
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_24",
        "group": "defaultMaterial_24",
        "role": "tail",
        "side": "center",
        "center": [
          -2.60101,
          0.03413,
          0.17109
        ],
        "size": [
          0.04062,
          1.38416,
          1.24049
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_26",
        "group": "defaultMaterial_26",
        "role": "payload",
        "side": "center",
        "center": [
          1.49555,
          -0.33742,
          0
        ],
        "size": [
          0.2245,
          0.28313,
          0.3073
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_15",
        "group": "defaultMaterial_15",
        "role": "payload",
        "side": "center",
        "center": [
          -1.90562,
          -0.42383,
          0.00164
        ],
        "size": [
          0.72727,
          0.76084,
          0.15928
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_13",
        "group": "defaultMaterial_13",
        "role": "tail",
        "side": "right",
        "center": [
          -1.91812,
          0.42099,
          -0.82051
        ],
        "size": [
          0.53254,
          0.7665,
          1.28995
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_11",
        "group": "defaultMaterial_11",
        "role": "tail",
        "side": "left",
        "center": [
          -1.91812,
          0.42099,
          0.82025
        ],
        "size": [
          0.53254,
          0.7665,
          1.28995
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_22",
        "group": "defaultMaterial_22",
        "role": "hardpoint",
        "side": "right",
        "center": [
          -0.45113,
          -0.13892,
          -5.34428
        ],
        "size": [
          0.17605,
          0.14491,
          2.02567
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_16",
        "group": "defaultMaterial_16",
        "role": "hardpoint",
        "side": "left",
        "center": [
          -0.45088,
          -0.13892,
          5.34428
        ],
        "size": [
          0.17605,
          0.14491,
          2.02567
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_12",
        "group": "defaultMaterial_12",
        "role": "tail",
        "side": "right",
        "center": [
          -2.21426,
          0.43985,
          -0.85292
        ],
        "size": [
          0.14568,
          0.72811,
          1.22476
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_10",
        "group": "defaultMaterial_10",
        "role": "tail",
        "side": "left",
        "center": [
          -2.21426,
          0.43985,
          0.85267
        ],
        "size": [
          0.14568,
          0.72811,
          1.22475
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_14",
        "group": "defaultMaterial_14",
        "role": "payload",
        "side": "center",
        "center": [
          -2.17281,
          -0.46368,
          0.00091
        ],
        "size": [
          0.18672,
          0.60681,
          0.13813
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_23",
        "group": "defaultMaterial_23",
        "role": "body",
        "side": "center",
        "center": [
          -2.68199,
          0.01425,
          0
        ],
        "size": [
          0.26746,
          0.23591,
          0.23591
        ],
        "swappable": false
      },
      {
        "node": "defaultMaterial_21",
        "group": "defaultMaterial_21",
        "role": "tail",
        "side": "right",
        "center": [
          -0.49523,
          -0.08667,
          -3.31866
        ],
        "size": [
          0.20588,
          0.1683,
          2.02567
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_20",
        "group": "defaultMaterial_20",
        "role": "tail",
        "side": "right",
        "center": [
          -0.53958,
          -0.09007,
          -1.29303
        ],
        "size": [
          0.23572,
          0.1751,
          2.02565
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_18",
        "group": "defaultMaterial_18",
        "role": "tail",
        "side": "left",
        "center": [
          -0.53958,
          -0.09007,
          1.29303
        ],
        "size": [
          0.23572,
          0.1751,
          2.02565
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_17",
        "group": "defaultMaterial_17",
        "role": "tail",
        "side": "left",
        "center": [
          -0.49523,
          -0.08667,
          3.31866
        ],
        "size": [
          0.20588,
          0.1683,
          2.02567
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_9",
        "group": "defaultMaterial_9",
        "role": "hardpoint",
        "side": "left",
        "center": [
          -0.15145,
          -0.22766,
          0.71985
        ],
        "size": [
          0.48115,
          0.1424,
          0.10499
        ],
        "swappable": true
      },
      {
        "node": "defaultMaterial_7",
        "group": "defaultMaterial_7",
        "role": "hardpoint",
        "side": "right",
        "center": [
          -0.15145,
          -0.22766,
          -0.71985
        ],
        "size": [
          0.48115,
          0.1424,
          0.10499
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Tyler V Howell",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/mq-9-reaper-eff549610fee4f20904f7b388a3a0830"
    }
  },
  {
    "id": "mq1-predator",
    "name": "MQ-1 Predator",
    "family": "military",
    "blurb": "The original armed UAV. Piston engine, inverted V-tail, very high aspect ratio.",
    "environment": "earth",
    "model": "models/mq1-predator.glb",
    "spec": {
      "span_m": 14.8,
      "length_m": 8.22,
      "wing_area_m2": 11.5,
      "empty_mass_kg": 512,
      "mtow_kg": 1020,
      "powertrain": "fuel",
      "fuel_capacity_kg": 300,
      "engine": "Rotax 914F turbocharged piston",
      "shaft_power_kw": 86,
      "sfc_kg_per_kwh": 0.33,
      "prop_diameter_m": 1.73,
      "prop_blades": 2,
      "payload_kg": 204,
      "cruise_kmh": 130,
      "max_speed_kmh": 217,
      "endurance_h": 24,
      "ceiling_m": 7620
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 1.0094975320238446,
    "modelExtent": [
      14.660758972167969,
      2.202157020568848,
      8.606452941894533
    ],
    "origin": [
      4.76837158203125e-7,
      -0.23204851150512695,
      -0.22551631927490234
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Object_12",
        "group": "Object_12",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.24643,
          1.0495
        ],
        "size": [
          1.19014,
          1.45759,
          6.50746
        ],
        "swappable": false
      },
      {
        "node": "Object_5",
        "group": "Object_5",
        "role": "wing",
        "side": "center",
        "center": [
          0,
          0.07725,
          -0.84955
        ],
        "size": [
          14.61466,
          0.32307,
          2.284
        ],
        "swappable": true
      },
      {
        "node": "Object_8",
        "group": "Object_8",
        "role": "body",
        "side": "center",
        "center": [
          -0.0085,
          0.10096,
          -0.6467
        ],
        "size": [
          0.73064,
          2.00023,
          7.31305
        ],
        "swappable": false
      },
      {
        "node": "Object_10",
        "group": "Object_10",
        "role": "wing",
        "side": "left",
        "center": [
          3.60819,
          0.13863,
          0.00548
        ],
        "size": [
          7.34927,
          0.44614,
          3.76628
        ],
        "swappable": true
      },
      {
        "node": "Object_9",
        "group": "Object_9",
        "role": "gear",
        "side": "center",
        "center": [
          0.00013,
          -0.19852,
          0.54861
        ],
        "size": [
          0.40041,
          0.80968,
          4.85257
        ],
        "swappable": true
      },
      {
        "node": "Object_6",
        "group": "Object_6",
        "role": "body",
        "side": "center",
        "center": [
          0.14749,
          0.07727,
          -1.83812
        ],
        "size": [
          0.297,
          0.32318,
          0.30684
        ],
        "swappable": false
      },
      {
        "node": "Object_7",
        "group": "Object_7",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.33886,
          0.49208
        ],
        "size": [
          0.09932,
          0.27278,
          0.27272
        ],
        "swappable": false
      },
      {
        "node": "Object_11",
        "group": "Object_11",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.06596,
          1.23915
        ],
        "size": [
          0.16242,
          0.337,
          1.43765
        ],
        "swappable": false
      },
      {
        "node": "Object_17",
        "group": "Object_17",
        "role": "wing",
        "side": "center",
        "center": [
          0,
          0.28029,
          -1.31336
        ],
        "size": [
          14.65226,
          0.71926,
          2.7948
        ],
        "swappable": true
      },
      {
        "node": "Object_13",
        "group": "Object_13",
        "role": "wing",
        "side": "right",
        "center": [
          -1.99231,
          -0.47821,
          -2.0241
        ],
        "size": [
          10.5812,
          1.24574,
          3.43603
        ],
        "swappable": true
      },
      {
        "node": "Object_15",
        "group": "Object_15",
        "role": "gear",
        "side": "center",
        "center": [
          -0.01646,
          -0.20366,
          -0.02465
        ],
        "size": [
          3.61886,
          0.15793,
          1.44501
        ],
        "swappable": true
      },
      {
        "node": "Object_14",
        "group": "Object_14",
        "role": "wing",
        "side": "center",
        "center": [
          0,
          0.06937,
          0.12786
        ],
        "size": [
          14.66076,
          1.15708,
          5.67621
        ],
        "swappable": true
      },
      {
        "node": "Object_18",
        "group": "Object_18",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.08367,
          -0.12524
        ],
        "size": [
          3.61961,
          0.26996,
          0.80492
        ],
        "swappable": false
      },
      {
        "node": "Object_16",
        "group": "Object_16",
        "role": "wing",
        "side": "center",
        "center": [
          0.00682,
          0.36617,
          -1.58062
        ],
        "size": [
          14.60102,
          0.61181,
          2.75671
        ],
        "swappable": true
      },
      {
        "node": "Object_3",
        "group": "Object_3",
        "role": "tail",
        "side": "right",
        "center": [
          -7.29491,
          0.07702,
          -0.21198
        ],
        "size": [
          0.02483,
          0.0335,
          0.01943
        ],
        "swappable": true
      },
      {
        "node": "Object_4",
        "group": "Object_4",
        "role": "tail",
        "side": "left",
        "center": [
          7.28821,
          0.07708,
          -0.29708
        ],
        "size": [
          0.01096,
          0.01753,
          0.01051
        ],
        "swappable": true
      },
      {
        "node": "Object_19",
        "group": "Object_19",
        "role": "payload",
        "side": "center",
        "center": [
          -0.06064,
          -0.20456,
          3.42696
        ],
        "size": [
          0.1951,
          0.60878,
          0.99607
        ],
        "swappable": true
      },
      {
        "node": "Object_2",
        "group": "Object_2",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.08726,
          -2.68082
        ],
        "size": [
          0.03132,
          0.00009,
          0.03073
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "Jeyhun1985",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/mq-1-predator-uav-7f70ef747e6d4c27a9555cfff0671923"
    }
  },
  {
    "id": "tb2",
    "name": "Bayraktar TB2",
    "family": "military",
    "blurb": "Light strike UAV. Twin boom, inverted V-tail, pusher prop.",
    "environment": "earth",
    "model": "models/tb2.glb",
    "spec": {
      "span_m": 12,
      "length_m": 6.5,
      "wing_area_m2": 9,
      "empty_mass_kg": 420,
      "mtow_kg": 700,
      "powertrain": "fuel",
      "fuel_capacity_kg": 130,
      "engine": "Rotax 912 piston",
      "shaft_power_kw": 74,
      "sfc_kg_per_kwh": 0.34,
      "prop_diameter_m": 1.4,
      "prop_blades": 2,
      "payload_kg": 150,
      "cruise_kmh": 130,
      "max_speed_kmh": 220,
      "endurance_h": 27,
      "ceiling_m": 8200
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 1.0036032824110575,
    "modelExtent": [
      11.956915855407715,
      2.2965296689581147,
      7.543290927912399
    ],
    "origin": [
      0,
      1.1444159395330116,
      0.5257472641694068
    ],
    "cuts": {
      "wing": {
        "axis": 0,
        "axisName": "span",
        "keep": 1.315261,
        "origin": 0
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "bayraktar_tb2_mat_bay_tb2_0",
        "group": "bayraktar_tb2_mat_bay_tb2_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0,
          0
        ],
        "size": [
          11.95692,
          2.29653,
          7.54329
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "TheDevilsEye",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/baykar-bayraktar-tb2-8e5b6972f7d049f19688096e03949487"
    }
  },
  {
    "id": "x47b",
    "name": "Northrop Grumman X-47B",
    "family": "military",
    "blurb": "Carrier-capable stealth flying wing. Turbofan, no tail at all.",
    "environment": "earth",
    "model": "models/x47b.glb",
    "spec": {
      "span_m": 18.92,
      "length_m": 11.63,
      "wing_area_m2": 74,
      "empty_mass_kg": 6350,
      "mtow_kg": 20215,
      "powertrain": "fuel",
      "fuel_capacity_kg": 8000,
      "engine": "Pratt & Whitney F100-220U turbofan",
      "thrust_n": 79600,
      "sfc_kg_per_kwh": 0,
      "tsfc_kg_per_n_h": 0.0000217,
      "payload_kg": 2000,
      "cruise_kmh": 850,
      "max_speed_kmh": 1035,
      "endurance_h": 6,
      "ceiling_m": 12000
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.6629792545027292,
    "modelExtent": [
      28.537846201825786,
      5.536139274397043,
      19.671681305109047
    ],
    "origin": [
      1.649037410260533,
      2.710688851527339,
      -1.950678726309147
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Cube.001_Material.001_0",
        "group": "Cube.001_Material.001_0",
        "role": "body",
        "side": "right",
        "center": [
          -8.97065,
          0,
          4.82118
        ],
        "size": [
          10.59655,
          5.53614,
          10.02933
        ],
        "swappable": false
      },
      {
        "node": "Cube.002_Material_0",
        "group": "Cube.002_Material_0",
        "role": "wing",
        "side": "left",
        "center": [
          4.07114,
          -1.06718,
          -3.80016
        ],
        "size": [
          20.39556,
          3.34169,
          12.07135
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Yakudami",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/northrop-grumman-x-47b-8d5fa8ab10ba4b8486d40248eeb9332d"
    }
  },
  {
    "id": "global-hawk",
    "name": "RQ-4 Global Hawk",
    "family": "military",
    "blurb": "High-altitude long-endurance surveillance. Turbofan, whale nose, enormous span.",
    "environment": "earth",
    "model": "models/global-hawk.glb",
    "spec": {
      "span_m": 39.9,
      "length_m": 14.5,
      "wing_area_m2": 50.2,
      "empty_mass_kg": 6781,
      "mtow_kg": 14628,
      "powertrain": "fuel",
      "fuel_capacity_kg": 7300,
      "engine": "Rolls-Royce F137-RR-100 turbofan",
      "thrust_n": 34000,
      "tsfc_kg_per_n_h": 0.0000185,
      "payload_kg": 1360,
      "cruise_kmh": 570,
      "max_speed_kmh": 629,
      "endurance_h": 32,
      "ceiling_m": 18300
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.09557990095810677,
    "modelExtent": [
      417.4517822265625,
      74.64669609069824,
      205.17132568359375
    ],
    "origin": [
      -0.040771484375,
      37.01669406890869,
      8.131202697753906
    ],
    "cuts": {
      "wing": {
        "axis": 0,
        "axisName": "span",
        "keep": 21.916219,
        "origin": -0.040771
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "Global Hawk_cd79c1",
        "group": "Global Hawk",
        "role": "wing",
        "side": "center",
        "center": [
          0,
          3.98173,
          0
        ],
        "size": [
          417.45178,
          66.68323,
          205.17133
        ],
        "swappable": true
      },
      {
        "node": "Global Hawk_dc2a87",
        "group": "Global Hawk",
        "role": "gear",
        "side": "center",
        "center": [
          0.13404,
          -34.17451,
          23.34663
        ],
        "size": [
          61.43425,
          6.29768,
          61.48679
        ],
        "swappable": true
      },
      {
        "node": "Global Hawk_621ca5",
        "group": "Global Hawk",
        "role": "body",
        "side": "center",
        "center": [
          0.7914,
          -26.95863,
          -4.28351
        ],
        "size": [
          60.56918,
          18.77375,
          4.25164
        ],
        "swappable": false
      },
      {
        "node": "Global Hawk_434d07",
        "group": "Global Hawk",
        "role": "body",
        "side": "center",
        "center": [
          -0.01744,
          -30.03466,
          50.9071
        ],
        "size": [
          2.17602,
          12.61939,
          4.25114
        ],
        "swappable": false
      },
      {
        "node": "Global Hawk_5b3e66",
        "group": "Global Hawk",
        "role": "body",
        "side": "center",
        "center": [
          0.15221,
          -22.01169,
          -4.33624
        ],
        "size": [
          58.08189,
          9.23184,
          1.74426
        ],
        "swappable": false
      },
      {
        "node": "Global Hawk_dc0a26",
        "group": "Global Hawk",
        "role": "body",
        "side": "center",
        "center": [
          0.00134,
          -23.26266,
          27.3316
        ],
        "size": [
          74.94072,
          17.28003,
          76.3481
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "NASA",
      "license": "public-domain",
      "licenseName": "Public domain (NASA)",
      "url": "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Global%20Hawk/Global%20Hawk.glb"
    }
  },
  {
    "id": "ingenuity",
    "name": "Ingenuity Mars Helicopter",
    "family": "experimental",
    "blurb": "Coaxial rotors, solar recharged, flown in 1.6% of Earth's air pressure.",
    "environment": "mars",
    "model": "models/ingenuity.glb",
    "spec": {
      "span_m": 1.21,
      "length_m": 1.21,
      "empty_mass_kg": 1.5,
      "mtow_kg": 1.8,
      "powertrain": "solar",
      "rotors": 4,
      "coaxial": true,
      "rotor_diameter_m": 1.21,
      "rotor_rpm": 2537,
      "battery_wh": 38,
      "solar_w": 12,
      "payload_kg": 0.05,
      "cruise_kmh": 18,
      "max_speed_kmh": 36,
      "endurance_h": 0.025,
      "ceiling_m": 24
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 1.0936805204818891,
    "modelExtent": [
      0.9863763980081093,
      0.5620434795814833,
      1.1063559945886747
    ],
    "origin": [
      -0.00182447415005349,
      0.27498122814015014,
      0.00031231333580822307
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "rotors_02_639909",
        "group": "rotors_02",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.06329,
          0
        ],
        "size": [
          0.118,
          0.06432,
          0.16219
        ],
        "swappable": true
      },
      {
        "node": "rotors_01_238847",
        "group": "rotors_01",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.13373,
          0
        ],
        "size": [
          0.1253,
          0.06047,
          0.13626
        ],
        "swappable": true
      },
      {
        "node": "rotors_02_bc0e28",
        "group": "rotors_02",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.04054,
          0.00003
        ],
        "size": [
          0.98638,
          0.04876,
          0.72414
        ],
        "swappable": true
      },
      {
        "node": "rotors_01_24a333",
        "group": "rotors_01",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.13941,
          0
        ],
        "size": [
          0.5056,
          0.04876,
          1.10636
        ],
        "swappable": true
      },
      {
        "node": "parts_02_7644e2",
        "group": "parts_02",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.0214,
          0
        ],
        "size": [
          0.0426,
          0.06088,
          0.03521
        ],
        "swappable": false
      },
      {
        "node": "parts_01_1a2319",
        "group": "parts_01",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.12039,
          0
        ],
        "size": [
          0.0426,
          0.06088,
          0.03521
        ],
        "swappable": false
      },
      {
        "node": "leg_04_b67bb3",
        "group": "leg_04",
        "role": "gear",
        "side": "right",
        "center": [
          0.19341,
          -0.14639,
          -0.19858
        ],
        "size": [
          0.25391,
          0.26544,
          0.2466
        ],
        "swappable": true
      },
      {
        "node": "leg_03_699810",
        "group": "leg_03",
        "role": "gear",
        "side": "left",
        "center": [
          0.19478,
          -0.14709,
          0.19791
        ],
        "size": [
          0.25683,
          0.26417,
          0.2451
        ],
        "swappable": true
      },
      {
        "node": "leg_02_5e23df",
        "group": "leg_02",
        "role": "gear",
        "side": "right",
        "center": [
          -0.19278,
          -0.14727,
          -0.19922
        ],
        "size": [
          0.25417,
          0.26751,
          0.24381
        ],
        "swappable": true
      },
      {
        "node": "leg_01_ddd7d5",
        "group": "leg_01",
        "role": "gear",
        "side": "left",
        "center": [
          -0.19278,
          -0.14727,
          0.19916
        ],
        "size": [
          0.25417,
          0.26751,
          0.24381
        ],
        "swappable": true
      },
      {
        "node": "solar_panel_effe30",
        "group": "solar_panel",
        "role": "solar",
        "side": "center",
        "center": [
          0,
          0.20832,
          -0.02032
        ],
        "size": [
          0.02256,
          0.00734,
          0.0632
        ],
        "swappable": true
      },
      {
        "node": "leg_04_281fdf",
        "group": "leg_04",
        "role": "gear",
        "side": "right",
        "center": [
          0.10381,
          -0.05256,
          -0.11315
        ],
        "size": [
          0.02713,
          0.02032,
          0.0272
        ],
        "swappable": true
      },
      {
        "node": "leg_03_1d0eb0",
        "group": "leg_03",
        "role": "gear",
        "side": "left",
        "center": [
          0.10401,
          -0.05378,
          0.11309
        ],
        "size": [
          0.02721,
          0.0201,
          0.02717
        ],
        "swappable": true
      },
      {
        "node": "leg_02_4b883f",
        "group": "leg_02",
        "role": "gear",
        "side": "right",
        "center": [
          -0.10402,
          -0.05249,
          -0.11288
        ],
        "size": [
          0.0272,
          0.02008,
          0.02717
        ],
        "swappable": true
      },
      {
        "node": "leg_01_6d4d21",
        "group": "leg_01",
        "role": "gear",
        "side": "left",
        "center": [
          -0.10402,
          -0.05249,
          0.11282
        ],
        "size": [
          0.0272,
          0.02008,
          0.02717
        ],
        "swappable": true
      },
      {
        "node": "rotors_02_83b405",
        "group": "rotors_02",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.07498,
          0
        ],
        "size": [
          0.05934,
          0.02003,
          0.05934
        ],
        "swappable": true
      },
      {
        "node": "rotors_01_6561e1",
        "group": "rotors_01",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.17398,
          0
        ],
        "size": [
          0.05951,
          0.02003,
          0.05951
        ],
        "swappable": true
      },
      {
        "node": "bus_ebc26b",
        "group": "bus",
        "role": "body",
        "side": "center",
        "center": [
          0.00018,
          -0.02374,
          -0.00003
        ],
        "size": [
          0.18104,
          0.02919,
          0.19763
        ],
        "swappable": false
      },
      {
        "node": "leg_04_4ea6b4",
        "group": "leg_04",
        "role": "gear",
        "side": "right",
        "center": [
          0.17538,
          -0.14055,
          -0.18207
        ],
        "size": [
          0.20131,
          0.23381,
          0.19545
        ],
        "swappable": true
      },
      {
        "node": "leg_03_138125",
        "group": "leg_03",
        "role": "gear",
        "side": "left",
        "center": [
          0.17672,
          -0.14131,
          0.18143
        ],
        "size": [
          0.20397,
          0.23268,
          0.1941
        ],
        "swappable": true
      },
      {
        "node": "leg_02_85c72a",
        "group": "leg_02",
        "role": "gear",
        "side": "right",
        "center": [
          -0.17503,
          -0.14154,
          -0.18165
        ],
        "size": [
          0.20125,
          0.23587,
          0.19445
        ],
        "swappable": true
      },
      {
        "node": "leg_01_51160f",
        "group": "leg_01",
        "role": "gear",
        "side": "left",
        "center": [
          -0.17503,
          -0.14154,
          0.18159
        ],
        "size": [
          0.20125,
          0.23587,
          0.19445
        ],
        "swappable": true
      },
      {
        "node": "parts_02_f07d3b",
        "group": "parts_02",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.00069,
          0
        ],
        "size": [
          0.02675,
          0.01887,
          0.02675
        ],
        "swappable": false
      },
      {
        "node": "parts_01_999a6d",
        "group": "parts_01",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.09968,
          0
        ],
        "size": [
          0.02675,
          0.01887,
          0.02675
        ],
        "swappable": false
      },
      {
        "node": "parts_02_a1d6c8",
        "group": "parts_02",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.00576,
          0
        ],
        "size": [
          0.04858,
          0.00656,
          0.04758
        ],
        "swappable": false
      },
      {
        "node": "parts_01_05fb70",
        "group": "parts_01",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.09324,
          0
        ],
        "size": [
          0.04858,
          0.00656,
          0.04758
        ],
        "swappable": false
      },
      {
        "node": "solar_panel_4d77bf",
        "group": "solar_panel",
        "role": "solar",
        "side": "right",
        "center": [
          0.00093,
          0.2465,
          -0.04306
        ],
        "size": [
          0.00724,
          0.06904,
          0.00722
        ],
        "swappable": true
      },
      {
        "node": "bus_dfc9f2",
        "group": "bus",
        "role": "body",
        "side": "center",
        "center": [
          0.00005,
          -0.0825,
          -0.00003
        ],
        "size": [
          0.16048,
          0.13563,
          0.16048
        ],
        "swappable": false
      },
      {
        "node": "solar_panel_6d2af9",
        "group": "solar_panel",
        "role": "solar",
        "side": "center",
        "center": [
          0.00004,
          0.2033,
          -0.00003
        ],
        "size": [
          0.16499,
          0.01331,
          0.42499
        ],
        "swappable": true
      },
      {
        "node": "rotors_01_4c78ae",
        "group": "rotors_01",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.14082,
          0
        ],
        "size": [
          0.01509,
          0.11166,
          0.01509
        ],
        "swappable": true
      },
      {
        "node": "bus_ad698d",
        "group": "bus",
        "role": "body",
        "side": "center",
        "center": [
          0.00005,
          -0.15157,
          -0.00003
        ],
        "size": [
          0.03626,
          0.00251,
          0.03626
        ],
        "swappable": false
      },
      {
        "node": "cams_9a6b3f",
        "group": "cams",
        "role": "payload",
        "side": "center",
        "center": [
          0.04505,
          -0.15074,
          -0.00003
        ],
        "size": [
          0.03711,
          0.00214,
          0.07564
        ],
        "swappable": true
      },
      {
        "node": "rotors_02_0e6e2a",
        "group": "rotors_02",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.00822,
          0
        ],
        "size": [
          0.01505,
          0.04581,
          0.01505
        ],
        "swappable": true
      },
      {
        "node": "solar_panel_eab10d",
        "group": "solar_panel",
        "role": "solar",
        "side": "center",
        "center": [
          0.00004,
          0.20465,
          -0.00003
        ],
        "size": [
          0.16499,
          0.00003,
          0.42499
        ],
        "swappable": true
      },
      {
        "node": "cams_3048fa",
        "group": "cams",
        "role": "payload",
        "side": "center",
        "center": [
          0.04505,
          -0.15181,
          -0.00003
        ],
        "size": [
          0.03336,
          0,
          0.07189
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "NASA/JPL-Caltech",
      "license": "public-domain",
      "licenseName": "Public domain (NASA)",
      "url": "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Ingenuity%20Mars%20Helicopter/Ingenuity%20Mars%20Helicopter.glb"
    }
  },
  {
    "id": "x500",
    "name": "Holybro X500 Quad",
    "family": "hobby",
    "blurb": "500 mm research quadcopter. The PX4 reference airframe.",
    "environment": "earth",
    "model": "models/x500.glb",
    "spec": {
      "span_m": 0.5,
      "length_m": 0.5,
      "empty_mass_kg": 1,
      "mtow_kg": 2,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.254,
      "motor_kv": 920,
      "battery_wh": 74,
      "battery_cells": 4,
      "payload_kg": 0.5,
      "cruise_kmh": 30,
      "max_speed_kmh": 65,
      "endurance_h": 0.25,
      "ceiling_m": 500
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": 1,
    "scaleToMetres": 0.7803122426386432,
    "modelExtent": [
      0.40700000035762784,
      0.6407691340446472,
      0.29698412181437017
    ],
    "origin": [
      0,
      -4.8362291782400035e-8,
      -0.07910744666308164
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          0.00012,
          -0.00025,
          -0.00901
        ],
        "size": [
          0.39569,
          0.39604,
          0.27896
        ],
        "swappable": false
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.17399,
          0.174,
          0.1358
        ],
        "size": [
          0.04403,
          0.29277,
          0.02538
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.17401,
          -0.174,
          0.1358
        ],
        "size": [
          0.04403,
          0.29277,
          0.02538
        ],
        "swappable": true
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.17399,
          -0.174,
          0.1358
        ],
        "size": [
          0.04403,
          0.29277,
          0.02538
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.17401,
          0.174,
          0.1358
        ],
        "size": [
          0.04403,
          0.29277,
          0.02538
        ],
        "swappable": true
      },
      {
        "node": "base_link__4",
        "group": "base_link",
        "role": "body",
        "side": "right",
        "center": [
          -0.174,
          -0.174,
          0.11311
        ],
        "size": [
          0.03191,
          0.03191,
          0.018
        ],
        "swappable": false
      },
      {
        "node": "base_link__3",
        "group": "base_link",
        "role": "body",
        "side": "right",
        "center": [
          0.174,
          -0.174,
          0.11311
        ],
        "size": [
          0.03191,
          0.03191,
          0.018
        ],
        "swappable": false
      },
      {
        "node": "base_link__2",
        "group": "base_link",
        "role": "body",
        "side": "left",
        "center": [
          -0.174,
          0.174,
          0.11311
        ],
        "size": [
          0.03191,
          0.03191,
          0.018
        ],
        "swappable": false
      },
      {
        "node": "base_link__1",
        "group": "base_link",
        "role": "body",
        "side": "left",
        "center": [
          0.174,
          0.174,
          0.11311
        ],
        "size": [
          0.03191,
          0.03191,
          0.018
        ],
        "swappable": false
      },
      {
        "node": "rotor_3__1",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.174,
          -0.174,
          0.11761
        ],
        "size": [
          0.059,
          0.059,
          0.021
        ],
        "swappable": true
      },
      {
        "node": "rotor_2__1",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.174,
          0.174,
          0.11761
        ],
        "size": [
          0.059,
          0.059,
          0.021
        ],
        "swappable": true
      },
      {
        "node": "rotor_1__1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.174,
          0.174,
          0.11761
        ],
        "size": [
          0.059,
          0.059,
          0.021
        ],
        "swappable": true
      },
      {
        "node": "rotor_0__1",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.174,
          -0.174,
          0.11761
        ],
        "size": [
          0.059,
          0.059,
          0.021
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "PX4 / Open Robotics",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://app.gazebosim.org/PX4/fuel/models/x500"
    }
  },
  {
    "id": "typhoon-h480",
    "name": "Typhoon H480 Hex",
    "family": "consumer",
    "blurb": "Six rotors, retractable gear, gimballed camera.",
    "environment": "earth",
    "model": "models/typhoon-h480.glb",
    "spec": {
      "span_m": 0.52,
      "length_m": 0.52,
      "empty_mass_kg": 1.7,
      "mtow_kg": 2.4,
      "powertrain": "electric",
      "rotors": 6,
      "rotor_diameter_m": 0.24,
      "motor_kv": 950,
      "battery_wh": 79,
      "battery_cells": 4,
      "payload_kg": 0.4,
      "cruise_kmh": 30,
      "max_speed_kmh": 70,
      "endurance_h": 0.4,
      "ceiling_m": 500
    },
    "axes": {
      "span": 0,
      "length": 1,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.8364916950929008,
    "modelExtent": [
      0.6216439482310088,
      0.6179583072662354,
      0.303006611764431
    ],
    "origin": [
      0.0008470435844977198,
      0.04880261421203613,
      -0.06873327866196632
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          -0.00071,
          -0.0488,
          0.06438
        ],
        "size": [
          0.45541,
          0.52035,
          0.15825
        ],
        "swappable": false
      },
      {
        "node": "cgo3_mount_link",
        "group": "cgo3_mount_link",
        "role": "gear",
        "side": "right",
        "center": [
          -0.03016,
          -0.0488,
          -0.02145
        ],
        "size": [
          0.08256,
          0.07694,
          0.0708
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.2104,
          -0.17121,
          0.14346
        ],
        "size": [
          0.20084,
          0.11925,
          0.01504
        ],
        "swappable": true
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          0.21034,
          -0.16886,
          0.14346
        ],
        "size": [
          0.20097,
          0.12068,
          0.01504
        ],
        "swappable": true
      },
      {
        "node": "rotor_4",
        "group": "rotor_4",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00231,
          0.1939,
          0.14346
        ],
        "size": [
          0.02618,
          0.23017,
          0.01504
        ],
        "swappable": true
      },
      {
        "node": "rotor_5",
        "group": "rotor_5",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.0022,
          -0.29124,
          0.14372
        ],
        "size": [
          0.2298,
          0.02592,
          0.01556
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.2103,
          0.07342,
          0.14372
        ],
        "size": [
          0.12377,
          0.19792,
          0.01556
        ],
        "swappable": true
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "left",
        "center": [
          0.21008,
          0.07131,
          0.14372
        ],
        "size": [
          0.11592,
          0.20335,
          0.01556
        ],
        "swappable": true
      },
      {
        "node": "cgo3_camera_link",
        "group": "cgo3_camera_link",
        "role": "gear",
        "side": "right",
        "center": [
          -0.04266,
          -0.0503,
          -0.09539
        ],
        "size": [
          0.0693,
          0.055,
          0.07231
        ],
        "swappable": true
      },
      {
        "node": "cgo3_horizontal_arm_link",
        "group": "cgo3_horizontal_arm_link",
        "role": "gear",
        "side": "right",
        "center": [
          -0.02198,
          -0.04881,
          -0.09324
        ],
        "size": [
          0.08251,
          0.08048,
          0.04236
        ],
        "swappable": true
      },
      {
        "node": "left_leg",
        "group": "left_leg",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00089,
          -0.14273,
          -0.06104
        ],
        "size": [
          0.275,
          0.12497,
          0.18093
        ],
        "swappable": true
      },
      {
        "node": "right_leg",
        "group": "right_leg",
        "role": "gear",
        "side": "center",
        "center": [
          -0.0008,
          0.04512,
          -0.06104
        ],
        "size": [
          0.275,
          0.12498,
          0.18093
        ],
        "swappable": true
      },
      {
        "node": "cgo3_vertical_arm_link",
        "group": "cgo3_vertical_arm_link",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00867,
          -0.0488,
          -0.06867
        ],
        "size": [
          0.0792,
          0.0438,
          0.07527
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Gambit / Open Robotics",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://app.gazebosim.org/Gambit/fuel/models/Typhoon%20H480"
    }
  },
  {
    "id": "zephyr-delta",
    "name": "Zephyr Delta Wing",
    "family": "hobby",
    "blurb": "Small electric flying wing. No tail, no fuselage, pure lifting surface.",
    "environment": "earth",
    "model": "models/zephyr-delta.glb",
    "spec": {
      "span_m": 1.5,
      "length_m": 1.5,
      "wing_area_m2": 0.32,
      "empty_mass_kg": 1.1,
      "mtow_kg": 1.6,
      "powertrain": "electric",
      "rotors": 1,
      "rotor_diameter_m": 0.2,
      "motor_kv": 1000,
      "battery_wh": 55,
      "battery_cells": 4,
      "payload_kg": 0.5,
      "cruise_kmh": 55,
      "max_speed_kmh": 110,
      "endurance_h": 0.6,
      "ceiling_m": 400
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.0009774514835433437,
    "modelExtent": [
      1534.603021484375,
      806.9547287597657,
      1533.7100607533662
    ],
    "origin": [
      0,
      21.04883654785155,
      0.005997039179248986
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "flap_right",
        "group": "flap_right",
        "role": "body",
        "side": "center",
        "center": [
          -0.453,
          0.1195,
          -12.993
        ],
        "size": [
          1533.69702,
          806.71573,
          296.836
        ],
        "swappable": false
      },
      {
        "node": "flap_left",
        "group": "flap_left",
        "role": "body",
        "side": "center",
        "center": [
          0.453,
          0.1195,
          -12.993
        ],
        "size": [
          1533.69702,
          806.71573,
          296.836
        ],
        "swappable": false
      },
      {
        "node": "propeller",
        "group": "propeller",
        "role": "rotor",
        "side": "center",
        "center": [
          -12.994,
          -0.0495,
          0
        ],
        "size": [
          296.83635,
          806.71573,
          1533.71006
        ],
        "swappable": true
      },
      {
        "node": "wing",
        "group": "wing",
        "role": "wing",
        "side": "center",
        "center": [
          0,
          -0.1195,
          -13
        ],
        "size": [
          1533.69702,
          806.71573,
          296.836
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Open Robotics",
      "license": "CC0-1.0",
      "licenseName": "CC0 1.0 (public domain dedication)",
      "url": "https://app.gazebosim.org/OpenRobotics/fuel/models/Zephyr%20Delta%20Wing"
    }
  },
  {
    "id": "v22-osprey",
    "name": "Bell Boeing V-22 Osprey",
    "family": "experimental",
    "blurb": "Tiltrotor. Takes off on two enormous rotors, then flies on its wing.",
    "environment": "earth",
    "model": "models/v22-osprey.glb",
    "spec": {
      "span_m": 25.55,
      "length_m": 17.5,
      "wing_area_m2": 28,
      "empty_mass_kg": 15032,
      "mtow_kg": 27443,
      "powertrain": "fuel",
      "fuel_capacity_kg": 6513,
      "engine": "Rolls-Royce T406 turboshaft x2",
      "shaft_power_kw": 9172,
      "sfc_kg_per_kwh": 0.29,
      "rotors": 2,
      "rotor_diameter_m": 11.6,
      "prop_blades": 3,
      "payload_kg": 9070,
      "cruise_kmh": 446,
      "max_speed_kmh": 565,
      "endurance_h": 3.5,
      "ceiling_m": 7620
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.026511838967370603,
    "modelExtent": [
      963.7203979492188,
      284.3017920888961,
      771.9508972167971
    ],
    "origin": [
      -0.00030517578125,
      142.10099604539576,
      -0.0002593994140625
    ],
    "cuts": {
      "wing": {
        "axis": 0,
        "axisName": "span",
        "keep": 67.460428,
        "origin": -0.000305
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "Object_3",
        "group": "Object_3",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          6.6884,
          4.90051
        ],
        "size": [
          963.7204,
          270.92499,
          553.74191
        ],
        "swappable": true
      },
      {
        "node": "Object_4",
        "group": "Object_4",
        "role": "body",
        "side": "center",
        "center": [
          -0.00739,
          -20.87759,
          0
        ],
        "size": [
          498.40941,
          242.5466,
          771.9509
        ],
        "swappable": false
      },
      {
        "node": "Object_2",
        "group": "Object_2",
        "role": "gear",
        "side": "center",
        "center": [
          0.00131,
          -53.6806,
          -89.32209
        ],
        "size": [
          92.6636,
          61.4916,
          286.1997
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Muhamad Mirza Ardiansyah",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/bell-boeing-v-22-osprey-military-helicopter-cf00a682505f479a903e9600cce051f7"
    }
  },
  {
    "id": "black-hornet",
    "name": "Black Hornet nano helicopter",
    "family": "experimental",
    "blurb": "Thirty-three grams. Fits in a pocket, flies for twenty-five minutes.",
    "environment": "earth",
    "model": "models/black-hornet.glb",
    "spec": {
      "span_m": 0.123,
      "length_m": 0.168,
      "empty_mass_kg": 0.028,
      "mtow_kg": 0.033,
      "powertrain": "electric",
      "rotors": 2,
      "rotor_diameter_m": 0.123,
      "motor_kv": 4000,
      "battery_wh": 2.5,
      "battery_cells": 1,
      "payload_kg": 0.002,
      "cruise_kmh": 15,
      "max_speed_kmh": 21,
      "endurance_h": 0.42,
      "ceiling_m": 500
    },
    "axes": {
      "span": 0,
      "length": 1,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.4630917538597673,
    "modelExtent": [
      0.26560611147752516,
      0.5657272391840799,
      0.1809369494097479
    ],
    "origin": [
      -7.040305061156715e-9,
      -0.020024146756039418,
      -0.001892369927136539
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Object_58",
        "group": "Object_58",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.10277,
          -0.04673
        ],
        "size": [
          0.26561,
          0.36019,
          0.04047
        ],
        "swappable": false
      },
      {
        "node": "Object_40",
        "group": "Object_40",
        "role": "tail",
        "side": "right",
        "center": [
          -0.02927,
          -0.23286,
          -0.00047
        ],
        "size": [
          0.02055,
          0.10001,
          0.17999
        ],
        "swappable": true
      },
      {
        "node": "Object_38",
        "group": "Object_38",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.08873,
          -0.0046
        ],
        "size": [
          0.07653,
          0.23689,
          0.05563
        ],
        "swappable": false
      },
      {
        "node": "Object_34",
        "group": "Object_34",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.11325,
          0.05896
        ],
        "size": [
          0.069,
          0.19967,
          0.06302
        ],
        "swappable": false
      },
      {
        "node": "Object_36",
        "group": "Object_36",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.09421,
          0.04865
        ],
        "size": [
          0.07454,
          0.2476,
          0.05113
        ],
        "swappable": false
      },
      {
        "node": "Object_56",
        "group": "Object_56",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.14151,
          0.00778
        ],
        "size": [
          0.02123,
          0.22338,
          0.04109
        ],
        "swappable": false
      },
      {
        "node": "Object_60",
        "group": "Object_60",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.11371,
          0.00289
        ],
        "size": [
          0.02208,
          0.12794,
          0.02222
        ],
        "swappable": false
      },
      {
        "node": "Object_26",
        "group": "Object_26",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.2296,
          0.02406
        ],
        "size": [
          0.07082,
          0.08427,
          0.10103
        ],
        "swappable": false
      },
      {
        "node": "Object_46",
        "group": "Object_46",
        "role": "tail",
        "side": "right",
        "center": [
          -0.01388,
          -0.23286,
          -0.00047
        ],
        "size": [
          0.0058,
          0.05368,
          0.05368
        ],
        "swappable": true
      },
      {
        "node": "Object_52",
        "group": "Object_52",
        "role": "tail",
        "side": "center",
        "center": [
          0.00676,
          -0.23283,
          -0.00186
        ],
        "size": [
          0.00728,
          0.00347,
          0.00323
        ],
        "swappable": true
      },
      {
        "node": "Object_50",
        "group": "Object_50",
        "role": "body",
        "side": "center",
        "center": [
          0.00668,
          -0.23287,
          -0.00186
        ],
        "size": [
          0.00164,
          0.00835,
          0.00832
        ],
        "swappable": false
      },
      {
        "node": "Object_44",
        "group": "Object_44",
        "role": "body",
        "side": "right",
        "center": [
          -0.01884,
          -0.23286,
          -0.00047
        ],
        "size": [
          0.00409,
          0.05057,
          0.05057
        ],
        "swappable": false
      },
      {
        "node": "Object_42",
        "group": "Object_42",
        "role": "tail",
        "side": "center",
        "center": [
          -0.00364,
          -0.23286,
          -0.00047
        ],
        "size": [
          0.01448,
          0.05275,
          0.05275
        ],
        "swappable": true
      },
      {
        "node": "Object_30",
        "group": "Object_30",
        "role": "body",
        "side": "center",
        "center": [
          0,
          -0.00315,
          0.0377
        ],
        "size": [
          0.01133,
          0.03837,
          0.02475
        ],
        "swappable": false
      },
      {
        "node": "Object_48",
        "group": "Object_48",
        "role": "tail",
        "side": "center",
        "center": [
          -0.00693,
          -0.21439,
          -0.00047
        ],
        "size": [
          0.00768,
          0.02627,
          0.05539
        ],
        "swappable": true
      },
      {
        "node": "Object_54",
        "group": "Object_54",
        "role": "body",
        "side": "center",
        "center": [
          -0.00722,
          -0.14441,
          -0.00098
        ],
        "size": [
          0.00404,
          0.01903,
          0.01831
        ],
        "swappable": false
      },
      {
        "node": "Object_28",
        "group": "Object_28",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.24941,
          0.01654
        ],
        "size": [
          0.01834,
          0.00865,
          0.01837
        ],
        "swappable": false
      },
      {
        "node": "Object_32",
        "group": "Object_32",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.19764,
          0.04803
        ],
        "size": [
          0.0668,
          0.04111,
          0.04855
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Shah@NarsunStudios",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/black-hornet-drone-2522b830817b41bd9cc0118b4fd227bb"
    }
  },
  {
    "id": "fpv-racer",
    "name": "5-inch freestyle quad",
    "family": "hobby",
    "blurb": "The FPV standard. Absurd thrust-to-weight, four minutes of flight.",
    "environment": "earth",
    "model": "models/fpv-racer.glb",
    "spec": {
      "span_m": 0.22,
      "length_m": 0.22,
      "empty_mass_kg": 0.45,
      "mtow_kg": 0.75,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.127,
      "motor_kv": 2450,
      "battery_wh": 22,
      "battery_cells": 4,
      "payload_kg": 0.15,
      "cruise_kmh": 60,
      "max_speed_kmh": 130,
      "endurance_h": 0.1,
      "ceiling_m": 500
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.22700122918472324,
    "modelExtent": [
      0.9691577476920799,
      0.3816427085488404,
      0.6894850846587945
    ],
    "origin": [
      -0.0055166113511546655,
      0.30349684256417503,
      0.04724029557608092
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "polySurface194_mycheckered_0",
        "group": "polySurface194_mycheckered_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.00181,
          -0.1157,
          -0.02362
        ],
        "size": [
          0.80408,
          0.13561,
          0.64225
        ],
        "swappable": false
      },
      {
        "node": "wing7_yellow_wire_0",
        "group": "wing7_yellow_wire_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.00236,
          -0.12235,
          -0.01496
        ],
        "size": [
          0.78534,
          0.11074,
          0.52435
        ],
        "swappable": false
      },
      {
        "node": "curve6_cpulegs_0",
        "group": "curve6_cpulegs_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00903,
          -0.15809,
          -0.02516
        ],
        "size": [
          0.08342,
          0.01599,
          0.08933
        ],
        "swappable": true
      },
      {
        "node": "polySurface194_genblack_0",
        "group": "polySurface194_genblack_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.0009,
          -0.18589,
          -0.02277
        ],
        "size": [
          0.27277,
          0.0052,
          0.42762
        ],
        "swappable": true
      },
      {
        "node": "pCube10_cpulegs_0",
        "group": "pCube10_cpulegs_0",
        "role": "rotor",
        "side": "center",
        "center": [
          0.00451,
          -0.15997,
          -0.1689
        ],
        "size": [
          0.05036,
          0.00198,
          0.06431
        ],
        "swappable": true
      },
      {
        "node": "pasted__polySurface71_Mocor_and_caps_0",
        "group": "pasted__polySurface71_Mocor_and_caps_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.00197,
          -0.08375,
          -0.01501
        ],
        "size": [
          0.72132,
          0.0471,
          0.46036
        ],
        "swappable": false
      },
      {
        "node": "polySurface194_Mocor_and_caps_0",
        "group": "polySurface194_Mocor_and_caps_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.00151,
          -0.0541,
          0.05544
        ],
        "size": [
          0.13776,
          0.02268,
          0.45553
        ],
        "swappable": false
      },
      {
        "node": "polySurface269_blinn19_0",
        "group": "polySurface269_blinn19_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00753,
          -0.16687,
          -0.02244
        ],
        "size": [
          0.36913,
          0.02378,
          0.41293
        ],
        "swappable": true
      },
      {
        "node": "polySurface269_red_wire_0",
        "group": "polySurface269_red_wire_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00753,
          -0.15717,
          -0.02019
        ],
        "size": [
          0.6584,
          0.03769,
          0.45279
        ],
        "swappable": true
      },
      {
        "node": "polySurface269_yellow_wire_0",
        "group": "polySurface269_yellow_wire_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00667,
          -0.15544,
          -0.02028
        ],
        "size": [
          0.65667,
          0.04114,
          0.45298
        ],
        "swappable": true
      },
      {
        "node": "polySurface269_blinn20_0",
        "group": "polySurface269_blinn20_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00753,
          -0.17313,
          -0.02028
        ],
        "size": [
          0.63552,
          0.0348,
          0.44101
        ],
        "swappable": true
      },
      {
        "node": "polySurface194_pilars_0",
        "group": "polySurface194_pilars_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.00122,
          -0.11272,
          0.05439
        ],
        "size": [
          0.1384,
          0.11855,
          0.4569
        ],
        "swappable": false
      },
      {
        "node": "polySurface225_genblack_0",
        "group": "polySurface225_genblack_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.00257,
          -0.12204,
          0.13599
        ],
        "size": [
          0.10485,
          0.11036,
          0.23705
        ],
        "swappable": false
      },
      {
        "node": "polySurface269_black_wire_0",
        "group": "polySurface269_black_wire_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.12202,
          -0.15627,
          -0.15544
        ],
        "size": [
          0.40653,
          0.04006,
          0.1703
        ],
        "swappable": true
      },
      {
        "node": "pPlane4_black_wire_0",
        "group": "pPlane4_black_wire_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.03804,
          -0.10797,
          -0.03035
        ],
        "size": [
          0.05274,
          0.10886,
          0.04171
        ],
        "swappable": false
      },
      {
        "node": "pPlane4_phong1_0",
        "group": "pPlane4_phong1_0",
        "role": "body",
        "side": "center",
        "center": [
          0.00043,
          -0.03987,
          0.04789
        ],
        "size": [
          0.08555,
          0.0513,
          0.12249
        ],
        "swappable": false
      },
      {
        "node": "polySurface225_black_wire_0",
        "group": "polySurface225_black_wire_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.00089,
          -0.11482,
          0.26028
        ],
        "size": [
          0.03628,
          0.03628,
          0.03299
        ],
        "swappable": false
      },
      {
        "node": "curve6_cpu1_0",
        "group": "curve6_cpu1_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00083,
          -0.15961,
          -0.02546
        ],
        "size": [
          0.11354,
          0.01967,
          0.11225
        ],
        "swappable": true
      },
      {
        "node": "polySurface269_genblack_0",
        "group": "polySurface269_genblack_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00229,
          -0.15641,
          0.08312
        ],
        "size": [
          0.12997,
          0.02739,
          0.14653
        ],
        "swappable": true
      },
      {
        "node": "pPlane4_Battery_texture_0",
        "group": "pPlane4_Battery_texture_0",
        "role": "battery",
        "side": "center",
        "center": [
          0.00043,
          -0.03987,
          0.04789
        ],
        "size": [
          0.08363,
          0.05016,
          0.11975
        ],
        "swappable": false
      },
      {
        "node": "pPlane4_yellow_wire_0",
        "group": "pPlane4_yellow_wire_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.00277,
          -0.09997,
          0.01902
        ],
        "size": [
          0.11615,
          0.12721,
          0.13256
        ],
        "swappable": false
      },
      {
        "node": "polySurface273_red_wire_0",
        "group": "polySurface273_red_wire_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.28818,
          -0.09846,
          -0.20735
        ],
        "size": [
          0.25285,
          0.01361,
          0.22958
        ],
        "swappable": true
      },
      {
        "node": "polySurface272_red_wire_0",
        "group": "polySurface272_red_wire_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.36053,
          -0.09846,
          0.22168
        ],
        "size": [
          0.24811,
          0.01361,
          0.24218
        ],
        "swappable": true
      },
      {
        "node": "polySurface271_red_wire_0",
        "group": "polySurface271_red_wire_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.35904,
          -0.09846,
          0.22672
        ],
        "size": [
          0.25108,
          0.01361,
          0.23604
        ],
        "swappable": true
      },
      {
        "node": "polySurface270_red_wire_0",
        "group": "polySurface270_red_wire_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.30075,
          -0.09846,
          -0.21099
        ],
        "size": [
          0.25108,
          0.01361,
          0.23604
        ],
        "swappable": true
      },
      {
        "node": "pPlane4_red_wire_0",
        "group": "pPlane4_red_wire_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.03868,
          -0.10687,
          -0.03049
        ],
        "size": [
          0.05501,
          0.10705,
          0.04545
        ],
        "swappable": false
      },
      {
        "node": "pPlane4_battery_0",
        "group": "pPlane4_battery_0",
        "role": "battery",
        "side": "right",
        "center": [
          -0.03593,
          -0.10908,
          -0.02866
        ],
        "size": [
          0.0462,
          0.11145,
          0.03335
        ],
        "swappable": false
      },
      {
        "node": "pPlane4_gen_white_0",
        "group": "pPlane4_gen_white_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.01648,
          -0.03706,
          -0.08593
        ],
        "size": [
          0.02237,
          0.00884,
          0.02508
        ],
        "swappable": false
      },
      {
        "node": "polySurface225_red_wire_0",
        "group": "polySurface225_red_wire_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00835,
          -0.15055,
          0.12168
        ],
        "size": [
          0.02365,
          0.02575,
          0.20747
        ],
        "swappable": true
      },
      {
        "node": "polySurface225_yellow_wire_0",
        "group": "polySurface225_yellow_wire_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00899,
          -0.15045,
          0.12147
        ],
        "size": [
          0.02288,
          0.02625,
          0.2079
        ],
        "swappable": true
      },
      {
        "node": "pPlane4_Mocor_and_caps_0",
        "group": "pPlane4_Mocor_and_caps_0",
        "role": "body",
        "side": "center",
        "center": [
          0.00001,
          -0.04029,
          0.064
        ],
        "size": [
          0.11512,
          0.06774,
          0.03734
        ],
        "swappable": false
      },
      {
        "node": "curve6_Mocor_and_caps_0",
        "group": "curve6_Mocor_and_caps_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00029,
          -0.14978,
          -0.02428
        ],
        "size": [
          0.10525,
          0.00615,
          0.108
        ],
        "swappable": true
      },
      {
        "node": "pCube10_cpu1_0",
        "group": "pCube10_cpu1_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00144,
          -0.16104,
          -0.16868
        ],
        "size": [
          0.06855,
          0.00457,
          0.08081
        ],
        "swappable": true
      },
      {
        "node": "pCube9_genblack_0",
        "group": "pCube9_genblack_0",
        "role": "rotor",
        "side": "center",
        "center": [
          0.00028,
          -0.16174,
          -0.16958
        ],
        "size": [
          0.07744,
          0.01989,
          0.08239
        ],
        "swappable": true
      },
      {
        "node": "pCylinder31_antena_0",
        "group": "pCylinder31_antena_0",
        "role": "body",
        "side": "center",
        "center": [
          0.00552,
          0.15082,
          -0.04724
        ],
        "size": [
          0.12047,
          0.08001,
          0.12047
        ],
        "swappable": false
      },
      {
        "node": "pPlane4_blinn21_0",
        "group": "pPlane4_blinn21_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.01829,
          -0.0312,
          -0.04599
        ],
        "size": [
          0.03542,
          0.01588,
          0.068
        ],
        "swappable": false
      },
      {
        "node": "polySurface269_Mocor_and_caps_0",
        "group": "polySurface269_Mocor_and_caps_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.09527,
          -0.17346,
          -0.02378
        ],
        "size": [
          0.02185,
          0.03471,
          0.4417
        ],
        "swappable": true
      },
      {
        "node": "pCube22_genblack_0",
        "group": "pCube22_genblack_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.01105,
          -0.15745,
          -0.12834
        ],
        "size": [
          0.04524,
          0.0057,
          0.00489
        ],
        "swappable": true
      },
      {
        "node": "curve6_pilars_0",
        "group": "curve6_pilars_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00008,
          -0.16299,
          -0.02441
        ],
        "size": [
          0.10383,
          0.02099,
          0.10833
        ],
        "swappable": true
      },
      {
        "node": "pCube22_blinn21_0",
        "group": "pCube22_blinn21_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.01105,
          -0.15745,
          -0.11775
        ],
        "size": [
          0.04163,
          0.0021,
          0.01728
        ],
        "swappable": true
      },
      {
        "node": "curve6_motherboard_0",
        "group": "curve6_motherboard_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00083,
          -0.15882,
          -0.02546
        ],
        "size": [
          0.11354,
          0.01316,
          0.11225
        ],
        "swappable": true
      },
      {
        "node": "pCube22_gen_white_0",
        "group": "pCube22_gen_white_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.02442,
          -0.15544,
          -0.12497
        ],
        "size": [
          0.0192,
          0.00895,
          0.01917
        ],
        "swappable": true
      },
      {
        "node": "polySurface215_Mocor_and_caps_0",
        "group": "polySurface215_Mocor_and_caps_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.06111,
          -0.0627,
          0.11602
        ],
        "size": [
          0.0149,
          0.00615,
          0.0149
        ],
        "swappable": false
      },
      {
        "node": "pCube9_dhr2_receiver_0",
        "group": "pCube9_dhr2_receiver_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.0008,
          -0.15673,
          -0.16958
        ],
        "size": [
          0.07528,
          0.00991,
          0.08239
        ],
        "swappable": true
      },
      {
        "node": "pCube10_motherboard_0",
        "group": "pCube10_motherboard_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00144,
          -0.16049,
          -0.16868
        ],
        "size": [
          0.06855,
          0,
          0.08081
        ],
        "swappable": true
      },
      {
        "node": "pCylinder31_gen_white_0",
        "group": "pCylinder31_gen_white_0",
        "role": "body",
        "side": "center",
        "center": [
          0.00552,
          0.00949,
          -0.04724
        ],
        "size": [
          0.01773,
          0.20264,
          0.01773
        ],
        "swappable": false
      },
      {
        "node": "pCylinder18_camera_lens_0",
        "group": "pCylinder18_camera_lens_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.00089,
          -0.11488,
          0.27437
        ],
        "size": [
          0.00693,
          0.00693,
          0.00066
        ],
        "swappable": false
      },
      {
        "node": "pCube20_blinn21_0",
        "group": "pCube20_blinn21_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.02359,
          -0.15745,
          -0.11775
        ],
        "size": [
          0.0021,
          0.0021,
          0.01728
        ],
        "swappable": true
      },
      {
        "node": "curve6_lambert2_0",
        "group": "curve6_lambert2_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00417,
          -0.15876,
          -0.0619
        ],
        "size": [
          0.00718,
          0.01464,
          0.00408
        ],
        "swappable": true
      },
      {
        "node": "polySurface104_pilars_0",
        "group": "polySurface104_pilars_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.00165,
          -0.11456,
          0.23435
        ],
        "size": [
          0.09648,
          0.096,
          0.01973
        ],
        "swappable": false
      },
      {
        "node": "pCube10_lambert2_0",
        "group": "pCube10_lambert2_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.01474,
          -0.16162,
          -0.13611
        ],
        "size": [
          0.03695,
          0.0034,
          0.01559
        ],
        "swappable": true
      },
      {
        "node": "polySurface104_b_10_oct_16:motherboard_0",
        "group": "polySurface104_b_10_oct_16:motherboard_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.00165,
          -0.11456,
          0.2336
        ],
        "size": [
          0.09648,
          0.096,
          0.01822
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "jbabs",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/fpv-racing-drone-22f2ba667d6a4b7eaebd05539cb9ffb9"
    }
  },
  {
    "id": "agri-hex",
    "name": "Agricultural spray drone",
    "family": "consumer",
    "blurb": "Six rotors and a tank. Most of the aircraft is the payload.",
    "environment": "earth",
    "model": "models/agri-hex.glb",
    "spec": {
      "span_m": 1.5,
      "length_m": 1.5,
      "empty_mass_kg": 25,
      "mtow_kg": 65,
      "powertrain": "electric",
      "rotors": 6,
      "rotor_diameter_m": 0.53,
      "motor_kv": 100,
      "battery_wh": 977,
      "battery_cells": 12,
      "payload_kg": 40,
      "cruise_kmh": 25,
      "max_speed_kmh": 40,
      "endurance_h": 0.3,
      "ceiling_m": 100
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": -1,
    "scaleToMetres": 6.973212973327277,
    "modelExtent": [
      0.20922331342347,
      0.06665432602194712,
      0.21510887531150125
    ],
    "origin": [
      4.76837147544984e-9,
      0.02996562026517942,
      0
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "pCylinder19_Drone_0",
        "group": "pCylinder19_Drone_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.0988,
          0.02423,
          0.00015
        ],
        "size": [
          0.01147,
          0.00386,
          0.01147
        ],
        "swappable": false
      },
      {
        "node": "pCylinder20_Drone_0",
        "group": "pCylinder20_Drone_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.02244,
          0
        ],
        "size": [
          0.0613,
          0.0152,
          0.05849
        ],
        "swappable": false
      },
      {
        "node": "pasted__Body109_Drone_0",
        "group": "pasted__Body109_Drone_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.09878,
          0.0194,
          -0.00005
        ],
        "size": [
          0.01163,
          0.00581,
          0.01162
        ],
        "swappable": false
      },
      {
        "node": "pasted__Body108_Drone_0",
        "group": "pasted__Body108_Drone_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.04947,
          0.0194,
          -0.0855
        ],
        "size": [
          0.01161,
          0.00581,
          0.01297
        ],
        "swappable": false
      },
      {
        "node": "pasted__Body107_Drone_0",
        "group": "pasted__Body107_Drone_0",
        "role": "body",
        "side": "right",
        "center": [
          0.04949,
          0.0194,
          -0.08549
        ],
        "size": [
          0.01161,
          0.00581,
          0.01297
        ],
        "swappable": false
      },
      {
        "node": "pasted__Body106_Drone_0",
        "group": "pasted__Body106_Drone_0",
        "role": "body",
        "side": "center",
        "center": [
          0.09878,
          0.0194,
          0.00003
        ],
        "size": [
          0.01163,
          0.00581,
          0.01162
        ],
        "swappable": false
      },
      {
        "node": "pasted__Body105_Drone_0",
        "group": "pasted__Body105_Drone_0",
        "role": "body",
        "side": "left",
        "center": [
          0.04929,
          0.0194,
          0.0856
        ],
        "size": [
          0.01161,
          0.00581,
          0.01297
        ],
        "swappable": false
      },
      {
        "node": "pasted__Body60_Drone_0",
        "group": "pasted__Body60_Drone_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.04956,
          0.0194,
          0.08544
        ],
        "size": [
          0.01161,
          0.00581,
          0.01297
        ],
        "swappable": false
      },
      {
        "node": "polySurface25_Drone_0",
        "group": "polySurface25_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          -0.00104,
          -0.00136
        ],
        "size": [
          0.01675,
          0.00032,
          0.02401
        ],
        "swappable": true
      },
      {
        "node": "pCylinder23_Drone_0",
        "group": "pCylinder23_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00003,
          -0.03151,
          0.00147
        ],
        "size": [
          0.05543,
          0.00364,
          0.06174
        ],
        "swappable": true
      },
      {
        "node": "pCylinder7_Drone_0",
        "group": "pCylinder7_Drone_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.0194,
          0.00005
        ],
        "size": [
          0.20917,
          0.00583,
          0.18373
        ],
        "swappable": false
      },
      {
        "node": "polySurface10_Drone_0",
        "group": "polySurface10_Drone_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.04915,
          0.02951,
          0.08561
        ],
        "size": [
          0.07171,
          0.00764,
          0.04389
        ],
        "swappable": true
      },
      {
        "node": "polySurface4_Drone_0",
        "group": "polySurface4_Drone_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.04915,
          0.02951,
          0.08561
        ],
        "size": [
          0.07171,
          0.00764,
          0.04389
        ],
        "swappable": true
      },
      {
        "node": "polySurface7_Drone_0",
        "group": "polySurface7_Drone_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.04915,
          0.02951,
          -0.08561
        ],
        "size": [
          0.07171,
          0.00764,
          0.04389
        ],
        "swappable": true
      },
      {
        "node": "polySurface8_Drone_0",
        "group": "polySurface8_Drone_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.09871,
          0.02951,
          -0.00024
        ],
        "size": [
          0.0098,
          0.00764,
          0.08181
        ],
        "swappable": true
      },
      {
        "node": "polySurface9_Drone_0",
        "group": "polySurface9_Drone_0",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.04957,
          0.02951,
          0.08537
        ],
        "size": [
          0.07151,
          0.00764,
          0.04402
        ],
        "swappable": true
      },
      {
        "node": "polySurface6_Drone_0",
        "group": "polySurface6_Drone_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.04957,
          0.02951,
          -0.08537
        ],
        "size": [
          0.07151,
          0.00764,
          0.04402
        ],
        "swappable": true
      },
      {
        "node": "polySurface11_Drone_0",
        "group": "polySurface11_Drone_0",
        "role": "rotor",
        "side": "center",
        "center": [
          0.09871,
          0.02951,
          0.00024
        ],
        "size": [
          0.0098,
          0.00764,
          0.08181
        ],
        "swappable": true
      },
      {
        "node": "polySurface5_Drone_0",
        "group": "polySurface5_Drone_0",
        "role": "rotor",
        "side": "center",
        "center": [
          0.09871,
          0.02951,
          0.00024
        ],
        "size": [
          0.0098,
          0.00764,
          0.08181
        ],
        "swappable": true
      },
      {
        "node": "pCylinder6_Drone_0",
        "group": "pCylinder6_Drone_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.04927,
          0.02423,
          0.08564
        ],
        "size": [
          0.01144,
          0.00386,
          0.01144
        ],
        "swappable": false
      },
      {
        "node": "pCylinder17_Drone_0",
        "group": "pCylinder17_Drone_0",
        "role": "arm",
        "side": "left",
        "center": [
          -0.04949,
          0.02423,
          0.08548
        ],
        "size": [
          0.01144,
          0.00386,
          0.01144
        ],
        "swappable": false
      },
      {
        "node": "pCylinder16_Drone_0",
        "group": "pCylinder16_Drone_0",
        "role": "arm",
        "side": "center",
        "center": [
          -0.09877,
          0.02423,
          -0.00015
        ],
        "size": [
          0.01147,
          0.00386,
          0.01147
        ],
        "swappable": false
      },
      {
        "node": "pCylinder15_Drone_0",
        "group": "pCylinder15_Drone_0",
        "role": "arm",
        "side": "right",
        "center": [
          -0.04929,
          0.02423,
          -0.0856
        ],
        "size": [
          0.01144,
          0.00386,
          0.01144
        ],
        "swappable": false
      },
      {
        "node": "pCylinder14_Drone_0",
        "group": "pCylinder14_Drone_0",
        "role": "arm",
        "side": "right",
        "center": [
          0.0495,
          0.02423,
          -0.0855
        ],
        "size": [
          0.01144,
          0.00386,
          0.01144
        ],
        "swappable": false
      },
      {
        "node": "pCylinder13_Drone_0",
        "group": "pCylinder13_Drone_0",
        "role": "arm",
        "side": "center",
        "center": [
          0.0988,
          0.02423,
          0.00015
        ],
        "size": [
          0.01147,
          0.00386,
          0.01147
        ],
        "swappable": false
      },
      {
        "node": "polySurface24_Drone_0",
        "group": "polySurface24_Drone_0",
        "role": "gear",
        "side": "left",
        "center": [
          0,
          -0.00792,
          0.00813
        ],
        "size": [
          0.04063,
          0.02361,
          0.04299
        ],
        "swappable": true
      },
      {
        "node": "polySurface23_Drone_0",
        "group": "polySurface23_Drone_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.03088,
          0.0194,
          -0.00009
        ],
        "size": [
          0.00062,
          0.00646,
          0.00646
        ],
        "swappable": false
      },
      {
        "node": "polySurface22_Drone_0",
        "group": "polySurface22_Drone_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.01534,
          0.0194,
          -0.0267
        ],
        "size": [
          0.00578,
          0.00646,
          0.00364
        ],
        "swappable": false
      },
      {
        "node": "polySurface21_Drone_0",
        "group": "polySurface21_Drone_0",
        "role": "body",
        "side": "right",
        "center": [
          0.0155,
          0.0194,
          -0.02661
        ],
        "size": [
          0.00578,
          0.00646,
          0.00363
        ],
        "swappable": false
      },
      {
        "node": "polySurface20_Drone_0",
        "group": "polySurface20_Drone_0",
        "role": "body",
        "side": "center",
        "center": [
          0.03088,
          0.0194,
          0.00009
        ],
        "size": [
          0.00062,
          0.00646,
          0.00646
        ],
        "swappable": false
      },
      {
        "node": "polySurface19_Drone_0",
        "group": "polySurface19_Drone_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01526,
          0.0194,
          0.02675
        ],
        "size": [
          0.00579,
          0.00646,
          0.00363
        ],
        "swappable": false
      },
      {
        "node": "polySurface18_Drone_0",
        "group": "polySurface18_Drone_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.01551,
          0.0194,
          0.02661
        ],
        "size": [
          0.00578,
          0.00646,
          0.00364
        ],
        "swappable": false
      },
      {
        "node": "pCylinder36_Drone_0",
        "group": "pCylinder36_Drone_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.00827,
          0.006,
          0.00783
        ],
        "size": [
          0.00049,
          0.0031,
          0.00506
        ],
        "swappable": true
      },
      {
        "node": "pCylinder35_Drone_0",
        "group": "pCylinder35_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00827,
          0.006,
          0.00017
        ],
        "size": [
          0.00049,
          0.0031,
          0.00506
        ],
        "swappable": true
      },
      {
        "node": "pCylinder34_Drone_0",
        "group": "pCylinder34_Drone_0",
        "role": "gear",
        "side": "right",
        "center": [
          0.00827,
          0.006,
          -0.00749
        ],
        "size": [
          0.00049,
          0.0031,
          0.00506
        ],
        "swappable": true
      },
      {
        "node": "pCylinder33_Drone_0",
        "group": "pCylinder33_Drone_0",
        "role": "gear",
        "side": "left",
        "center": [
          -0.00828,
          0.006,
          0.00783
        ],
        "size": [
          0.00049,
          0.0031,
          0.00506
        ],
        "swappable": true
      },
      {
        "node": "pCylinder32_Drone_0",
        "group": "pCylinder32_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00828,
          0.006,
          0.00017
        ],
        "size": [
          0.00049,
          0.0031,
          0.00506
        ],
        "swappable": true
      },
      {
        "node": "pCylinder31_Drone_0",
        "group": "pCylinder31_Drone_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00828,
          0.006,
          -0.00749
        ],
        "size": [
          0.00049,
          0.0031,
          0.00506
        ],
        "swappable": true
      },
      {
        "node": "pCube6_Drone_0",
        "group": "pCube6_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          0.00165,
          0.0002
        ],
        "size": [
          0.01789,
          0.00681,
          0.01938
        ],
        "swappable": true
      },
      {
        "node": "polySurface16_Drone_0",
        "group": "polySurface16_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.09878,
          0.01649,
          0.00003
        ],
        "size": [
          0.01166,
          0.02881,
          0.01166
        ],
        "swappable": true
      },
      {
        "node": "polySurface15_Drone_0",
        "group": "polySurface15_Drone_0",
        "role": "gear",
        "side": "right",
        "center": [
          0.04949,
          0.01649,
          -0.08549
        ],
        "size": [
          0.01166,
          0.02881,
          0.01166
        ],
        "swappable": true
      },
      {
        "node": "polySurface14_Drone_0",
        "group": "polySurface14_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.09878,
          0.01649,
          -0.00005
        ],
        "size": [
          0.01166,
          0.02881,
          0.01166
        ],
        "swappable": true
      },
      {
        "node": "polySurface13_Drone_0",
        "group": "polySurface13_Drone_0",
        "role": "gear",
        "side": "left",
        "center": [
          -0.04956,
          0.00335,
          0.08544
        ],
        "size": [
          0.01166,
          0.02881,
          0.01166
        ],
        "swappable": true
      },
      {
        "node": "pCylinder37_Drone_0",
        "group": "pCylinder37_Drone_0",
        "role": "gear",
        "side": "left",
        "center": [
          0,
          0.00575,
          0.02432
        ],
        "size": [
          0.00804,
          0.00496,
          0.00801
        ],
        "swappable": true
      },
      {
        "node": "pCube1_Drone_0",
        "group": "pCube1_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          0.00023,
          0.01179,
          0.00163
        ],
        "size": [
          0.02753,
          0.00886,
          0.03107
        ],
        "swappable": true
      },
      {
        "node": "pCylinder26_Drone_0",
        "group": "pCylinder26_Drone_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          -0.00695,
          0.00174
        ],
        "size": [
          0.05437,
          0.04993,
          0.02369
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Low Poly Drone",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/drone-for-agriculturelow-poly-b6220a9a99d349d5aa64c8e7edef3758"
    }
  },
  {
    "id": "delivery-quad",
    "name": "Delivery quadcopter",
    "family": "consumer",
    "blurb": "Carries a parcel to your door and comes back for another.",
    "environment": "earth",
    "model": "models/delivery-quad.glb",
    "spec": {
      "span_m": 0.8,
      "length_m": 0.8,
      "empty_mass_kg": 3,
      "mtow_kg": 8,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.33,
      "motor_kv": 400,
      "battery_wh": 177,
      "battery_cells": 6,
      "payload_kg": 2.5,
      "cruise_kmh": 40,
      "max_speed_kmh": 60,
      "endurance_h": 0.5,
      "ceiling_m": 120
    },
    "axes": {
      "span": 1,
      "length": 2,
      "vertical": 0
    },
    "aftSign": 1,
    "scaleToMetres": 0.01377918184859393,
    "modelExtent": [
      33.31809997558594,
      58.058599472045906,
      52.500000000000014
    ],
    "origin": [
      -0.03194999694824219,
      -17.216599464416507,
      -7.956699371337892
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Object_3",
        "group": "Object_3",
        "role": "arm",
        "side": "left",
        "center": [
          0,
          17.2166,
          0.5823
        ],
        "size": [
          33.3181,
          20.472,
          43.6962
        ],
        "swappable": false
      },
      {
        "node": "Object_2",
        "group": "Object_2",
        "role": "rotor",
        "side": "right",
        "center": [
          0.00885,
          -7.77266,
          0
        ],
        "size": [
          27.4714,
          42.51329,
          52.5
        ],
        "swappable": true
      },
      {
        "node": "Object_4",
        "group": "Object_4",
        "role": "arm",
        "side": "left",
        "center": [
          0.03175,
          17.26565,
          -4.98295
        ],
        "size": [
          32.1374,
          23.5273,
          25.7037
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "Futuristic Delivery Drone",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/futuristic-delivery-drone-48d0997629ee4cc9836775a523651017"
    }
  },
  {
    "id": "iris",
    "name": "3DR Iris quadcopter",
    "family": "hobby",
    "blurb": "The ArduPilot reference airframe. Patient, forgiving, everywhere.",
    "environment": "earth",
    "model": "models/iris.glb",
    "spec": {
      "span_m": 0.55,
      "length_m": 0.55,
      "empty_mass_kg": 1,
      "mtow_kg": 1.5,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.254,
      "motor_kv": 920,
      "battery_wh": 74,
      "battery_cells": 4,
      "payload_kg": 0.4,
      "cruise_kmh": 30,
      "max_speed_kmh": 60,
      "endurance_h": 0.25,
      "ceiling_m": 500
    },
    "axes": {
      "span": 0,
      "length": 1,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 1.0548219652492836,
    "modelExtent": [
      0.5214150047302246,
      0.4776493012905121,
      0.11353644728660583
    ],
    "origin": [
      -0.002567201852798462,
      0.0017189383506774902,
      -0.010136798024177551
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          -0.00404,
          0,
          0
        ],
        "size": [
          0.29937,
          0.47765,
          0.11354
        ],
        "swappable": false
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.12813,
          -0.20162,
          0.03303
        ],
        "size": [
          0.25768,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.13187,
          0.21838,
          0.03303
        ],
        "size": [
          0.25768,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.13184,
          0.19785,
          0.033
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.12816,
          -0.22215,
          0.033
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Open Robotics",
      "license": "CC0-1.0",
      "licenseName": "CC0 1.0 (public domain dedication)",
      "url": "https://app.gazebosim.org/OpenRobotics/fuel/models/Iris%20with%20Standoffs"
    }
  },
  {
    "id": "x3-uav",
    "name": "X3 research quadcopter",
    "family": "hobby",
    "blurb": "Small open-source research quad. Plain, and useful for it.",
    "environment": "earth",
    "model": "models/x3-uav.glb",
    "spec": {
      "span_m": 0.47,
      "length_m": 0.22,
      "empty_mass_kg": 1,
      "mtow_kg": 1.5,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.2,
      "motor_kv": 1000,
      "battery_wh": 74,
      "battery_cells": 4,
      "payload_kg": 0.3,
      "cruise_kmh": 30,
      "max_speed_kmh": 55,
      "endurance_h": 0.22,
      "ceiling_m": 400
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": 1,
    "scaleToMetres": 0.7339105703361966,
    "modelExtent": [
      0.2995239943265915,
      0.6404050016403198,
      0.16268861220743291
    ],
    "origin": [
      -0.0066119953989982605,
      -0.00008449703454971313,
      0.028191305331717098
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.0018,
          -0.02197
        ],
        "size": [
          0.29952,
          0.4778,
          0.11875
        ],
        "swappable": false
      },
      {
        "node": "base_link__5",
        "group": "base_link",
        "role": "body",
        "side": "right",
        "center": [
          -0.02203,
          -0.07086,
          0.02095
        ],
        "size": [
          0.07984,
          0.06239,
          0.05013
        ],
        "swappable": false
      },
      {
        "node": "base_link__3",
        "group": "base_link",
        "role": "body",
        "side": "left",
        "center": [
          -0.02205,
          0.07108,
          0.02095
        ],
        "size": [
          0.07987,
          0.06248,
          0.05013
        ],
        "swappable": false
      },
      {
        "node": "base_link__2",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          -0.00281,
          0.00013,
          0.05248
        ],
        "size": [
          0.07733,
          0.045,
          0.05773
        ],
        "swappable": false
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.12329,
          0.20009,
          -0.012
        ],
        "size": [
          0.02506,
          0.20059,
          0.01682
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.13671,
          -0.21991,
          -0.012
        ],
        "size": [
          0.02506,
          0.20059,
          0.01682
        ],
        "swappable": true
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.12316,
          -0.19992,
          -0.01168
        ],
        "size": [
          0.02418,
          0.20024,
          0.01589
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.13684,
          0.22008,
          -0.01168
        ],
        "size": [
          0.02418,
          0.20024,
          0.01589
        ],
        "swappable": true
      },
      {
        "node": "base_link__6",
        "group": "base_link",
        "role": "body",
        "side": "right",
        "center": [
          -0.07355,
          -0.0402,
          0.01274
        ],
        "size": [
          0.03717,
          0.03117,
          0.03782
        ],
        "swappable": false
      },
      {
        "node": "base_link__4",
        "group": "base_link",
        "role": "body",
        "side": "left",
        "center": [
          -0.07371,
          0.0424,
          0.01274
        ],
        "size": [
          0.03797,
          0.03093,
          0.03782
        ],
        "swappable": false
      },
      {
        "node": "base_link__1",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          -0.06339,
          0.00008,
          0.04788
        ],
        "size": [
          0.036,
          0.04156,
          0.02205
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "Open Robotics",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://app.gazebosim.org/OpenRobotics/fuel/models/X3%20UAV%20Config%201"
    }
  },
  {
    "id": "m100",
    "name": "M100 research quadcopter",
    "family": "consumer",
    "blurb": "Carries a sensor stack for a living. The workhorse of field robotics.",
    "environment": "earth",
    "model": "models/m100.glb",
    "spec": {
      "span_m": 0.65,
      "length_m": 0.65,
      "empty_mass_kg": 2.4,
      "mtow_kg": 3.6,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.33,
      "motor_kv": 350,
      "battery_wh": 99,
      "battery_cells": 6,
      "payload_kg": 1,
      "cruise_kmh": 30,
      "max_speed_kmh": 65,
      "endurance_h": 0.3,
      "ceiling_m": 500
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": 1,
    "scaleToMetres": 0.8088274375330485,
    "modelExtent": [
      0.5115038468134889,
      0.803632480597496,
      0.23469997942447662
    ],
    "origin": [
      0.0005615211373810325,
      0.000013999640941619873,
      -0.06790000945329666
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          -0.00056,
          -0.00001,
          0
        ],
        "size": [
          0.51038,
          0.51038,
          0.2347
        ],
        "swappable": false
      },
      {
        "node": "base_link__2",
        "group": "base_link",
        "role": "body",
        "side": "right",
        "center": [
          0.2476,
          -0.24787,
          0.05034
        ],
        "size": [
          0.0163,
          0.0163,
          0.02043
        ],
        "swappable": false
      },
      {
        "node": "base_link__1",
        "group": "base_link",
        "role": "body",
        "side": "left",
        "center": [
          0.2476,
          0.24784,
          0.05034
        ],
        "size": [
          0.0163,
          0.0163,
          0.02043
        ],
        "swappable": false
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.22668,
          0.2263,
          0.09398
        ],
        "size": [
          0.04386,
          0.35103,
          0.02943
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.22592,
          -0.2263,
          0.09398
        ],
        "size": [
          0.04386,
          0.35103,
          0.02943
        ],
        "swappable": true
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.22647,
          -0.22631,
          0.09455
        ],
        "size": [
          0.04232,
          0.35041,
          0.0278
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.22613,
          0.22629,
          0.09455
        ],
        "size": [
          0.04232,
          0.35041,
          0.0278
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Open Robotics",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://app.gazebosim.org/OpenRobotics/fuel/models/CERBERUS_M100_SENSOR_CONFIG_1"
    }
  },
  {
    "id": "cessna-172",
    "name": "Cessna C-172",
    "family": "experimental",
    "blurb": "Not a drone at all. Strip the pilot out and see what it could carry.",
    "environment": "earth",
    "model": "models/cessna-172.glb",
    "spec": {
      "span_m": 11,
      "length_m": 8.28,
      "wing_area_m2": 16.2,
      "empty_mass_kg": 767,
      "mtow_kg": 1111,
      "powertrain": "fuel",
      "fuel_capacity_kg": 160,
      "engine": "Lycoming IO-360 piston",
      "shaft_power_kw": 134,
      "sfc_kg_per_kwh": 0.31,
      "prop_diameter_m": 1.93,
      "prop_blades": 2,
      "payload_kg": 344,
      "cruise_kmh": 226,
      "max_speed_kmh": 302,
      "endurance_h": 5,
      "ceiling_m": 4100
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.025325054979281572,
    "modelExtent": [
      315.6429977416992,
      434.3524627685547,
      131.46205474853517
    ],
    "origin": [
      -105.04346084594727,
      0.19594573974609375,
      23.39501022338867
    ],
    "cuts": {
      "wing": {
        "axis": 1,
        "axisName": "span",
        "keep": 21.717623,
        "origin": 0.195946,
        "bandLength": [
          0,
          132.570059
        ],
        "bandVertical": [
          6.573103,
          65.731027
        ]
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "body",
        "group": "body",
        "role": "body",
        "side": "center",
        "center": [
          7.61455,
          0,
          14.11974
        ],
        "size": [
          300.4139,
          434.35246,
          103.22258
        ],
        "swappable": false
      },
      {
        "node": "propeller",
        "group": "propeller",
        "role": "rotor",
        "side": "center",
        "center": [
          98.16997,
          -0.24374,
          -22.32224
        ],
        "size": [
          17.40726,
          10.92599,
          86.81758
        ],
        "swappable": true
      },
      {
        "node": "rear_right_wheel",
        "group": "rear_right_wheel",
        "role": "gear",
        "side": "right",
        "center": [
          65.4299,
          -50.37024,
          -33.35492
        ],
        "size": [
          18.17239,
          6.20937,
          19.09811
        ],
        "swappable": true
      },
      {
        "node": "rear_left_wheel",
        "group": "rear_left_wheel",
        "role": "gear",
        "side": "left",
        "center": [
          65.60561,
          50.30047,
          -33.35492
        ],
        "size": [
          18.17239,
          6.20937,
          19.09811
        ],
        "swappable": true
      },
      {
        "node": "front_wheel",
        "group": "front_wheel",
        "role": "gear",
        "side": "center",
        "center": [
          133.05698,
          -0.11403,
          -35.40391
        ],
        "size": [
          13.7642,
          3.80664,
          14.38157
        ],
        "swappable": true
      },
      {
        "node": "rudder",
        "group": "rudder",
        "role": "tail",
        "side": "center",
        "center": [
          -135.86164,
          0.22308,
          26.06572
        ],
        "size": [
          43.91972,
          3.40398,
          71.13465
        ],
        "swappable": true
      },
      {
        "node": "elevators",
        "group": "elevators",
        "role": "tail",
        "side": "center",
        "center": [
          -124.36039,
          0.25169,
          -0.76443
        ],
        "size": [
          22.35565,
          117.78492,
          2.78353
        ],
        "swappable": true
      },
      {
        "node": "right_aileron",
        "group": "right_aileron",
        "role": "wing",
        "side": "right",
        "center": [
          38.7819,
          -145.38971,
          34.95755
        ],
        "size": [
          21.34143,
          88.22234,
          7.88665
        ],
        "swappable": true
      },
      {
        "node": "left_aileron",
        "group": "left_aileron",
        "role": "wing",
        "side": "left",
        "center": [
          39.28938,
          145.44972,
          34.95755
        ],
        "size": [
          21.6487,
          88.14519,
          7.88665
        ],
        "swappable": true
      },
      {
        "node": "right_flap",
        "group": "right_flap",
        "role": "wing",
        "side": "right",
        "center": [
          35.03991,
          -61.78665,
          32.40598
        ],
        "size": [
          15.18174,
          79.09987,
          8.50523
        ],
        "swappable": true
      },
      {
        "node": "left_flap",
        "group": "left_flap",
        "role": "wing",
        "side": "left",
        "center": [
          35.23896,
          61.89976,
          32.25134
        ],
        "size": [
          15.21548,
          79.09853,
          8.35059
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Open Robotics",
      "license": "CC0-1.0",
      "licenseName": "CC0 1.0 (public domain dedication)",
      "url": "https://app.gazebosim.org/OpenRobotics/fuel/models/Cessna%20C-172"
    }
  },
  {
    "id": "rq11-raven",
    "name": "RQ-11B Raven",
    "family": "military",
    "blurb": "Hand-thrown, lands by breaking apart on impact. The most-produced military drone there is.",
    "environment": "earth",
    "model": "models/rq11-raven.glb",
    "spec": {
      "span_m": 1.37,
      "length_m": 0.91,
      "wing_area_m2": 0.14,
      "empty_mass_kg": 1.7,
      "mtow_kg": 1.9,
      "powertrain": "electric",
      "rotors": 1,
      "rotor_diameter_m": 0.19,
      "battery_wh": 100,
      "battery_cells": 4,
      "payload_kg": 0.2,
      "cruise_kmh": 50,
      "max_speed_kmh": 81,
      "endurance_h": 1.5,
      "ceiling_m": 4267
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 5.482477175544917,
    "modelExtent": [
      0.21849538314725336,
      0.06276221015835828,
      0.2498870412285542
    ],
    "origin": [
      0.00006419181680250574,
      -0.011545796732325923,
      0.0006542301031746758
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "DroneBody_high_lambert14_0",
        "group": "DroneBody_high_lambert14_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.00211,
          -0.00314,
          0.03646
        ],
        "size": [
          0.01695,
          0.04271,
          0.09627
        ],
        "swappable": false
      },
      {
        "node": "DroneBody_high_DroneMainBody1_0",
        "group": "DroneBody_high_DroneMainBody1_0",
        "role": "body",
        "side": "center",
        "center": [
          0.00029,
          -0.00373,
          -0.0022
        ],
        "size": [
          0.0212,
          0.0439,
          0.19974
        ],
        "swappable": false
      },
      {
        "node": "CameraHoodPiece_high_lambert14_0",
        "group": "CameraHoodPiece_high_lambert14_0",
        "role": "body",
        "side": "left",
        "center": [
          0,
          -0.01111,
          0.11127
        ],
        "size": [
          0.02178,
          0.02913,
          0.02735
        ],
        "swappable": false
      },
      {
        "node": "VentPiece_high_VentPiece1_0",
        "group": "VentPiece_high_VentPiece1_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.01041,
          -0.01455,
          0.073
        ],
        "size": [
          0.0005,
          0.01188,
          0.00623
        ],
        "swappable": false
      },
      {
        "node": "TailFin_high_WingPieces1_0",
        "group": "TailFin_high_WingPieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0,
          0.0004,
          -0.08352
        ],
        "size": [
          0.00279,
          0.04424,
          0.03703
        ],
        "swappable": true
      },
      {
        "node": "Wings_high_WingPieces1_0",
        "group": "Wings_high_WingPieces1_0",
        "role": "wing",
        "side": "left",
        "center": [
          0,
          0.02489,
          0.05287
        ],
        "size": [
          0.2185,
          0.01299,
          0.04144
        ],
        "swappable": true
      },
      {
        "node": "TopTailFinPiece_1_high_HingePieces1_0",
        "group": "TopTailFinPiece_1_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00216,
          0.0039,
          -0.08231
        ],
        "size": [
          0.00397,
          0.00139,
          0.00355
        ],
        "swappable": true
      },
      {
        "node": "HeadCameraPod_high_CameraPod1_0",
        "group": "HeadCameraPod_high_CameraPod1_0",
        "role": "tail",
        "side": "left",
        "center": [
          0,
          -0.01577,
          0.11512
        ],
        "size": [
          0.01673,
          0.01705,
          0.01705
        ],
        "swappable": true
      },
      {
        "node": "TopTailFinPiece_4_high1_HingePieces1_0",
        "group": "TopTailFinPiece_4_high1_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00311,
          0.0039,
          -0.09209
        ],
        "size": [
          0.00127,
          0.00169,
          0.00492
        ],
        "swappable": true
      },
      {
        "node": "BottomTailFinPiece_2_high_HingePieces1_0",
        "group": "BottomTailFinPiece_2_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00382,
          -0.01711,
          -0.08274
        ],
        "size": [
          0.00172,
          0.00238,
          0.00592
        ],
        "swappable": true
      },
      {
        "node": "TopTailFinPiece_2_high1_HingePieces1_0",
        "group": "TopTailFinPiece_2_high1_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.0031,
          0.0039,
          -0.08509
        ],
        "size": [
          0.00125,
          0.00236,
          0.00558
        ],
        "swappable": true
      },
      {
        "node": "PropellorBlades_high_Propeller2_0",
        "group": "PropellorBlades_high_Propeller2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.00005,
          0.01124,
          0.02139
        ],
        "size": [
          0.00618,
          0.03556,
          0.00492
        ],
        "swappable": true
      },
      {
        "node": "RightCameraSupport_high_CameraSupport1_0",
        "group": "RightCameraSupport_high_CameraSupport1_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.00903,
          -0.01392,
          0.11512
        ],
        "size": [
          0.00138,
          0.01153,
          0.00783
        ],
        "swappable": false
      },
      {
        "node": "LeftCameraSupport_high_CameraSupport1_0",
        "group": "LeftCameraSupport_high_CameraSupport1_0",
        "role": "body",
        "side": "left",
        "center": [
          0.00905,
          -0.01392,
          0.11512
        ],
        "size": [
          0.00138,
          0.01153,
          0.00783
        ],
        "swappable": false
      },
      {
        "node": "SecondaryCameraBolts_CameraPieces1_0",
        "group": "SecondaryCameraBolts_CameraPieces1_0",
        "role": "payload",
        "side": "left",
        "center": [
          0.00148,
          -0.02143,
          0.11837
        ],
        "size": [
          0.00243,
          0.00311,
          0.00044
        ],
        "swappable": true
      },
      {
        "node": "BottomTailFinPiece_1_high_HingePieces1_0",
        "group": "BottomTailFinPiece_1_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00182,
          -0.01716,
          -0.0825
        ],
        "size": [
          0.00614,
          0.002,
          0.00633
        ],
        "swappable": true
      },
      {
        "node": "PropellorBase_high_Propeller2_0",
        "group": "PropellorBase_high_Propeller2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0,
          0.0114,
          0.02055
        ],
        "size": [
          0.01012,
          0.01033,
          0.00964
        ],
        "swappable": true
      },
      {
        "node": "WingBolt_high_lambert14_0",
        "group": "WingBolt_high_lambert14_0",
        "role": "wing",
        "side": "left",
        "center": [
          0.00001,
          0.01878,
          0.03497
        ],
        "size": [
          0.00292,
          0.00099,
          0.00293
        ],
        "swappable": true
      },
      {
        "node": "BottomTailFinPiece_3_high_HingePieces1_0",
        "group": "BottomTailFinPiece_3_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00179,
          -0.01965,
          -0.09463
        ],
        "size": [
          0.00387,
          0.00569,
          0.01809
        ],
        "swappable": true
      },
      {
        "node": "DroneBody_high_DroneMainBody_0",
        "group": "DroneBody_high_DroneMainBody_0",
        "role": "body",
        "side": "left",
        "center": [
          0.00001,
          0.01826,
          0.04972
        ],
        "size": [
          0.01764,
          0.00111,
          0.04089
        ],
        "swappable": false
      },
      {
        "node": "RightCameraSupportBolts_CameraPieces1_0",
        "group": "RightCameraSupportBolts_CameraPieces1_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.00939,
          -0.01594,
          0.11518
        ],
        "size": [
          0.00068,
          0.0036,
          0.00358
        ],
        "swappable": false
      },
      {
        "node": "LeftCameraSupportBolts_CameraPieces1_0",
        "group": "LeftCameraSupportBolts_CameraPieces1_0",
        "role": "body",
        "side": "left",
        "center": [
          0.0094,
          -0.01594,
          0.11518
        ],
        "size": [
          0.00068,
          0.0036,
          0.00358
        ],
        "swappable": false
      },
      {
        "node": "PrimaryCameraLens_high_CameraPieces1_0",
        "group": "PrimaryCameraLens_high_CameraPieces1_0",
        "role": "payload",
        "side": "left",
        "center": [
          -0.00259,
          -0.02128,
          0.11844
        ],
        "size": [
          0.00459,
          0.00461,
          0.00075
        ],
        "swappable": true
      },
      {
        "node": "SecondaryCamera_high_CameraPieces1_0",
        "group": "SecondaryCamera_high_CameraPieces1_0",
        "role": "payload",
        "side": "left",
        "center": [
          0.00152,
          -0.02136,
          0.11841
        ],
        "size": [
          0.0017,
          0.00171,
          0.00023
        ],
        "swappable": true
      },
      {
        "node": "TopTailPieceHinge_high_HingePieces1_0",
        "group": "TopTailPieceHinge_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00234,
          0.0039,
          -0.09623
        ],
        "size": [
          0.00296,
          0.00125,
          0.0061
        ],
        "swappable": true
      },
      {
        "node": "TailWing_high_WingPieces1_0",
        "group": "TailWing_high_WingPieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.00006,
          -0.01897,
          -0.11341
        ],
        "size": [
          0.07062,
          0.01266,
          0.02308
        ],
        "swappable": true
      },
      {
        "node": "TailEndAttachment_high_HingePieces1_0",
        "group": "TailEndAttachment_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00003,
          -0.02363,
          -0.10363
        ],
        "size": [
          0.0033,
          0.00293,
          0.00361
        ],
        "swappable": true
      },
      {
        "node": "Underside_high_Belly1_0",
        "group": "Underside_high_Belly1_0",
        "role": "motor",
        "side": "left",
        "center": [
          0,
          -0.0285,
          0.0729
        ],
        "size": [
          0.01635,
          0.00575,
          0.04716
        ],
        "swappable": false
      },
      {
        "node": "SmallestCameraLens1_CameraPieces1_0",
        "group": "SmallestCameraLens1_CameraPieces1_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.00364,
          -0.02285,
          0.11835
        ],
        "size": [
          0.00094,
          0.00091,
          0.00022
        ],
        "swappable": true
      },
      {
        "node": "TailEndAttachmentScrew_high_HingePieces1_0",
        "group": "TailEndAttachmentScrew_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0,
          -0.02389,
          -0.10377
        ],
        "size": [
          0.00552,
          0.00173,
          0.00169
        ],
        "swappable": true
      },
      {
        "node": "TopTailFinPiece_3_high_HingePieces1_0",
        "group": "TopTailFinPiece_3_high_HingePieces1_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.00315,
          0.00388,
          -0.0887
        ],
        "size": [
          0.00066,
          0.00066,
          0.00197
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "IV Aulls",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/rq-11-raven-uav-high-poly-model-04d3c684f459489eabc5deb498bd6919"
    }
  },
  {
    "id": "phantom-4",
    "name": "DJI Phantom 4 Pro",
    "family": "consumer",
    "blurb": "The white quadcopter that made 'drone' a household word.",
    "environment": "earth",
    "model": "models/phantom-4.glb",
    "spec": {
      "span_m": 0.35,
      "length_m": 0.35,
      "empty_mass_kg": 1.388,
      "mtow_kg": 1.6,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.239,
      "battery_wh": 89.2,
      "battery_cells": 4,
      "payload_kg": 0.2,
      "cruise_kmh": 50,
      "max_speed_kmh": 72,
      "endurance_h": 0.5,
      "ceiling_m": 6000
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 1.6270824709772593,
    "modelExtent": [
      0.2151089488351397,
      0.0644370636842311,
      0.1407109498690306
    ],
    "origin": [
      0.03426651695686747,
      0.05668357722423424,
      0.06206487424967868
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "polySurface116_Main_White_0",
        "group": "polySurface116_Main_White_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.03462,
          0.01159,
          -0.00139
        ],
        "size": [
          0.09614,
          0.02387,
          0.0943
        ],
        "swappable": true
      },
      {
        "node": "pCylinder116_White2_0",
        "group": "pCylinder116_White2_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.03486,
          0.0062,
          0.01854
        ],
        "size": [
          0.00809,
          0.00254,
          0.00463
        ],
        "swappable": false
      },
      {
        "node": "pCylinder115_White2_0",
        "group": "pCylinder115_White2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.03474,
          0.0207,
          0.01565
        ],
        "size": [
          0.00771,
          0.00193,
          0.00447
        ],
        "swappable": true
      },
      {
        "node": "polySurface122_Metall_1",
        "group": "polySurface122_Metall_1",
        "role": "arm",
        "side": "center",
        "center": [
          -0.00581,
          0.0196,
          -0.04213
        ],
        "size": [
          0.00956,
          0.01306,
          0.00956
        ],
        "swappable": false
      },
      {
        "node": "polySurface122_Metall_0",
        "group": "polySurface122_Metall_0",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00656,
          0.0196,
          0.03938
        ],
        "size": [
          0.00956,
          0.01306,
          0.00956
        ],
        "swappable": false
      },
      {
        "node": "polySurface151_Metall_0",
        "group": "polySurface151_Metall_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.0759,
          0.01948,
          -0.04268
        ],
        "size": [
          0.00956,
          0.0133,
          0.00956
        ],
        "swappable": false
      },
      {
        "node": "polySurface145_Metall_0",
        "group": "polySurface145_Metall_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.07589,
          0.01948,
          0.03938
        ],
        "size": [
          0.00956,
          0.0133,
          0.00956
        ],
        "swappable": false
      },
      {
        "node": "polySurface133_White3_0",
        "group": "polySurface133_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.05454,
          -0.01086,
          -0.00155
        ],
        "size": [
          0.01597,
          0.04186,
          0.05225
        ],
        "swappable": true
      },
      {
        "node": "polySurface108_White3_0",
        "group": "polySurface108_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.01479,
          -0.01086,
          -0.00155
        ],
        "size": [
          0.01597,
          0.04186,
          0.05225
        ],
        "swappable": true
      },
      {
        "node": "polySurface87_Main_White_0",
        "group": "polySurface87_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04188,
          -0.01868,
          -0.0068
        ],
        "size": [
          0.0081,
          0.00547,
          0.00774
        ],
        "swappable": true
      },
      {
        "node": "polySurface100_White2_0",
        "group": "polySurface100_White2_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.0352,
          -0.00501,
          -0.00981
        ],
        "size": [
          0.01215,
          0.0062,
          0.01215
        ],
        "swappable": true
      },
      {
        "node": "polySurface105_Main_White_0",
        "group": "polySurface105_Main_White_0",
        "role": "body",
        "side": "left",
        "center": [
          0.02955,
          -0.00034,
          0.00704
        ],
        "size": [
          0.00887,
          0.00401,
          0.00887
        ],
        "swappable": false
      },
      {
        "node": "polySurface130_Main_White_0",
        "group": "polySurface130_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.03978,
          -0.00034,
          0.00704
        ],
        "size": [
          0.00887,
          0.00401,
          0.00887
        ],
        "swappable": false
      },
      {
        "node": "pCylinder16_Black1_0",
        "group": "pCylinder16_Black1_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03461,
          -0.01854,
          -0.0197
        ],
        "size": [
          0.00974,
          0.00943,
          0.00553
        ],
        "swappable": true
      },
      {
        "node": "polySurface19_White2_0",
        "group": "polySurface19_White2_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.0353,
          -0.01458,
          -0.00044
        ],
        "size": [
          0.0065,
          0.01475,
          0.00465
        ],
        "swappable": true
      },
      {
        "node": "polySurface96_Main_White_0",
        "group": "polySurface96_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02902,
          -0.01868,
          -0.0068
        ],
        "size": [
          0.00721,
          0.00542,
          0.00774
        ],
        "swappable": true
      },
      {
        "node": "polySurface58_White2_0",
        "group": "polySurface58_White2_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03461,
          -0.01847,
          -0.01207
        ],
        "size": [
          0.01397,
          0.01123,
          0.00714
        ],
        "swappable": true
      },
      {
        "node": "polySurface84_Green_0",
        "group": "polySurface84_Green_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.03435,
          0.01436,
          0.02318
        ],
        "size": [
          0.01732,
          0.0042,
          0.00081
        ],
        "swappable": false
      },
      {
        "node": "pCylinder19_Main_White_0",
        "group": "pCylinder19_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.0278,
          -0.01866,
          -0.01314
        ],
        "size": [
          0.00253,
          0.0074,
          0.0074
        ],
        "swappable": true
      },
      {
        "node": "polySurface84_Main_White_0",
        "group": "polySurface84_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.03418,
          0.01221,
          0.01623
        ],
        "size": [
          0.02964,
          0.01976,
          0.01561
        ],
        "swappable": false
      },
      {
        "node": "polySurface146_Main_White_0",
        "group": "polySurface146_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.07506,
          0.02882,
          -0.04204
        ],
        "size": [
          0.00829,
          0.00681,
          0.00829
        ],
        "swappable": false
      },
      {
        "node": "polySurface144_Main_White_0",
        "group": "polySurface144_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.07632,
          0.02882,
          0.03963
        ],
        "size": [
          0.00829,
          0.00681,
          0.00829
        ],
        "swappable": false
      },
      {
        "node": "polySurface123_Main_White_0",
        "group": "polySurface123_Main_White_0",
        "role": "arm",
        "side": "center",
        "center": [
          -0.00574,
          0.02882,
          -0.04204
        ],
        "size": [
          0.00829,
          0.00681,
          0.00829
        ],
        "swappable": false
      },
      {
        "node": "polySurface121_Main_White_0",
        "group": "polySurface121_Main_White_0",
        "role": "arm",
        "side": "right",
        "center": [
          -0.007,
          0.02882,
          0.03963
        ],
        "size": [
          0.00829,
          0.00681,
          0.00829
        ],
        "swappable": false
      },
      {
        "node": "polySurface154_White2_0",
        "group": "polySurface154_White2_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00621,
          0.02898,
          0.04
        ],
        "size": [
          0.05717,
          0.00226,
          0.06071
        ],
        "swappable": true
      },
      {
        "node": "polySurface153_White2_0",
        "group": "polySurface153_White2_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00507,
          0.02898,
          -0.04235
        ],
        "size": [
          0.0617,
          0.00226,
          0.056
        ],
        "swappable": true
      },
      {
        "node": "polySurface152_White2_0",
        "group": "polySurface152_White2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.07507,
          0.02898,
          -0.04172
        ],
        "size": [
          0.06497,
          0.00226,
          0.05266
        ],
        "swappable": true
      },
      {
        "node": "polySurface147_White2_0",
        "group": "polySurface147_White2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.0756,
          0.02898,
          0.04034
        ],
        "size": [
          0.05963,
          0.00226,
          0.05838
        ],
        "swappable": true
      },
      {
        "node": "pCylinder16_Main_White_0",
        "group": "pCylinder16_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03461,
          -0.01854,
          -0.01884
        ],
        "size": [
          0.01049,
          0.01016,
          0.00726
        ],
        "swappable": true
      },
      {
        "node": "pCylinder13_Main_White_0",
        "group": "pCylinder13_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03518,
          -0.01871,
          -0.00254
        ],
        "size": [
          0.00658,
          0.00692,
          0.00253
        ],
        "swappable": true
      },
      {
        "node": "pCylinder14_White3_0",
        "group": "pCylinder14_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04323,
          -0.01866,
          -0.01314
        ],
        "size": [
          0.00622,
          0.0074,
          0.0074
        ],
        "swappable": true
      },
      {
        "node": "pCube10_Main_White_0",
        "group": "pCube10_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03522,
          -0.0063,
          -0.00344
        ],
        "size": [
          0.00342,
          0.00482,
          0.00587
        ],
        "swappable": true
      },
      {
        "node": "pCylinder19_White3_0",
        "group": "pCylinder19_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02646,
          -0.01866,
          -0.01314
        ],
        "size": [
          0.00242,
          0.0074,
          0.0074
        ],
        "swappable": true
      },
      {
        "node": "pTorus1_lambert1_0",
        "group": "pTorus1_lambert1_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.04044,
          0.01236,
          0.02067
        ],
        "size": [
          0.00438,
          0.00438,
          0.00041
        ],
        "swappable": false
      },
      {
        "node": "polySurface131_Main_White_0",
        "group": "polySurface131_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.04602,
          0.00101,
          0.01027
        ],
        "size": [
          0.00308,
          0.00295,
          0.00308
        ],
        "swappable": false
      },
      {
        "node": "polySurface106_Main_White_0",
        "group": "polySurface106_Main_White_0",
        "role": "body",
        "side": "left",
        "center": [
          0.02331,
          0.00101,
          0.01027
        ],
        "size": [
          0.00308,
          0.00295,
          0.00308
        ],
        "swappable": false
      },
      {
        "node": "polySurface146_Black1_0",
        "group": "polySurface146_Black1_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.07506,
          0.03062,
          -0.04204
        ],
        "size": [
          0.00636,
          0.0003,
          0.00636
        ],
        "swappable": true
      },
      {
        "node": "polySurface144_Black1_0",
        "group": "polySurface144_Black1_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.07632,
          0.03062,
          0.03963
        ],
        "size": [
          0.00636,
          0.0003,
          0.00636
        ],
        "swappable": true
      },
      {
        "node": "polySurface123_Black1_0",
        "group": "polySurface123_Black1_0",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00574,
          0.03062,
          -0.04204
        ],
        "size": [
          0.00636,
          0.0003,
          0.00636
        ],
        "swappable": true
      },
      {
        "node": "polySurface121_Black1_0",
        "group": "polySurface121_Black1_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.007,
          0.03062,
          0.03963
        ],
        "size": [
          0.00636,
          0.0003,
          0.00636
        ],
        "swappable": true
      },
      {
        "node": "polySurface101_Main_White_0",
        "group": "polySurface101_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02751,
          -0.01637,
          -0.01036
        ],
        "size": [
          0.00022,
          0.0032,
          0.00316
        ],
        "swappable": true
      },
      {
        "node": "polySurface143_White3_0",
        "group": "polySurface143_White3_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.05579,
          0.00169,
          0.0225
        ],
        "size": [
          0.00542,
          0.00542,
          0.0052
        ],
        "swappable": false
      },
      {
        "node": "polySurface142_White3_0",
        "group": "polySurface142_White3_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.05579,
          0.00169,
          -0.02529
        ],
        "size": [
          0.00542,
          0.00542,
          0.0052
        ],
        "swappable": false
      },
      {
        "node": "polySurface120_White3_0",
        "group": "polySurface120_White3_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.01354,
          0.00169,
          0.0225
        ],
        "size": [
          0.00542,
          0.00542,
          0.0052
        ],
        "swappable": false
      },
      {
        "node": "polySurface119_White3_0",
        "group": "polySurface119_White3_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.01354,
          0.00169,
          -0.02529
        ],
        "size": [
          0.00542,
          0.00542,
          0.0052
        ],
        "swappable": false
      },
      {
        "node": "pPipe1_White3_0",
        "group": "pPipe1_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04319,
          -0.01866,
          -0.01336
        ],
        "size": [
          0.00315,
          0.00748,
          0.0072
        ],
        "swappable": true
      },
      {
        "node": "polySurface122_Black_1",
        "group": "polySurface122_Black_1",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00581,
          0.01863,
          -0.04213
        ],
        "size": [
          0.00836,
          0.00125,
          0.00836
        ],
        "swappable": true
      },
      {
        "node": "polySurface122_Black_0",
        "group": "polySurface122_Black_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.00656,
          0.01863,
          0.03938
        ],
        "size": [
          0.00836,
          0.00125,
          0.00836
        ],
        "swappable": true
      },
      {
        "node": "polySurface151_Black_0",
        "group": "polySurface151_Black_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.0759,
          0.01863,
          -0.04268
        ],
        "size": [
          0.00836,
          0.00125,
          0.00836
        ],
        "swappable": true
      },
      {
        "node": "polySurface145_Black_0",
        "group": "polySurface145_Black_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.07589,
          0.01863,
          0.03938
        ],
        "size": [
          0.00836,
          0.00125,
          0.00836
        ],
        "swappable": true
      },
      {
        "node": "polySurface135_Main_White_0",
        "group": "polySurface135_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.04967,
          0.0022,
          -0.01892
        ],
        "size": [
          0.00218,
          0.00226,
          0.00218
        ],
        "swappable": false
      },
      {
        "node": "polySurface134_Main_White_0",
        "group": "polySurface134_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.0515,
          0.00288,
          0.01511
        ],
        "size": [
          0.00208,
          0.00218,
          0.00222
        ],
        "swappable": false
      },
      {
        "node": "polySurface110_Main_White_0",
        "group": "polySurface110_Main_White_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01966,
          0.0022,
          -0.01892
        ],
        "size": [
          0.00218,
          0.00226,
          0.00218
        ],
        "swappable": false
      },
      {
        "node": "polySurface109_Main_White_0",
        "group": "polySurface109_Main_White_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01783,
          0.00288,
          0.01511
        ],
        "size": [
          0.00208,
          0.00218,
          0.00222
        ],
        "swappable": false
      },
      {
        "node": "polySurface112_Main_White_0",
        "group": "polySurface112_Main_White_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.03466,
          0.0101,
          0.01479
        ],
        "size": [
          0.01105,
          0.00369,
          0.00249
        ],
        "swappable": false
      },
      {
        "node": "polySurface150_Bolt_0",
        "group": "polySurface150_Bolt_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.05038,
          0.00505,
          -0.00452
        ],
        "size": [
          0.00107,
          0.00105,
          0.00101
        ],
        "swappable": false
      },
      {
        "node": "polySurface149_Bolt_0",
        "group": "polySurface149_Bolt_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.05234,
          0.00502,
          0.00677
        ],
        "size": [
          0.0012,
          0.00109,
          0.00121
        ],
        "swappable": false
      },
      {
        "node": "polySurface137_Bolt_0",
        "group": "polySurface137_Bolt_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.04325,
          0.00058,
          0.01327
        ],
        "size": [
          0.00102,
          0.00114,
          0.00114
        ],
        "swappable": false
      },
      {
        "node": "polySurface127_Bolt_0",
        "group": "polySurface127_Bolt_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01895,
          0.00505,
          -0.00452
        ],
        "size": [
          0.00107,
          0.00105,
          0.00101
        ],
        "swappable": false
      },
      {
        "node": "polySurface126_Bolt_0",
        "group": "polySurface126_Bolt_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01699,
          0.00502,
          0.00677
        ],
        "size": [
          0.0012,
          0.00109,
          0.00121
        ],
        "swappable": false
      },
      {
        "node": "polySurface113_Bolt_0",
        "group": "polySurface113_Bolt_0",
        "role": "body",
        "side": "left",
        "center": [
          0.02607,
          0.00058,
          0.01327
        ],
        "size": [
          0.00102,
          0.00114,
          0.00114
        ],
        "swappable": false
      },
      {
        "node": "polySurface94_Main_White_0",
        "group": "polySurface94_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03397,
          -0.01873,
          -0.00325
        ],
        "size": [
          0.00619,
          0.00276,
          0.00058
        ],
        "swappable": true
      },
      {
        "node": "polySurface90_Bolt_0",
        "group": "polySurface90_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03634,
          -0.01873,
          -0.00325
        ],
        "size": [
          0.00619,
          0.00276,
          0.00058
        ],
        "swappable": true
      },
      {
        "node": "pCylinder19_Metall_0",
        "group": "pCylinder19_Metall_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02505,
          -0.01866,
          -0.01314
        ],
        "size": [
          0.00039,
          0.00651,
          0.00651
        ],
        "swappable": true
      },
      {
        "node": "pSphere8_blinn4_0",
        "group": "pSphere8_blinn4_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.0346,
          -0.01853,
          -0.01882
        ],
        "size": [
          0.00452,
          0.00542,
          0.0012
        ],
        "swappable": true
      },
      {
        "node": "polySurface97_Bolt_0",
        "group": "polySurface97_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03157,
          -0.01864,
          -0.00314
        ],
        "size": [
          0.00057,
          0.00059,
          0.00039
        ],
        "swappable": true
      },
      {
        "node": "polySurface91_Main_White_0",
        "group": "polySurface91_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03874,
          -0.01882,
          -0.0032
        ],
        "size": [
          0.00057,
          0.00059,
          0.00039
        ],
        "swappable": true
      },
      {
        "node": "polySurface93_phong1_0",
        "group": "polySurface93_phong1_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.10727,
          -0.01994,
          -0.00486
        ],
        "size": [
          0.00057,
          0.00059,
          0.00039
        ],
        "swappable": true
      },
      {
        "node": "pCube14_Main_White_0",
        "group": "pCube14_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03546,
          -0.00959,
          -0.00401
        ],
        "size": [
          0.00042,
          0.00825,
          0.00432
        ],
        "swappable": true
      },
      {
        "node": "pCylinder40_Bolt_0",
        "group": "pCylinder40_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04013,
          -0.01412,
          -0.00897
        ],
        "size": [
          0.00108,
          0.00115,
          0.00111
        ],
        "swappable": true
      },
      {
        "node": "pCylinder42_Bolt_0",
        "group": "pCylinder42_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.029,
          -0.02274,
          -0.00897
        ],
        "size": [
          0.00108,
          0.00115,
          0.00111
        ],
        "swappable": true
      },
      {
        "node": "pCylinder37_Bolt_0",
        "group": "pCylinder37_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03773,
          -0.00828,
          0.00152
        ],
        "size": [
          0.00097,
          0.00103,
          0.00099
        ],
        "swappable": true
      },
      {
        "node": "pCylinder41_Bolt_0",
        "group": "pCylinder41_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04016,
          -0.02273,
          -0.00897
        ],
        "size": [
          0.00108,
          0.00115,
          0.00111
        ],
        "swappable": true
      },
      {
        "node": "pCylinder35_Bolt_0",
        "group": "pCylinder35_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03305,
          -0.01835,
          0.00152
        ],
        "size": [
          0.00097,
          0.00103,
          0.00099
        ],
        "swappable": true
      },
      {
        "node": "pCylinder38_Bolt_0",
        "group": "pCylinder38_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03305,
          -0.00828,
          0.00152
        ],
        "size": [
          0.00097,
          0.00103,
          0.00099
        ],
        "swappable": true
      },
      {
        "node": "pCylinder36_Bolt_0",
        "group": "pCylinder36_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03773,
          -0.01835,
          0.00152
        ],
        "size": [
          0.00097,
          0.00103,
          0.00099
        ],
        "swappable": true
      },
      {
        "node": "pCylinder130_Bolt_0",
        "group": "pCylinder130_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03343,
          -0.00774,
          -0.00763
        ],
        "size": [
          0.00075,
          0.00076,
          0.00078
        ],
        "swappable": true
      },
      {
        "node": "pCylinder126_Bolt_0",
        "group": "pCylinder126_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03687,
          -0.00774,
          -0.00763
        ],
        "size": [
          0.00075,
          0.00076,
          0.00078
        ],
        "swappable": true
      },
      {
        "node": "pCylinder124_Bolt_0",
        "group": "pCylinder124_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02762,
          -0.0156,
          -0.00953
        ],
        "size": [
          0.00049,
          0.00077,
          0.00075
        ],
        "swappable": true
      },
      {
        "node": "pCylinder44_Main_White_0",
        "group": "pCylinder44_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02601,
          -0.01896,
          -0.00813
        ],
        "size": [
          0.00061,
          0.00061,
          0.00058
        ],
        "swappable": true
      },
      {
        "node": "pCylinder45_Bolt_0",
        "group": "pCylinder45_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04515,
          -0.01817,
          -0.00823
        ],
        "size": [
          0.00074,
          0.00075,
          0.00069
        ],
        "swappable": true
      },
      {
        "node": "pCylinder46_Bolt_0",
        "group": "pCylinder46_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04515,
          -0.01914,
          -0.00823
        ],
        "size": [
          0.00074,
          0.00075,
          0.00069
        ],
        "swappable": true
      },
      {
        "node": "pCylinder43_Main_White_0",
        "group": "pCylinder43_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02601,
          -0.01811,
          -0.00813
        ],
        "size": [
          0.00061,
          0.00061,
          0.00058
        ],
        "swappable": true
      },
      {
        "node": "pCylinder39_Bolt_0",
        "group": "pCylinder39_Bolt_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02901,
          -0.01414,
          -0.00897
        ],
        "size": [
          0.00108,
          0.00112,
          0.00111
        ],
        "swappable": true
      },
      {
        "node": "pCylinder16_White3_0",
        "group": "pCylinder16_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03461,
          -0.01854,
          -0.01884
        ],
        "size": [
          0.01049,
          0.01016,
          0.00726
        ],
        "swappable": true
      },
      {
        "node": "pCylinder17_Main_White_0",
        "group": "pCylinder17_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.03514,
          -0.01863,
          -0.00202
        ],
        "size": [
          0.00606,
          0.00606,
          0.00283
        ],
        "swappable": true
      },
      {
        "node": "pCylinder18_Main_White_0",
        "group": "pCylinder18_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04164,
          -0.01836,
          -0.01249
        ],
        "size": [
          0.0069,
          0.00389,
          0.00402
        ],
        "swappable": true
      },
      {
        "node": "pCylinder47_White3_0",
        "group": "pCylinder47_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.04114,
          -0.01866,
          -0.01314
        ],
        "size": [
          0.00085,
          0.00797,
          0.00797
        ],
        "swappable": true
      },
      {
        "node": "pCylinder48_White3_0",
        "group": "pCylinder48_White3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.02812,
          -0.01866,
          -0.01314
        ],
        "size": [
          0.00084,
          0.00788,
          0.00788
        ],
        "swappable": true
      },
      {
        "node": "polySurface104_Red_1",
        "group": "polySurface104_Red_1",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.00581,
          0.01367,
          -0.04215
        ],
        "size": [
          0.00684,
          0.00172,
          0.00684
        ],
        "swappable": true
      },
      {
        "node": "polySurface104_Red_0",
        "group": "polySurface104_Red_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.00655,
          0.01367,
          0.03935
        ],
        "size": [
          0.00684,
          0.00172,
          0.00684
        ],
        "swappable": true
      },
      {
        "node": "polySurface136_Red_0",
        "group": "polySurface136_Red_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.07588,
          0.0132,
          -0.04272
        ],
        "size": [
          0.00512,
          0.00129,
          0.00512
        ],
        "swappable": true
      },
      {
        "node": "polySurface129_Red_0",
        "group": "polySurface129_Red_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.07588,
          0.0132,
          0.03935
        ],
        "size": [
          0.00512,
          0.00129,
          0.00512
        ],
        "swappable": true
      },
      {
        "node": "polySurface116_Grey_0",
        "group": "polySurface116_Grey_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.03462,
          0.0021,
          -0.0015
        ],
        "size": [
          0.03705,
          0.00947,
          0.04006
        ],
        "swappable": true
      },
      {
        "node": "polySurface107_Main_White_0",
        "group": "polySurface107_Main_White_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01637,
          0.01061,
          -0.01049
        ],
        "size": [
          0.00363,
          0.00476,
          0.00477
        ],
        "swappable": false
      },
      {
        "node": "polySurface138_Main_White_0",
        "group": "polySurface138_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.06094,
          -0.03168,
          -0.00143
        ],
        "size": [
          0.00107,
          0.00107,
          0.039
        ],
        "swappable": true
      },
      {
        "node": "polySurface114_Main_White_0",
        "group": "polySurface114_Main_White_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.00839,
          -0.03168,
          -0.00143
        ],
        "size": [
          0.00107,
          0.00107,
          0.039
        ],
        "swappable": true
      },
      {
        "node": "polySurface143_Hole_0",
        "group": "polySurface143_Hole_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.05579,
          0.00169,
          0.02452
        ],
        "size": [
          0.00289,
          0.00289,
          0.00041
        ],
        "swappable": false
      },
      {
        "node": "polySurface142_Hole_0",
        "group": "polySurface142_Hole_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.05579,
          0.00169,
          -0.02731
        ],
        "size": [
          0.00289,
          0.00289,
          0.00041
        ],
        "swappable": false
      },
      {
        "node": "polySurface131_Black_0",
        "group": "polySurface131_Black_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.04602,
          -0.00002,
          0.01017
        ],
        "size": [
          0.00225,
          0.00004,
          0.00205
        ],
        "swappable": true
      },
      {
        "node": "polySurface130_Black_0",
        "group": "polySurface130_Black_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.03978,
          -0.00177,
          0.00712
        ],
        "size": [
          0.00431,
          0,
          0.00431
        ],
        "swappable": true
      },
      {
        "node": "polySurface120_Hole_0",
        "group": "polySurface120_Hole_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.01354,
          0.00169,
          0.02452
        ],
        "size": [
          0.00289,
          0.00289,
          0.00041
        ],
        "swappable": false
      },
      {
        "node": "polySurface119_Hole_0",
        "group": "polySurface119_Hole_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.01354,
          0.00169,
          -0.02731
        ],
        "size": [
          0.00289,
          0.00289,
          0.00041
        ],
        "swappable": false
      },
      {
        "node": "polySurface106_Black1_0",
        "group": "polySurface106_Black1_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.02331,
          -0.00002,
          0.01017
        ],
        "size": [
          0.00225,
          0.00004,
          0.00205
        ],
        "swappable": true
      },
      {
        "node": "polySurface105_Black_0",
        "group": "polySurface105_Black_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.02955,
          -0.00177,
          0.00712
        ],
        "size": [
          0.00431,
          0,
          0.00431
        ],
        "swappable": true
      },
      {
        "node": "polySurface115_Black1_0",
        "group": "polySurface115_Black1_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01731,
          0.01067,
          0.00024
        ],
        "size": [
          0.00229,
          0.0038,
          0.01206
        ],
        "swappable": false
      },
      {
        "node": "polySurface107_Black1_0",
        "group": "polySurface107_Black1_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01552,
          0.01068,
          -0.01034
        ],
        "size": [
          0.00192,
          0.00369,
          0.00369
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "dimazzis",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/dji-phantom-4-a24ca9c170874ca1a81da2de21e7945c"
    }
  },
  {
    "id": "mavic-3",
    "name": "DJI Mavic 3",
    "family": "consumer",
    "blurb": "Folding arms, 46 minutes aloft, a Four Thirds sensor. The modern default.",
    "environment": "earth",
    "model": "models/mavic-3.glb",
    "spec": {
      "span_m": 0.3801,
      "length_m": 0.3475,
      "empty_mass_kg": 0.895,
      "mtow_kg": 1.05,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.239,
      "battery_wh": 77,
      "battery_cells": 4,
      "payload_kg": 0.1,
      "cruise_kmh": 50,
      "max_speed_kmh": 75.6,
      "endurance_h": 0.767,
      "ceiling_m": 6000
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.00866992984251315,
    "modelExtent": [
      43.63674089976427,
      10.744743108749393,
      43.8411852119233
    ],
    "origin": [
      0.00038422359863332645,
      0.8896384239196777,
      0.8001324468006548
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Object_350",
        "group": "Object_350",
        "role": "gear",
        "side": "center",
        "center": [
          -0.00038,
          -1.76214,
          0.15494
        ],
        "size": [
          5.35485,
          1.045,
          12.21005
        ],
        "swappable": true
      },
      {
        "node": "Object_296",
        "group": "Object_296",
        "role": "body",
        "side": "right",
        "center": [
          -0.00038,
          1.00747,
          -2.86414
        ],
        "size": [
          8.44019,
          5.57092,
          19.4689
        ],
        "swappable": false
      },
      {
        "node": "Object_59",
        "group": "Object_59",
        "role": "arm",
        "side": "right",
        "center": [
          0.00254,
          -0.28179,
          -11.36583
        ],
        "size": [
          4.41853,
          3.95791,
          3.58407
        ],
        "swappable": false
      },
      {
        "node": "Object_23",
        "group": "Object_23",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00038,
          1.45154,
          -9.35683
        ],
        "size": [
          3.37765,
          5.36,
          6.29051
        ],
        "swappable": false
      },
      {
        "node": "Object_344",
        "group": "Object_344",
        "role": "body",
        "side": "left",
        "center": [
          -0.00038,
          3.47346,
          4.28964
        ],
        "size": [
          6.46912,
          2.69449,
          4.48366
        ],
        "swappable": false
      },
      {
        "node": "Object_181",
        "group": "Object_181",
        "role": "arm",
        "side": "right",
        "center": [
          16.19078,
          1.21234,
          -10.64337
        ],
        "size": [
          1.62546,
          1.16114,
          2.54009
        ],
        "swappable": false
      },
      {
        "node": "Object_123",
        "group": "Object_123",
        "role": "arm",
        "side": "right",
        "center": [
          -16.19305,
          1.22393,
          -10.64356
        ],
        "size": [
          1.62546,
          1.16114,
          2.54009
        ],
        "swappable": false
      },
      {
        "node": "Object_311",
        "group": "Object_311",
        "role": "body",
        "side": "left",
        "center": [
          2.54689,
          2.2508,
          5.77933
        ],
        "size": [
          0.70497,
          1.02363,
          1.36735
        ],
        "swappable": false
      },
      {
        "node": "Object_308",
        "group": "Object_308",
        "role": "body",
        "side": "left",
        "center": [
          -2.54766,
          2.2508,
          5.77933
        ],
        "size": [
          0.70497,
          1.02363,
          1.36735
        ],
        "swappable": false
      },
      {
        "node": "Object_149",
        "group": "Object_149",
        "role": "arm",
        "side": "left",
        "center": [
          -12.9145,
          0.57879,
          13.5836
        ],
        "size": [
          2.21541,
          1.24657,
          2.09016
        ],
        "swappable": false
      },
      {
        "node": "Object_85",
        "group": "Object_85",
        "role": "arm",
        "side": "left",
        "center": [
          12.91449,
          0.58411,
          13.58346
        ],
        "size": [
          2.21541,
          1.24657,
          2.09016
        ],
        "swappable": false
      },
      {
        "node": "Object_455",
        "group": "Object_455",
        "role": "gear",
        "side": "left",
        "center": [
          12.63594,
          -1.09306,
          13.62794
        ],
        "size": [
          2.38616,
          1.63575,
          2.41663
        ],
        "swappable": true
      },
      {
        "node": "Object_416",
        "group": "Object_416",
        "role": "gear",
        "side": "left",
        "center": [
          -12.63671,
          -1.09306,
          13.62794
        ],
        "size": [
          2.38616,
          1.63575,
          2.41663
        ],
        "swappable": true
      },
      {
        "node": "Object_302",
        "group": "Object_302",
        "role": "body",
        "side": "right",
        "center": [
          -0.00038,
          4.3466,
          -4.7496
        ],
        "size": [
          7.95849,
          2.05154,
          15.80534
        ],
        "swappable": false
      },
      {
        "node": "Object_260",
        "group": "Object_260",
        "role": "gear",
        "side": "right",
        "center": [
          16.19028,
          -0.44081,
          -10.61357
        ],
        "size": [
          1.98909,
          1.64245,
          2.40751
        ],
        "swappable": true
      },
      {
        "node": "Object_221",
        "group": "Object_221",
        "role": "gear",
        "side": "right",
        "center": [
          -16.19105,
          -0.44081,
          -10.61357
        ],
        "size": [
          1.98909,
          1.64245,
          2.40751
        ],
        "swappable": true
      },
      {
        "node": "Object_314",
        "group": "Object_314",
        "role": "body",
        "side": "left",
        "center": [
          -0.00038,
          4.23339,
          2.85866
        ],
        "size": [
          2.08966,
          0.74557,
          2.24094
        ],
        "swappable": false
      },
      {
        "node": "Object_278",
        "group": "Object_278",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00038,
          4.79472,
          -10.86541
        ],
        "size": [
          3.99747,
          0.47662,
          0.83219
        ],
        "swappable": false
      },
      {
        "node": "Object_20",
        "group": "Object_20",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00038,
          1.14434,
          -9.09347
        ],
        "size": [
          5.03526,
          4.18301,
          6.32947
        ],
        "swappable": false
      },
      {
        "node": "Object_386",
        "group": "Object_386",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00038,
          -1.77792,
          -5.27872
        ],
        "size": [
          5.37361,
          1.22649,
          3.62286
        ],
        "swappable": true
      },
      {
        "node": "Object_254",
        "group": "Object_254",
        "role": "arm",
        "side": "right",
        "center": [
          10.8088,
          0.04222,
          -9.35739
        ],
        "size": [
          12.66941,
          4.33118,
          4.91455
        ],
        "swappable": false
      },
      {
        "node": "Object_215",
        "group": "Object_215",
        "role": "arm",
        "side": "right",
        "center": [
          -10.80957,
          0.04222,
          -9.35739
        ],
        "size": [
          12.66941,
          4.33118,
          4.91455
        ],
        "swappable": false
      },
      {
        "node": "Object_269",
        "group": "Object_269",
        "role": "gear",
        "side": "right",
        "center": [
          15.53597,
          -3.32089,
          -10.61348
        ],
        "size": [
          2.97406,
          3.91012,
          2.09763
        ],
        "swappable": true
      },
      {
        "node": "Object_230",
        "group": "Object_230",
        "role": "gear",
        "side": "right",
        "center": [
          -15.53673,
          -3.32089,
          -10.61348
        ],
        "size": [
          2.97406,
          3.91012,
          2.09763
        ],
        "swappable": true
      },
      {
        "node": "Object_317",
        "group": "Object_317",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00038,
          3.80251,
          -12.21271
        ],
        "size": [
          7.85045,
          2.20555,
          2.46118
        ],
        "swappable": false
      },
      {
        "node": "Object_187",
        "group": "Object_187",
        "role": "rotor",
        "side": "right",
        "center": [
          16.15581,
          0.73473,
          -10.63341
        ],
        "size": [
          2.39647,
          0.44883,
          2.4079
        ],
        "swappable": true
      },
      {
        "node": "Object_137",
        "group": "Object_137",
        "role": "rotor",
        "side": "left",
        "center": [
          -12.82671,
          0.0624,
          13.59857
        ],
        "size": [
          2.39352,
          0.46035,
          2.40902
        ],
        "swappable": true
      },
      {
        "node": "Object_105",
        "group": "Object_105",
        "role": "rotor",
        "side": "right",
        "center": [
          -16.15808,
          0.74632,
          -10.6336
        ],
        "size": [
          2.39647,
          0.44883,
          2.4079
        ],
        "swappable": true
      },
      {
        "node": "Object_73",
        "group": "Object_73",
        "role": "rotor",
        "side": "left",
        "center": [
          12.82671,
          0.06773,
          13.59843
        ],
        "size": [
          2.39352,
          0.46035,
          2.40902
        ],
        "swappable": true
      },
      {
        "node": "Object_299",
        "group": "Object_299",
        "role": "arm",
        "side": "left",
        "center": [
          -0.00093,
          0.99764,
          6.60761
        ],
        "size": [
          4.41916,
          4.17718,
          0.89471
        ],
        "swappable": false
      },
      {
        "node": "Object_194",
        "group": "Object_194",
        "role": "arm",
        "side": "right",
        "center": [
          -9.03587,
          0.69048,
          -3.60394
        ],
        "size": [
          14.64104,
          5.40038,
          16.76686
        ],
        "swappable": false
      },
      {
        "node": "Object_341",
        "group": "Object_341",
        "role": "body",
        "side": "left",
        "center": [
          -2.01789,
          4.41368,
          3.91095
        ],
        "size": [
          1.19935,
          0.30852,
          1.19935
        ],
        "swappable": false
      },
      {
        "node": "Object_290",
        "group": "Object_290",
        "role": "body",
        "side": "left",
        "center": [
          2.01712,
          4.41368,
          3.91095
        ],
        "size": [
          1.19935,
          0.30852,
          1.19935
        ],
        "swappable": false
      },
      {
        "node": "Object_449",
        "group": "Object_449",
        "role": "gear",
        "side": "left",
        "center": [
          9.15503,
          -1.20529,
          9.82378
        ],
        "size": [
          9.25967,
          3.05105,
          10.06073
        ],
        "swappable": true
      },
      {
        "node": "Object_410",
        "group": "Object_410",
        "role": "gear",
        "side": "left",
        "center": [
          -9.1558,
          -1.20529,
          9.82378
        ],
        "size": [
          9.25967,
          3.05105,
          10.06073
        ],
        "swappable": true
      },
      {
        "node": "Object_191",
        "group": "Object_191",
        "role": "arm",
        "side": "right",
        "center": [
          9.0351,
          0.69048,
          -3.60394
        ],
        "size": [
          14.64104,
          5.40038,
          16.76686
        ],
        "swappable": false
      },
      {
        "node": "Object_233",
        "group": "Object_233",
        "role": "body",
        "side": "right",
        "center": [
          -4.5433,
          1.54581,
          -6.51055
        ],
        "size": [
          3.76912,
          2.40606,
          1.88638
        ],
        "swappable": false
      },
      {
        "node": "Object_248",
        "group": "Object_248",
        "role": "body",
        "side": "right",
        "center": [
          4.54253,
          1.54581,
          -6.51055
        ],
        "size": [
          3.76912,
          2.40606,
          1.88638
        ],
        "swappable": false
      },
      {
        "node": "Object_428",
        "group": "Object_428",
        "role": "body",
        "side": "left",
        "center": [
          -3.77369,
          -0.34256,
          5.33592
        ],
        "size": [
          2.39899,
          2.08901,
          3.00832
        ],
        "swappable": false
      },
      {
        "node": "Object_197",
        "group": "Object_197",
        "role": "body",
        "side": "left",
        "center": [
          3.77292,
          -0.34256,
          5.33592
        ],
        "size": [
          2.39899,
          2.08901,
          3.00832
        ],
        "swappable": false
      },
      {
        "node": "Object_320",
        "group": "Object_320",
        "role": "body",
        "side": "left",
        "center": [
          2.36157,
          2.26772,
          5.71346
        ],
        "size": [
          0.57711,
          1.57979,
          2.06231
        ],
        "swappable": false
      },
      {
        "node": "Object_305",
        "group": "Object_305",
        "role": "body",
        "side": "left",
        "center": [
          -2.35023,
          2.26772,
          5.72124
        ],
        "size": [
          0.60133,
          1.57979,
          2.07788
        ],
        "swappable": false
      },
      {
        "node": "Object_56",
        "group": "Object_56",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00038,
          -0.25063,
          -10.39308
        ],
        "size": [
          6.16002,
          2.39636,
          4.61589
        ],
        "swappable": false
      },
      {
        "node": "Object_169",
        "group": "Object_169",
        "role": "arm",
        "side": "right",
        "center": [
          16.54902,
          1.33248,
          -9.8014
        ],
        "size": [
          0.31583,
          0.65319,
          0.2511
        ],
        "swappable": false
      },
      {
        "node": "Object_111",
        "group": "Object_111",
        "role": "arm",
        "side": "right",
        "center": [
          -16.55129,
          1.34406,
          -9.80159
        ],
        "size": [
          0.31583,
          0.65319,
          0.2511
        ],
        "swappable": false
      },
      {
        "node": "Object_166",
        "group": "Object_166",
        "role": "arm",
        "side": "right",
        "center": [
          15.93852,
          1.38334,
          -11.49394
        ],
        "size": [
          0.31582,
          0.65319,
          0.2511
        ],
        "swappable": false
      },
      {
        "node": "Object_108",
        "group": "Object_108",
        "role": "arm",
        "side": "right",
        "center": [
          -15.94079,
          1.39492,
          -11.49413
        ],
        "size": [
          0.31582,
          0.65319,
          0.2511
        ],
        "swappable": false
      },
      {
        "node": "Object_47",
        "group": "Object_47",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00003,
          -0.08544,
          -13.26677
        ],
        "size": [
          3.44747,
          3.39662,
          0.24378
        ],
        "swappable": false
      },
      {
        "node": "Object_172",
        "group": "Object_172",
        "role": "arm",
        "side": "right",
        "center": [
          14.06893,
          1.4639,
          -16.49499
        ],
        "size": [
          4.59963,
          1.2396,
          10.85082
        ],
        "swappable": false
      },
      {
        "node": "Object_120",
        "group": "Object_120",
        "role": "arm",
        "side": "right",
        "center": [
          -14.0712,
          1.47549,
          -16.49518
        ],
        "size": [
          4.59963,
          1.2396,
          10.85082
        ],
        "swappable": false
      },
      {
        "node": "Object_178",
        "group": "Object_178",
        "role": "arm",
        "side": "right",
        "center": [
          18.43175,
          1.26595,
          -4.79538
        ],
        "size": [
          4.73719,
          0.56867,
          10.83372
        ],
        "swappable": false
      },
      {
        "node": "Object_117",
        "group": "Object_117",
        "role": "arm",
        "side": "right",
        "center": [
          -18.43402,
          1.27754,
          -4.79557
        ],
        "size": [
          4.73719,
          0.56867,
          10.83372
        ],
        "swappable": false
      },
      {
        "node": "Object_143",
        "group": "Object_143",
        "role": "arm",
        "side": "left",
        "center": [
          -13.56699,
          0.56825,
          12.9582
        ],
        "size": [
          0.32449,
          0.6549,
          0.25699
        ],
        "swappable": false
      },
      {
        "node": "Object_140",
        "group": "Object_140",
        "role": "arm",
        "side": "left",
        "center": [
          -12.27793,
          0.78676,
          14.19553
        ],
        "size": [
          0.32449,
          0.6549,
          0.25699
        ],
        "swappable": false
      },
      {
        "node": "Object_79",
        "group": "Object_79",
        "role": "arm",
        "side": "left",
        "center": [
          13.56698,
          0.57357,
          12.95806
        ],
        "size": [
          0.32449,
          0.6549,
          0.25699
        ],
        "swappable": false
      },
      {
        "node": "Object_76",
        "group": "Object_76",
        "role": "arm",
        "side": "left",
        "center": [
          12.27792,
          0.79209,
          14.19539
        ],
        "size": [
          0.32449,
          0.6549,
          0.25699
        ],
        "swappable": false
      },
      {
        "node": "Object_26",
        "group": "Object_26",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00038,
          0.89616,
          -9.01331
        ],
        "size": [
          2.35914,
          4.6516,
          3.61662
        ],
        "swappable": false
      },
      {
        "node": "Object_440",
        "group": "Object_440",
        "role": "gear",
        "side": "left",
        "center": [
          12.51769,
          -2.56687,
          13.65874
        ],
        "size": [
          2.31677,
          1.60931,
          2.31078
        ],
        "swappable": true
      },
      {
        "node": "Object_401",
        "group": "Object_401",
        "role": "gear",
        "side": "left",
        "center": [
          -12.51846,
          -2.56687,
          13.65874
        ],
        "size": [
          2.31677,
          1.60931,
          2.31078
        ],
        "swappable": true
      },
      {
        "node": "Object_395",
        "group": "Object_395",
        "role": "body",
        "side": "left",
        "center": [
          2.91324,
          1.4292,
          4.568
        ],
        "size": [
          1.72195,
          1.53337,
          4.63796
        ],
        "swappable": false
      },
      {
        "node": "Object_323",
        "group": "Object_323",
        "role": "body",
        "side": "left",
        "center": [
          -0.00038,
          3.64267,
          6.2324
        ],
        "size": [
          2.24426,
          1.07033,
          0.64937
        ],
        "swappable": false
      },
      {
        "node": "Object_152",
        "group": "Object_152",
        "role": "rotor",
        "side": "left",
        "center": [
          -8.41045,
          1.49369,
          17.85015
        ],
        "size": [
          8.5983,
          1.9906,
          8.14088
        ],
        "swappable": true
      },
      {
        "node": "Object_91",
        "group": "Object_91",
        "role": "rotor",
        "side": "left",
        "center": [
          8.41045,
          1.49901,
          17.85001
        ],
        "size": [
          8.5983,
          1.99061,
          8.14088
        ],
        "swappable": true
      },
      {
        "node": "Object_155",
        "group": "Object_155",
        "role": "rotor",
        "side": "left",
        "center": [
          -17.47115,
          0.11552,
          9.30958
        ],
        "size": [
          8.69444,
          1.34901,
          8.14156
        ],
        "swappable": true
      },
      {
        "node": "Object_88",
        "group": "Object_88",
        "role": "rotor",
        "side": "left",
        "center": [
          17.47115,
          0.12084,
          9.30944
        ],
        "size": [
          8.69444,
          1.34901,
          8.14156
        ],
        "swappable": true
      },
      {
        "node": "Object_338",
        "group": "Object_338",
        "role": "body",
        "side": "right",
        "center": [
          -3.25188,
          0.45871,
          -5.91587
        ],
        "size": [
          1.20588,
          1.09408,
          2.92093
        ],
        "swappable": false
      },
      {
        "node": "Object_281",
        "group": "Object_281",
        "role": "body",
        "side": "right",
        "center": [
          3.25112,
          0.45871,
          -5.91587
        ],
        "size": [
          1.20588,
          1.09408,
          2.92093
        ],
        "swappable": false
      },
      {
        "node": "Object_128",
        "group": "Object_128",
        "role": "gear",
        "side": "left",
        "center": [
          -12.709,
          -0.76425,
          13.62068
        ],
        "size": [
          2.51425,
          1.25926,
          2.42988
        ],
        "swappable": true
      },
      {
        "node": "Object_64",
        "group": "Object_64",
        "role": "gear",
        "side": "left",
        "center": [
          12.70899,
          -0.75892,
          13.62054
        ],
        "size": [
          2.51425,
          1.25926,
          2.42988
        ],
        "swappable": true
      },
      {
        "node": "Object_392",
        "group": "Object_392",
        "role": "body",
        "side": "left",
        "center": [
          -2.914,
          1.4292,
          4.568
        ],
        "size": [
          1.72195,
          1.53337,
          4.63796
        ],
        "swappable": false
      },
      {
        "node": "Object_368",
        "group": "Object_368",
        "role": "arm",
        "side": "left",
        "center": [
          1.20392,
          1.13471,
          6.91056
        ],
        "size": [
          1.07594,
          0.77327,
          0.22139
        ],
        "swappable": false
      },
      {
        "node": "Object_175",
        "group": "Object_175",
        "role": "arm",
        "side": "right",
        "center": [
          16.12287,
          0.48242,
          -10.62788
        ],
        "size": [
          0.60217,
          2.4628,
          0.3328
        ],
        "swappable": false
      },
      {
        "node": "Object_114",
        "group": "Object_114",
        "role": "arm",
        "side": "right",
        "center": [
          -16.12515,
          0.49401,
          -10.62808
        ],
        "size": [
          0.60217,
          2.4628,
          0.3328
        ],
        "swappable": false
      },
      {
        "node": "Object_398",
        "group": "Object_398",
        "role": "gear",
        "side": "left",
        "center": [
          -1.71678,
          -2.17917,
          3.8166
        ],
        "size": [
          0.4988,
          0.51825,
          2.13233
        ],
        "swappable": true
      },
      {
        "node": "Object_389",
        "group": "Object_389",
        "role": "gear",
        "side": "left",
        "center": [
          1.71601,
          -2.17917,
          3.8166
        ],
        "size": [
          0.4988,
          0.51825,
          2.13233
        ],
        "swappable": true
      },
      {
        "node": "Object_160",
        "group": "Object_160",
        "role": "arm",
        "side": "right",
        "center": [
          16.05556,
          -0.08963,
          -10.62361
        ],
        "size": [
          2.49632,
          1.22492,
          2.42372
        ],
        "swappable": false
      },
      {
        "node": "Object_96",
        "group": "Object_96",
        "role": "arm",
        "side": "right",
        "center": [
          -16.05784,
          -0.07804,
          -10.6238
        ],
        "size": [
          2.49632,
          1.22492,
          2.42372
        ],
        "swappable": false
      },
      {
        "node": "Object_44",
        "group": "Object_44",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00056,
          -0.49252,
          -12.64628
        ],
        "size": [
          1.3273,
          1.00694,
          0.22018
        ],
        "swappable": true
      },
      {
        "node": "Object_41",
        "group": "Object_41",
        "role": "gear",
        "side": "right",
        "center": [
          0.04252,
          -0.5333,
          -12.98505
        ],
        "size": [
          2.65193,
          1.84009,
          0.47696
        ],
        "swappable": true
      },
      {
        "node": "Object_275",
        "group": "Object_275",
        "role": "body",
        "side": "right",
        "center": [
          3.36914,
          1.75927,
          -6.15077
        ],
        "size": [
          2.66301,
          0.84776,
          1.88923
        ],
        "swappable": false
      },
      {
        "node": "Object_236",
        "group": "Object_236",
        "role": "body",
        "side": "right",
        "center": [
          -3.36991,
          1.75927,
          -6.15077
        ],
        "size": [
          2.66301,
          0.84776,
          1.88923
        ],
        "swappable": false
      },
      {
        "node": "Object_146",
        "group": "Object_146",
        "role": "arm",
        "side": "left",
        "center": [
          -12.89138,
          0.51036,
          13.58662
        ],
        "size": [
          0.43598,
          1.08713,
          0.32024
        ],
        "swappable": false
      },
      {
        "node": "Object_82",
        "group": "Object_82",
        "role": "arm",
        "side": "left",
        "center": [
          12.89138,
          0.51568,
          13.58648
        ],
        "size": [
          0.43598,
          1.08713,
          0.32024
        ],
        "swappable": false
      },
      {
        "node": "Object_29",
        "group": "Object_29",
        "role": "arm",
        "side": "right",
        "center": [
          0.0064,
          -0.24964,
          -9.80365
        ],
        "size": [
          4.50797,
          2.26832,
          1.55703
        ],
        "swappable": false
      },
      {
        "node": "Object_11",
        "group": "Object_11",
        "role": "arm",
        "side": "right",
        "center": [
          -0.1854,
          1.00682,
          -13.20222
        ],
        "size": [
          2.19412,
          0.84809,
          0.08559
        ],
        "swappable": false
      },
      {
        "node": "Object_184",
        "group": "Object_184",
        "role": "rotor",
        "side": "right",
        "center": [
          16.13915,
          0.59777,
          -10.6304
        ],
        "size": [
          2.39747,
          0.39183,
          2.40705
        ],
        "swappable": true
      },
      {
        "node": "Object_163",
        "group": "Object_163",
        "role": "rotor",
        "side": "right",
        "center": [
          16.11789,
          0.43411,
          -10.6279
        ],
        "size": [
          2.40563,
          0.44151,
          2.40718
        ],
        "swappable": true
      },
      {
        "node": "Object_134",
        "group": "Object_134",
        "role": "rotor",
        "side": "left",
        "center": [
          -12.80752,
          -0.08389,
          13.60196
        ],
        "size": [
          2.3934,
          0.42545,
          2.40909
        ],
        "swappable": true
      },
      {
        "node": "Object_131",
        "group": "Object_131",
        "role": "rotor",
        "side": "left",
        "center": [
          -12.78372,
          -0.24715,
          13.60574
        ],
        "size": [
          2.40132,
          0.47487,
          2.40971
        ],
        "swappable": true
      },
      {
        "node": "Object_102",
        "group": "Object_102",
        "role": "rotor",
        "side": "right",
        "center": [
          -16.12016,
          0.4457,
          -10.62809
        ],
        "size": [
          2.40563,
          0.44151,
          2.40718
        ],
        "swappable": true
      },
      {
        "node": "Object_99",
        "group": "Object_99",
        "role": "rotor",
        "side": "right",
        "center": [
          -16.14143,
          0.60936,
          -10.63059
        ],
        "size": [
          2.39747,
          0.39183,
          2.40705
        ],
        "swappable": true
      },
      {
        "node": "Object_70",
        "group": "Object_70",
        "role": "rotor",
        "side": "left",
        "center": [
          12.78372,
          -0.24183,
          13.6056
        ],
        "size": [
          2.40132,
          0.47487,
          2.40971
        ],
        "swappable": true
      },
      {
        "node": "Object_67",
        "group": "Object_67",
        "role": "rotor",
        "side": "left",
        "center": [
          12.80752,
          -0.07856,
          13.60181
        ],
        "size": [
          2.3934,
          0.42545,
          2.40909
        ],
        "swappable": true
      },
      {
        "node": "Object_50",
        "group": "Object_50",
        "role": "arm",
        "side": "right",
        "center": [
          0.04177,
          -0.00083,
          -13.25933
        ],
        "size": [
          2.53926,
          2.82642,
          0.06139
        ],
        "swappable": false
      },
      {
        "node": "Object_251",
        "group": "Object_251",
        "role": "arm",
        "side": "right",
        "center": [
          16.08312,
          0.11706,
          -10.62732
        ],
        "size": [
          0.73075,
          0.29217,
          0.71235
        ],
        "swappable": false
      },
      {
        "node": "Object_212",
        "group": "Object_212",
        "role": "arm",
        "side": "right",
        "center": [
          -16.08389,
          0.11706,
          -10.62732
        ],
        "size": [
          0.73075,
          0.29217,
          0.71235
        ],
        "swappable": false
      },
      {
        "node": "Object_32",
        "group": "Object_32",
        "role": "arm",
        "side": "right",
        "center": [
          -0.00023,
          1.67678,
          -9.33893
        ],
        "size": [
          1.87532,
          1.83712,
          2.7276
        ],
        "swappable": false
      },
      {
        "node": "Object_383",
        "group": "Object_383",
        "role": "body",
        "side": "left",
        "center": [
          -2.54725,
          3.86278,
          5.59514
        ],
        "size": [
          1.04634,
          1.4404,
          1.04645
        ],
        "swappable": false
      },
      {
        "node": "Object_359",
        "group": "Object_359",
        "role": "body",
        "side": "left",
        "center": [
          2.54648,
          3.86278,
          5.59514
        ],
        "size": [
          1.04634,
          1.4404,
          1.04645
        ],
        "swappable": false
      },
      {
        "node": "Object_17",
        "group": "Object_17",
        "role": "arm",
        "side": "right",
        "center": [
          -0.5122,
          0.98131,
          -13.00073
        ],
        "size": [
          1.66252,
          1.26155,
          0.38889
        ],
        "swappable": false
      },
      {
        "node": "Object_14",
        "group": "Object_14",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00038,
          -0.49648,
          -12.55982
        ],
        "size": [
          0.42116,
          0.42116,
          0.12631
        ],
        "swappable": true
      },
      {
        "node": "Object_365",
        "group": "Object_365",
        "role": "arm",
        "side": "right",
        "center": [
          -3.06353,
          3.8317,
          -12.11062
        ],
        "size": [
          1.04017,
          1.4162,
          1.04029
        ],
        "swappable": false
      },
      {
        "node": "Object_284",
        "group": "Object_284",
        "role": "arm",
        "side": "right",
        "center": [
          3.06276,
          3.8317,
          -12.11062
        ],
        "size": [
          1.04017,
          1.4162,
          1.04029
        ],
        "swappable": false
      },
      {
        "node": "Object_377",
        "group": "Object_377",
        "role": "gear",
        "side": "left",
        "center": [
          -0.00064,
          -2.27395,
          2.64988
        ],
        "size": [
          0.93908,
          0.20233,
          0.93982
        ],
        "swappable": true
      },
      {
        "node": "Object_374",
        "group": "Object_374",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00064,
          -2.27395,
          -1.8507
        ],
        "size": [
          0.93908,
          0.20233,
          0.93982
        ],
        "swappable": true
      },
      {
        "node": "Object_362",
        "group": "Object_362",
        "role": "arm",
        "side": "right",
        "center": [
          -3.16897,
          3.82993,
          -12.21393
        ],
        "size": [
          0.6787,
          0.93982,
          0.67878
        ],
        "swappable": false
      },
      {
        "node": "Object_356",
        "group": "Object_356",
        "role": "body",
        "side": "left",
        "center": [
          2.65282,
          3.86096,
          5.70371
        ],
        "size": [
          0.67878,
          0.93982,
          0.6787
        ],
        "swappable": false
      },
      {
        "node": "Object_347",
        "group": "Object_347",
        "role": "body",
        "side": "left",
        "center": [
          -2.65359,
          3.86096,
          5.70371
        ],
        "size": [
          0.67878,
          0.93982,
          0.6787
        ],
        "swappable": false
      },
      {
        "node": "Object_287",
        "group": "Object_287",
        "role": "arm",
        "side": "right",
        "center": [
          3.1682,
          3.82993,
          -12.21393
        ],
        "size": [
          0.6787,
          0.93982,
          0.67878
        ],
        "swappable": false
      },
      {
        "node": "Object_380",
        "group": "Object_380",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00165,
          -2.11593,
          -1.84893
        ],
        "size": [
          1.2955,
          0.21518,
          1.29492
        ],
        "swappable": true
      },
      {
        "node": "Object_371",
        "group": "Object_371",
        "role": "gear",
        "side": "left",
        "center": [
          0.00072,
          -2.11592,
          2.64825
        ],
        "size": [
          1.29582,
          0.21519,
          1.29535
        ],
        "swappable": true
      },
      {
        "node": "Object_266",
        "group": "Object_266",
        "role": "gear",
        "side": "right",
        "center": [
          13.55731,
          -0.87502,
          -9.18325
        ],
        "size": [
          0.47907,
          0.4729,
          0.36391
        ],
        "swappable": true
      },
      {
        "node": "Object_227",
        "group": "Object_227",
        "role": "gear",
        "side": "right",
        "center": [
          -13.55808,
          -0.87502,
          -9.18325
        ],
        "size": [
          0.47907,
          0.4729,
          0.36391
        ],
        "swappable": true
      },
      {
        "node": "Object_38",
        "group": "Object_38",
        "role": "arm",
        "side": "right",
        "center": [
          -3.0697,
          -0.24964,
          -11.47513
        ],
        "size": [
          0.18491,
          1.95822,
          1.96
        ],
        "swappable": false
      },
      {
        "node": "Object_35",
        "group": "Object_35",
        "role": "arm",
        "side": "right",
        "center": [
          3.06911,
          -0.24964,
          -11.47513
        ],
        "size": [
          0.18491,
          1.95822,
          1.96
        ],
        "swappable": false
      },
      {
        "node": "Object_446",
        "group": "Object_446",
        "role": "gear",
        "side": "left",
        "center": [
          13.37552,
          -2.55659,
          14.48336
        ],
        "size": [
          0.60901,
          1.1086,
          0.52137
        ],
        "swappable": true
      },
      {
        "node": "Object_407",
        "group": "Object_407",
        "role": "gear",
        "side": "left",
        "center": [
          -13.37629,
          -2.55659,
          14.48336
        ],
        "size": [
          0.60901,
          1.1086,
          0.52137
        ],
        "swappable": true
      },
      {
        "node": "Object_272",
        "group": "Object_272",
        "role": "gear",
        "side": "right",
        "center": [
          16.63391,
          -2.29245,
          -11.14114
        ],
        "size": [
          0.76787,
          0.98504,
          0.75103
        ],
        "swappable": true
      },
      {
        "node": "Object_209",
        "group": "Object_209",
        "role": "gear",
        "side": "right",
        "center": [
          -16.63468,
          -2.29245,
          -11.14114
        ],
        "size": [
          0.76787,
          0.98504,
          0.75103
        ],
        "swappable": true
      },
      {
        "node": "Object_53",
        "group": "Object_53",
        "role": "arm",
        "side": "right",
        "center": [
          -0.01398,
          -0.25786,
          -10.80212
        ],
        "size": [
          3.7466,
          2.74381,
          0.75339
        ],
        "swappable": false
      },
      {
        "node": "Object_257",
        "group": "Object_257",
        "role": "gear",
        "side": "right",
        "center": [
          14.49947,
          -5.22317,
          -10.07757
        ],
        "size": [
          0.92011,
          0.29841,
          0.91931
        ],
        "swappable": true
      },
      {
        "node": "Object_218",
        "group": "Object_218",
        "role": "gear",
        "side": "right",
        "center": [
          -14.50024,
          -5.22317,
          -10.07757
        ],
        "size": [
          0.92011,
          0.29841,
          0.91931
        ],
        "swappable": true
      },
      {
        "node": "Object_452",
        "group": "Object_452",
        "role": "gear",
        "side": "left",
        "center": [
          13.00296,
          -3.35581,
          13.93663
        ],
        "size": [
          0.76268,
          0.22868,
          1.46203
        ],
        "swappable": true
      },
      {
        "node": "Object_413",
        "group": "Object_413",
        "role": "gear",
        "side": "left",
        "center": [
          -13.00372,
          -3.35581,
          13.93663
        ],
        "size": [
          0.76268,
          0.22868,
          1.46203
        ],
        "swappable": true
      },
      {
        "node": "Object_329",
        "group": "Object_329",
        "role": "arm",
        "side": "left",
        "center": [
          -0.39089,
          1.1328,
          6.90262
        ],
        "size": [
          0.09212,
          0.24294,
          0.24087
        ],
        "swappable": false
      },
      {
        "node": "Object_332",
        "group": "Object_332",
        "role": "arm",
        "side": "left",
        "center": [
          0.18443,
          1.13357,
          6.90498
        ],
        "size": [
          0.09098,
          0.24339,
          0.24566
        ],
        "swappable": false
      },
      {
        "node": "Object_335",
        "group": "Object_335",
        "role": "arm",
        "side": "left",
        "center": [
          -1.53931,
          1.13341,
          6.84187
        ],
        "size": [
          0.09087,
          0.24194,
          0.21509
        ],
        "swappable": false
      },
      {
        "node": "Object_326",
        "group": "Object_326",
        "role": "arm",
        "side": "left",
        "center": [
          -0.9646,
          1.13241,
          6.88979
        ],
        "size": [
          0.09087,
          0.24194,
          0.21509
        ],
        "swappable": false
      },
      {
        "node": "Object_437",
        "group": "Object_437",
        "role": "gear",
        "side": "left",
        "center": [
          13.2923,
          -2.5273,
          14.41181
        ],
        "size": [
          0.20852,
          0.17666,
          0.19549
        ],
        "swappable": true
      },
      {
        "node": "Object_434",
        "group": "Object_434",
        "role": "gear",
        "side": "left",
        "center": [
          13.33608,
          -2.3033,
          14.41766
        ],
        "size": [
          0.20852,
          0.17666,
          0.19549
        ],
        "swappable": true
      },
      {
        "node": "Object_431",
        "group": "Object_431",
        "role": "gear",
        "side": "left",
        "center": [
          13.24901,
          -2.7487,
          14.40603
        ],
        "size": [
          0.20852,
          0.17666,
          0.19549
        ],
        "swappable": true
      },
      {
        "node": "Object_425",
        "group": "Object_425",
        "role": "gear",
        "side": "left",
        "center": [
          -13.29306,
          -2.5273,
          14.41181
        ],
        "size": [
          0.20852,
          0.17666,
          0.19549
        ],
        "swappable": true
      },
      {
        "node": "Object_422",
        "group": "Object_422",
        "role": "gear",
        "side": "left",
        "center": [
          -13.33685,
          -2.3033,
          14.41766
        ],
        "size": [
          0.20852,
          0.17666,
          0.19549
        ],
        "swappable": true
      },
      {
        "node": "Object_419",
        "group": "Object_419",
        "role": "gear",
        "side": "left",
        "center": [
          -13.24977,
          -2.7487,
          14.40603
        ],
        "size": [
          0.20852,
          0.17666,
          0.19549
        ],
        "swappable": true
      },
      {
        "node": "Object_245",
        "group": "Object_245",
        "role": "gear",
        "side": "right",
        "center": [
          16.70282,
          -2.03633,
          -11.18395
        ],
        "size": [
          0.2194,
          0.16791,
          0.23102
        ],
        "swappable": true
      },
      {
        "node": "Object_242",
        "group": "Object_242",
        "role": "gear",
        "side": "right",
        "center": [
          16.60553,
          -2.2318,
          -11.11724
        ],
        "size": [
          0.2194,
          0.16791,
          0.23103
        ],
        "swappable": true
      },
      {
        "node": "Object_239",
        "group": "Object_239",
        "role": "gear",
        "side": "right",
        "center": [
          16.50936,
          -2.42502,
          -11.05129
        ],
        "size": [
          0.2194,
          0.16791,
          0.23103
        ],
        "swappable": true
      },
      {
        "node": "Object_206",
        "group": "Object_206",
        "role": "gear",
        "side": "right",
        "center": [
          -16.70358,
          -2.03633,
          -11.18395
        ],
        "size": [
          0.2194,
          0.16791,
          0.23102
        ],
        "swappable": true
      },
      {
        "node": "Object_203",
        "group": "Object_203",
        "role": "gear",
        "side": "right",
        "center": [
          -16.6063,
          -2.2318,
          -11.11724
        ],
        "size": [
          0.2194,
          0.16791,
          0.23103
        ],
        "swappable": true
      },
      {
        "node": "Object_200",
        "group": "Object_200",
        "role": "gear",
        "side": "right",
        "center": [
          -16.51012,
          -2.42502,
          -11.05129
        ],
        "size": [
          0.2194,
          0.16791,
          0.23103
        ],
        "swappable": true
      },
      {
        "node": "Object_443",
        "group": "Object_443",
        "role": "gear",
        "side": "left",
        "center": [
          13.23944,
          -2.52735,
          14.36557
        ],
        "size": [
          0.3963,
          0.73859,
          0.31225
        ],
        "swappable": true
      },
      {
        "node": "Object_404",
        "group": "Object_404",
        "role": "gear",
        "side": "left",
        "center": [
          -13.24021,
          -2.52735,
          14.36557
        ],
        "size": [
          0.3963,
          0.73859,
          0.31225
        ],
        "swappable": true
      },
      {
        "node": "Object_263",
        "group": "Object_263",
        "role": "gear",
        "side": "right",
        "center": [
          16.5519,
          -2.20574,
          -11.08013
        ],
        "size": [
          0.51236,
          0.64822,
          0.50001
        ],
        "swappable": true
      },
      {
        "node": "Object_224",
        "group": "Object_224",
        "role": "gear",
        "side": "right",
        "center": [
          -16.55266,
          -2.20574,
          -11.08013
        ],
        "size": [
          0.51236,
          0.64822,
          0.50001
        ],
        "swappable": true
      },
      {
        "node": "Object_353",
        "group": "Object_353",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00038,
          -2.28454,
          -3.82029
        ],
        "size": [
          2.23274,
          0.0002,
          1.03793
        ],
        "swappable": true
      },
      {
        "node": "Object_293",
        "group": "Object_293",
        "role": "body",
        "side": "left",
        "center": [
          0.00021,
          4.37959,
          2.08873
        ],
        "size": [
          2.92414,
          0.86036,
          0.05138
        ],
        "swappable": false
      },
      {
        "node": "Object_7",
        "group": "Object_7",
        "role": "body",
        "side": "right",
        "center": [
          -0.00038,
          1.03015,
          -3.77504
        ],
        "size": [
          4.22739,
          5.66638,
          15.35349
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "llirikslon",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/dji-mavic-3-c5a5abae1dea468ab73b1bdc7d616fa6"
    }
  },
  {
    "id": "akinci",
    "name": "Bayraktar Akıncı",
    "family": "military",
    "blurb": "Twenty-metre twin-turboprop UCAV. Carries more than a Reaper, flies as high as a jet.",
    "environment": "earth",
    "model": "models/akinci.glb",
    "spec": {
      "span_m": 20,
      "length_m": 12.2,
      "wing_area_m2": 30,
      "empty_mass_kg": 2800,
      "mtow_kg": 5500,
      "powertrain": "fuel",
      "fuel_capacity_kg": 1350,
      "engine": "2 × Ivchenko AI-450T turboprop",
      "shaft_power_kw": 670,
      "sfc_kg_per_kwh": 0.33,
      "prop_diameter_m": 2.3,
      "prop_blades": 3,
      "payload_kg": 1350,
      "cruise_kmh": 241,
      "max_speed_kmh": 361,
      "endurance_h": 24,
      "ceiling_m": 12192
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 2.5432618733693193,
    "modelExtent": [
      4.8699844410775945,
      1.7798509563192852,
      7.863916889338633
    ],
    "origin": [
      0.014628336384715945,
      0.12542751516646677,
      0
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Cube_govde_0",
        "group": "Cube_govde_0",
        "role": "wing",
        "side": "center",
        "center": [
          0,
          0.22709,
          0
        ],
        "size": [
          4.86998,
          1.32567,
          7.86392
        ],
        "swappable": true
      },
      {
        "node": "Plane.010_pervane.001_0",
        "group": "Plane.010_pervane.001_0",
        "role": "tail",
        "side": "left",
        "center": [
          1.37069,
          -0.14192,
          1.13775
        ],
        "size": [
          0.08394,
          0.83193,
          1.12375
        ],
        "swappable": true
      },
      {
        "node": "Plane.011_pervane.001_0",
        "group": "Plane.011_pervane.001_0",
        "role": "tail",
        "side": "right",
        "center": [
          1.37069,
          -0.14278,
          -1.17437
        ],
        "size": [
          0.08394,
          0.95125,
          0.92382
        ],
        "swappable": true
      },
      {
        "node": "Cone.004_govde_0",
        "group": "Cone.004_govde_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.87662,
          -0.21497,
          -1.21132
        ],
        "size": [
          0.86968,
          0.48023,
          0.34528
        ],
        "swappable": true
      },
      {
        "node": "Cone.003_govde_0",
        "group": "Cone.003_govde_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.87662,
          -0.21497,
          1.10095
        ],
        "size": [
          0.86968,
          0.48023,
          0.34528
        ],
        "swappable": true
      },
      {
        "node": "Cone.005_pervana_g_0",
        "group": "Cone.005_pervana_g_0",
        "role": "tail",
        "side": "left",
        "center": [
          1.4074,
          -0.14475,
          1.10074
        ],
        "size": [
          0.19187,
          0.23693,
          0.23693
        ],
        "swappable": true
      },
      {
        "node": "Cone.002_pervana_g_0",
        "group": "Cone.002_pervana_g_0",
        "role": "tail",
        "side": "right",
        "center": [
          1.4074,
          -0.14475,
          -1.21132
        ],
        "size": [
          0.19187,
          0.23693,
          0.23693
        ],
        "swappable": true
      },
      {
        "node": "umtas.003_Material.007_0",
        "group": "umtas.003_Material.007_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.62052,
          -0.18604,
          -2.76702
        ],
        "size": [
          0.50622,
          0.09608,
          0.09252
        ],
        "swappable": true
      },
      {
        "node": "umtas.002_Material.007_0",
        "group": "umtas.002_Material.007_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.62052,
          -0.16921,
          -2.49279
        ],
        "size": [
          0.50622,
          0.09608,
          0.09252
        ],
        "swappable": true
      },
      {
        "node": "umtas.001_Material.007_0",
        "group": "umtas.001_Material.007_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.62052,
          -0.16921,
          2.49403
        ],
        "size": [
          0.50622,
          0.09608,
          0.09252
        ],
        "swappable": true
      },
      {
        "node": "umtas_Material.007_0",
        "group": "umtas_Material.007_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.62052,
          -0.19591,
          2.76655
        ],
        "size": [
          0.50622,
          0.09608,
          0.09252
        ],
        "swappable": true
      },
      {
        "node": "Cube.013_Material.006_0",
        "group": "Cube.013_Material.006_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.74994,
          -0.2178,
          -1.98679
        ],
        "size": [
          0.97435,
          0.14855,
          0.21929
        ],
        "swappable": true
      },
      {
        "node": "Cube.010_Material.006_0",
        "group": "Cube.010_Material.006_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.74994,
          -0.2178,
          1.9808
        ],
        "size": [
          0.97435,
          0.14855,
          0.21929
        ],
        "swappable": true
      },
      {
        "node": "Cube.011_govde_0",
        "group": "Cube.011_govde_0",
        "role": "wing",
        "side": "center",
        "center": [
          -0.76752,
          0.16023,
          0
        ],
        "size": [
          3.21618,
          0.71763,
          7.2644
        ],
        "swappable": true
      },
      {
        "node": "Torus.001_Material_0",
        "group": "Torus.001_Material_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.53048,
          -0.78412,
          -0.79448
        ],
        "size": [
          0.21162,
          0.21162,
          0.05039
        ],
        "swappable": true
      },
      {
        "node": "Torus.005_Material_0",
        "group": "Torus.005_Material_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.5365,
          -0.78412,
          0.77975
        ],
        "size": [
          0.21162,
          0.21162,
          0.05039
        ],
        "swappable": true
      },
      {
        "node": "Torus.003_Material_0",
        "group": "Torus.003_Material_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.42075,
          -0.78412,
          0
        ],
        "size": [
          0.21162,
          0.21162,
          0.05039
        ],
        "swappable": true
      },
      {
        "node": "Icosphere.002_Material.006_0",
        "group": "Icosphere.002_Material.006_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.75146,
          -0.47741,
          0
        ],
        "size": [
          0.20989,
          0.2029,
          0.1241
        ],
        "swappable": true
      },
      {
        "node": "Sphere_Material.006_0",
        "group": "Sphere_Material.006_0",
        "role": "payload",
        "side": "center",
        "center": [
          -0.75534,
          -0.43494,
          0
        ],
        "size": [
          0.16209,
          0.24837,
          0.1887
        ],
        "swappable": true
      },
      {
        "node": "Cube.014_Material.006_0",
        "group": "Cube.014_Material.006_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.60792,
          -0.1321,
          -1.98679
        ],
        "size": [
          0.21977,
          0.02748,
          0.56077
        ],
        "swappable": true
      },
      {
        "node": "Cube.009_Material.006_0",
        "group": "Cube.009_Material.006_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.60792,
          -0.1321,
          1.9808
        ],
        "size": [
          0.21977,
          0.02748,
          0.56077
        ],
        "swappable": true
      },
      {
        "node": "Cube.016_Material.006_0",
        "group": "Cube.016_Material.006_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.48282,
          -0.29458,
          -1.98679
        ],
        "size": [
          0.14683,
          0.04453,
          0.14054
        ],
        "swappable": true
      },
      {
        "node": "Cube.005_Material.006_0",
        "group": "Cube.005_Material.006_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.48282,
          -0.29458,
          1.9808
        ],
        "size": [
          0.14683,
          0.04453,
          0.14054
        ],
        "swappable": true
      },
      {
        "node": "Torus.002_Material.001_0",
        "group": "Torus.002_Material.001_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.53048,
          -0.78412,
          -0.79152
        ],
        "size": [
          0.12716,
          0.12716,
          0.03743
        ],
        "swappable": true
      },
      {
        "node": "Torus.006_Material.001_0",
        "group": "Torus.006_Material.001_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.5365,
          -0.78412,
          0.77679
        ],
        "size": [
          0.12716,
          0.12716,
          0.03743
        ],
        "swappable": true
      },
      {
        "node": "Torus.004_Material.001_0",
        "group": "Torus.004_Material.001_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.42075,
          -0.78412,
          -0.00296
        ],
        "size": [
          0.12716,
          0.12716,
          0.03743
        ],
        "swappable": true
      },
      {
        "node": "Icosphere.003_Material.006_0",
        "group": "Icosphere.003_Material.006_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.77192,
          -0.12934,
          -1.98679
        ],
        "size": [
          0.42168,
          0.03781,
          0.17357
        ],
        "swappable": true
      },
      {
        "node": "Icosphere.010_Material.006_0",
        "group": "Icosphere.010_Material.006_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.77192,
          -0.12934,
          1.9808
        ],
        "size": [
          0.42168,
          0.03781,
          0.17357
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.015_Material.003_0",
        "group": "Cylinder.015_Material.003_0",
        "role": "gear",
        "side": "center",
        "center": [
          -0.75477,
          -0.42652,
          0.00006
        ],
        "size": [
          0.21593,
          0.03443,
          0.21593
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.020_Material.004_0",
        "group": "Cylinder.020_Material.004_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.90103,
          -0.21305,
          -2.07194
        ],
        "size": [
          0.01591,
          0.00271,
          0.01691
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.019_Material.004_0",
        "group": "Cylinder.019_Material.004_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.90103,
          -0.21305,
          -1.90203
        ],
        "size": [
          0.01591,
          0.00271,
          0.01691
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.018_Material.004_0",
        "group": "Cylinder.018_Material.004_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.57669,
          -0.10158,
          -1.98898
        ],
        "size": [
          0.00316,
          0.01971,
          0.01855
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.017_Material.004_0",
        "group": "Cylinder.017_Material.004_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.81377,
          -0.10158,
          -1.98898
        ],
        "size": [
          0.00316,
          0.01971,
          0.01855
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.005_Material.004_0",
        "group": "Cylinder.005_Material.004_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.90103,
          -0.21305,
          1.89565
        ],
        "size": [
          0.01591,
          0.00271,
          0.01691
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.012_Material.004_0",
        "group": "Cylinder.012_Material.004_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.90103,
          -0.21305,
          2.06556
        ],
        "size": [
          0.01591,
          0.00271,
          0.01691
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.013_Material.004_0",
        "group": "Cylinder.013_Material.004_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.57669,
          -0.10158,
          1.97861
        ],
        "size": [
          0.00316,
          0.01971,
          0.01855
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.014_Material.004_0",
        "group": "Cylinder.014_Material.004_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.81377,
          -0.10158,
          1.97861
        ],
        "size": [
          0.00316,
          0.01971,
          0.01855
        ],
        "swappable": true
      },
      {
        "node": "Cube.012_Material.008_0",
        "group": "Cube.012_Material.008_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.53349,
          -0.49569,
          -0.45798
        ],
        "size": [
          0.13682,
          0.58711,
          0.66979
        ],
        "swappable": true
      },
      {
        "node": "Cube.003_Material.008_0",
        "group": "Cube.003_Material.008_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.53349,
          -0.49569,
          0.44325
        ],
        "size": [
          0.13682,
          0.58711,
          0.66979
        ],
        "swappable": true
      },
      {
        "node": "Cube.007_Material.008_0",
        "group": "Cube.007_Material.008_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.47052,
          -0.67437,
          0
        ],
        "size": [
          0.11068,
          0.23809,
          0.07459
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.003_govde_0",
        "group": "Cylinder.003_govde_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.86839,
          -0.39634,
          0.11891
        ],
        "size": [
          0.05898,
          0.08033,
          0.06706
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.004_govde_0",
        "group": "Cylinder.004_govde_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.86839,
          -0.39634,
          -0.11684
        ],
        "size": [
          0.05898,
          0.08033,
          0.06706
        ],
        "swappable": true
      },
      {
        "node": "Cube.015_Material.006_0",
        "group": "Cube.015_Material.006_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.31603,
          -0.21246,
          -1.98679
        ],
        "size": [
          0.0722,
          0.17726,
          0.27178
        ],
        "swappable": true
      },
      {
        "node": "Cube.008_Material.006_0",
        "group": "Cube.008_Material.006_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.31603,
          -0.21246,
          1.9808
        ],
        "size": [
          0.0722,
          0.17726,
          0.27178
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.002_govde_0",
        "group": "Cylinder.002_govde_0",
        "role": "body",
        "side": "center",
        "center": [
          -2.049,
          0.84384,
          0
        ],
        "size": [
          0.20772,
          0.02475,
          0.02475
        ],
        "swappable": false
      },
      {
        "node": "Cylinder_govde_0",
        "group": "Cylinder_govde_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.99968,
          0.63506,
          0
        ],
        "size": [
          0.08944,
          0.06222,
          0.06222
        ],
        "swappable": false
      },
      {
        "node": "Plane.025_dot_0",
        "group": "Plane.025_dot_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.68109,
          -0.03767,
          1.57675
        ],
        "size": [
          0.29445,
          0.03299,
          0.29404
        ],
        "swappable": true
      },
      {
        "node": "Plane.024_dot_0",
        "group": "Plane.024_dot_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.24961,
          -0.24106,
          0.14049
        ],
        "size": [
          0.12491,
          0.10219,
          0.03881
        ],
        "swappable": false
      },
      {
        "node": "Plane.009_baykar_0",
        "group": "Plane.009_baykar_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.97699,
          0.23481,
          0.05865
        ],
        "size": [
          0.13556,
          0.09247,
          0.0085
        ],
        "swappable": false
      },
      {
        "node": "Plane.008_bayrak_0",
        "group": "Plane.008_bayrak_0",
        "role": "body",
        "side": "center",
        "center": [
          -2.0662,
          0.4202,
          0.05138
        ],
        "size": [
          0.13545,
          0.09265,
          0.00787
        ],
        "swappable": false
      },
      {
        "node": "Plane.007_baykar.001_0",
        "group": "Plane.007_baykar.001_0",
        "role": "body",
        "side": "center",
        "center": [
          1.72576,
          -0.17678,
          0.19588
        ],
        "size": [
          0.30067,
          0.08317,
          0.04969
        ],
        "swappable": false
      },
      {
        "node": "Plane.005_dot_0",
        "group": "Plane.005_dot_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.68107,
          -0.03628,
          -1.55949
        ],
        "size": [
          0.29465,
          0.03303,
          0.29389
        ],
        "swappable": true
      },
      {
        "node": "Plane.023_dot_0",
        "group": "Plane.023_dot_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.24976,
          -0.24036,
          -0.14042
        ],
        "size": [
          0.12494,
          0.10331,
          0.03891
        ],
        "swappable": false
      },
      {
        "node": "Plane.017_baykar.001_0",
        "group": "Plane.017_baykar.001_0",
        "role": "body",
        "side": "center",
        "center": [
          1.72574,
          -0.17694,
          -0.19587
        ],
        "size": [
          0.30067,
          0.08289,
          0.04972
        ],
        "swappable": false
      },
      {
        "node": "Plane.016_baykar.001_0",
        "group": "Plane.016_baykar.001_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.53767,
          -0.21614,
          -0.19249
        ],
        "size": [
          0.63374,
          0.17124,
          0.08498
        ],
        "swappable": false
      },
      {
        "node": "Plane.015_baykar_0",
        "group": "Plane.015_baykar_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.97699,
          0.23484,
          -0.05865
        ],
        "size": [
          0.13557,
          0.09245,
          0.00851
        ],
        "swappable": false
      },
      {
        "node": "Plane.014_bayrak_0",
        "group": "Plane.014_bayrak_0",
        "role": "body",
        "side": "center",
        "center": [
          -2.0662,
          0.42056,
          -0.05132
        ],
        "size": [
          0.13558,
          0.09244,
          0.00794
        ],
        "swappable": false
      },
      {
        "node": "dikkat.001_dikkat_0",
        "group": "dikkat.001_dikkat_0",
        "role": "body",
        "side": "center",
        "center": [
          1.47436,
          -0.07951,
          -0.1798
        ],
        "size": [
          0.17183,
          0.21668,
          0.12245
        ],
        "swappable": false
      },
      {
        "node": "dikkat_dikkat_0",
        "group": "dikkat_dikkat_0",
        "role": "body",
        "side": "center",
        "center": [
          1.47429,
          -0.08042,
          0.18075
        ],
        "size": [
          0.17181,
          0.21495,
          0.12061
        ],
        "swappable": false
      },
      {
        "node": "model.001_model_0",
        "group": "model.001_model_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.87942,
          0.04259,
          0.06803
        ],
        "size": [
          0.17499,
          0.07871,
          0.01056
        ],
        "swappable": false
      },
      {
        "node": "model_model_0",
        "group": "model_model_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.87949,
          0.04188,
          -0.06882
        ],
        "size": [
          0.17479,
          0.07915,
          0.01198
        ],
        "swappable": false
      },
      {
        "node": "turk_bayragi.003_turk_bayragi_0",
        "group": "turk_bayragi.003_turk_bayragi_0",
        "role": "tail",
        "side": "right",
        "center": [
          1.07915,
          -0.20871,
          -2.06287
        ],
        "size": [
          0.03499,
          0.02353,
          0.00321
        ],
        "swappable": true
      },
      {
        "node": "roketsan.003_roketsan_0",
        "group": "roketsan.003_roketsan_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.9942,
          -0.20874,
          -2.065
        ],
        "size": [
          0.11071,
          0.01943,
          0.00155
        ],
        "swappable": true
      },
      {
        "node": "turk_bayragi.002_turk_bayragi_0",
        "group": "turk_bayragi.002_turk_bayragi_0",
        "role": "tail",
        "side": "right",
        "center": [
          1.07912,
          -0.20871,
          -1.91071
        ],
        "size": [
          0.03498,
          0.02353,
          0.00321
        ],
        "swappable": true
      },
      {
        "node": "roketsan.002_roketsan_0",
        "group": "roketsan.002_roketsan_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.99419,
          -0.20874,
          -1.90779
        ],
        "size": [
          0.11071,
          0.01943,
          0.00155
        ],
        "swappable": true
      },
      {
        "node": "turk_bayragi.001_turk_bayragi_0",
        "group": "turk_bayragi.001_turk_bayragi_0",
        "role": "tail",
        "side": "left",
        "center": [
          1.07915,
          -0.20871,
          1.90472
        ],
        "size": [
          0.03499,
          0.02353,
          0.00321
        ],
        "swappable": true
      },
      {
        "node": "roketsan.001_roketsan_0",
        "group": "roketsan.001_roketsan_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.9942,
          -0.20874,
          1.90258
        ],
        "size": [
          0.11071,
          0.01943,
          0.00155
        ],
        "swappable": true
      },
      {
        "node": "turk_bayragi_turk_bayragi_0",
        "group": "turk_bayragi_turk_bayragi_0",
        "role": "tail",
        "side": "left",
        "center": [
          1.07912,
          -0.20871,
          2.05688
        ],
        "size": [
          0.03498,
          0.02353,
          0.00321
        ],
        "swappable": true
      },
      {
        "node": "roketsan_roketsan_0",
        "group": "roketsan_roketsan_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.99419,
          -0.20874,
          2.0598
        ],
        "size": [
          0.11071,
          0.01943,
          0.00155
        ],
        "swappable": true
      },
      {
        "node": "Cube.017_Material.006_0",
        "group": "Cube.017_Material.006_0",
        "role": "tail",
        "side": "right",
        "center": [
          1.0471,
          -0.14553,
          -1.98665
        ],
        "size": [
          0.0297,
          0.00747,
          0.02811
        ],
        "swappable": true
      },
      {
        "node": "Cube.004_Material.006_0",
        "group": "Cube.004_Material.006_0",
        "role": "tail",
        "side": "left",
        "center": [
          1.0471,
          -0.14553,
          1.98094
        ],
        "size": [
          0.0297,
          0.00747,
          0.02811
        ],
        "swappable": true
      },
      {
        "node": "Icosphere.001_Material.013_0",
        "group": "Icosphere.001_Material.013_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.96039,
          0.63506,
          0
        ],
        "size": [
          0.05668,
          0.0596,
          0.0596
        ],
        "swappable": false
      },
      {
        "node": "Cylinder.016_Material.009_0",
        "group": "Cylinder.016_Material.009_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          0.53048,
          -0.78412,
          -0.80083
        ],
        "size": [
          0.05667,
          0.05667,
          0.0862
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.011_Material.009_0",
        "group": "Cylinder.011_Material.009_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          0.5365,
          -0.78412,
          0.7861
        ],
        "size": [
          0.05667,
          0.05667,
          0.0862
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.008_Material.009_0",
        "group": "Cylinder.008_Material.009_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.42075,
          -0.78412,
          0.00635
        ],
        "size": [
          0.05667,
          0.05667,
          0.0862
        ],
        "swappable": true
      },
      {
        "node": "Icosphere.002_optics_0",
        "group": "Icosphere.002_optics_0",
        "role": "payload",
        "side": "center",
        "center": [
          -0.68096,
          -0.52254,
          0.00099
        ],
        "size": [
          0.06233,
          0.09326,
          0.11348
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.010_Material.010_0",
        "group": "Cylinder.010_Material.010_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.52482,
          -0.51965,
          0
        ],
        "size": [
          0.07212,
          0.1046,
          0.02594
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.009_piston_0",
        "group": "Cylinder.009_piston_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.57288,
          -0.4317,
          0
        ],
        "size": [
          0.09837,
          0.1388,
          0.0387
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.007_Material.010_0",
        "group": "Cylinder.007_Material.010_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.43756,
          -0.61884,
          0
        ],
        "size": [
          0.02442,
          0.10604,
          0.02442
        ],
        "swappable": true
      },
      {
        "node": "Cylinder.006_piston_0",
        "group": "Cylinder.006_piston_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.43756,
          -0.53256,
          0
        ],
        "size": [
          0.03677,
          0.11558,
          0.03677
        ],
        "swappable": true
      },
      {
        "node": "Plane.006_baykar.001_0",
        "group": "Plane.006_baykar.001_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.53765,
          -0.21639,
          0.1925
        ],
        "size": [
          0.63374,
          0.1708,
          0.08498
        ],
        "swappable": false
      },
      {
        "node": "Cube.002_govde_0",
        "group": "Cube.002_govde_0",
        "role": "payload",
        "side": "center",
        "center": [
          -1.63943,
          -0.3741,
          -0.03174
        ],
        "size": [
          0.07988,
          0.09873,
          0.01869
        ],
        "swappable": true
      },
      {
        "node": "Cube.001_govde_0",
        "group": "Cube.001_govde_0",
        "role": "payload",
        "side": "center",
        "center": [
          -1.32276,
          -0.42515,
          -0.03174
        ],
        "size": [
          0.05237,
          0.07879,
          0.01492
        ],
        "swappable": true
      },
      {
        "node": "Cube.006_Material.008_0",
        "group": "Cube.006_Material.008_0",
        "role": "payload",
        "side": "center",
        "center": [
          1.43769,
          -0.46716,
          0
        ],
        "size": [
          0.18332,
          0.23467,
          0.04757
        ],
        "swappable": true
      },
      {
        "node": "Cube.013_optics_0",
        "group": "Cube.013_optics_0",
        "role": "tail",
        "side": "right",
        "center": [
          1.22728,
          -0.20782,
          -1.98679
        ],
        "size": [
          0.01967,
          0.05967,
          0.09153
        ],
        "swappable": true
      },
      {
        "node": "Cube.010_optics_0",
        "group": "Cube.010_optics_0",
        "role": "tail",
        "side": "left",
        "center": [
          1.22728,
          -0.20782,
          1.9808
        ],
        "size": [
          0.01967,
          0.05967,
          0.09153
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "Yusuf",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/akinci-tiha-5c878dbad37442e9a219d962540a75c2"
    }
  },
  {
    "id": "shahed-136",
    "name": "Shahed-136",
    "family": "military",
    "blurb": "Delta-wing loitering munition. A moped engine, a warhead, and two thousand kilometres.",
    "environment": "earth",
    "model": "models/shahed-136.glb",
    "spec": {
      "span_m": 2.5,
      "length_m": 3.5,
      "wing_area_m2": 2,
      "empty_mass_kg": 110,
      "mtow_kg": 200,
      "powertrain": "fuel",
      "fuel_capacity_kg": 40,
      "engine": "MADO MD-550 two-stroke",
      "shaft_power_kw": 37,
      "sfc_kg_per_kwh": 0.42,
      "prop_diameter_m": 0.8,
      "prop_blades": 2,
      "payload_kg": 50,
      "cruise_kmh": 185,
      "max_speed_kmh": 185,
      "endurance_h": 13.5,
      "ceiling_m": 4000
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 1.7404683379512156,
    "modelExtent": [
      1.436394989490509,
      0.3373150080442429,
      1.8981739878654484
    ],
    "origin": [
      -0.00012949109077453613,
      0.0010394975543022156,
      -0.000326007604598999
    ],
    "cuts": {
      "wing": {
        "axis": 0,
        "axisName": "span",
        "keep": 0.100548,
        "origin": -0.000129
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "Object_2",
        "group": "Object_2",
        "role": "body",
        "side": "center",
        "center": [
          0.00493,
          0,
          0
        ],
        "size": [
          1.42653,
          0.33732,
          1.89817
        ],
        "swappable": false
      },
      {
        "node": "Object_3",
        "group": "Object_3",
        "role": "body",
        "side": "center",
        "center": [
          -0.00034,
          0.00005,
          0.00277
        ],
        "size": [
          1.43572,
          0.33722,
          1.89222
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "Chenzoss",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/iranian-shahed-136-military-drone-af8ac3d45ade494fb280c99922513ae2"
    }
  },
  {
    "id": "altius-700",
    "name": "Anduril ALTIUS 700M",
    "family": "military",
    "blurb": "Folds into a tube, launches from one, unfolds its wing in the air.",
    "environment": "earth",
    "model": "models/altius-700.glb",
    "spec": {
      "span_m": 3.05,
      "length_m": 2.1,
      "wing_area_m2": 1.5,
      "empty_mass_kg": 120,
      "mtow_kg": 227,
      "powertrain": "fuel",
      "fuel_capacity_kg": 37,
      "engine": "Piston pusher",
      "shaft_power_kw": 37,
      "sfc_kg_per_kwh": 0.42,
      "prop_diameter_m": 0.6,
      "prop_blades": 2,
      "payload_kg": 30,
      "cruise_kmh": 185,
      "max_speed_kmh": 222,
      "endurance_h": 4,
      "ceiling_m": 7620
    },
    "axes": {
      "span": 0,
      "length": 2,
      "vertical": 1
    },
    "aftSign": -1,
    "scaleToMetres": 0.0027637559537364415,
    "modelExtent": [
      1103.5706665331911,
      258.1964394270058,
      1052.7131290509647
    ],
    "origin": [
      2.438789324416007,
      1.5404075808744722,
      -268.9450715783918
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Mesh003_Material #25_0",
        "group": "Mesh003_Material #25_0",
        "role": "body",
        "side": "center",
        "center": [
          -2.57596,
          -1.0274,
          16.76782
        ],
        "size": [
          111.23403,
          149.85765,
          1019.17749
        ],
        "swappable": false
      },
      {
        "node": "Sphere006_Material #25_0",
        "group": "Sphere006_Material #25_0",
        "role": "payload",
        "side": "center",
        "center": [
          -2.22646,
          -36.77069,
          440.08973
        ],
        "size": [
          71.79946,
          71.79946,
          66.00045
        ],
        "swappable": true
      },
      {
        "node": "C-Ext002_Material #25_0",
        "group": "C-Ext002_Material #25_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          -74.79497,
          -48.62726,
          -434.26047
        ],
        "size": [
          107.23295,
          144.51067,
          50.29948
        ],
        "swappable": true
      },
      {
        "node": "C-Ext001_Material #25_0",
        "group": "C-Ext001_Material #25_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          64.78177,
          -49.86861,
          -434.26044
        ],
        "size": [
          107.23286,
          144.51068,
          50.29949
        ],
        "swappable": true
      },
      {
        "node": "Sphere007_Material #26_0",
        "group": "Sphere007_Material #26_0",
        "role": "payload",
        "side": "center",
        "center": [
          -2.54697,
          -36.68846,
          470.14618
        ],
        "size": [
          43.15291,
          43.15291,
          2.02149
        ],
        "swappable": true
      },
      {
        "node": "Capsule002_Material #25_0",
        "group": "Capsule002_Material #25_0",
        "role": "body",
        "side": "center",
        "center": [
          -3.07189,
          -19.49816,
          441.03714
        ],
        "size": [
          79.14027,
          89.76035,
          79.14028
        ],
        "swappable": false
      },
      {
        "node": "Tube001_Material #25_0",
        "group": "Tube001_Material #25_0",
        "role": "payload",
        "side": "center",
        "center": [
          -2.11971,
          -36.90209,
          470.08937
        ],
        "size": [
          47.85465,
          47.85465,
          4.27258
        ],
        "swappable": true
      },
      {
        "node": "Mesh002_Material #25_0",
        "group": "Mesh002_Material #25_0",
        "role": "tail",
        "side": "center",
        "center": [
          -2.576,
          -0.4177,
          -509.5885
        ],
        "size": [
          41.51321,
          40.06336,
          33.53614
        ],
        "swappable": true
      },
      {
        "node": "Cylinder006_Material #25_0",
        "group": "Cylinder006_Material #25_0",
        "role": "payload",
        "side": "center",
        "center": [
          -1.99705,
          -74.41732,
          -503.86305
        ],
        "size": [
          12.32802,
          109.3618,
          6.61181
        ],
        "swappable": true
      },
      {
        "node": "Cylinder012_Material #25_0",
        "group": "Cylinder012_Material #25_0",
        "role": "tail",
        "side": "center",
        "center": [
          -1.99705,
          74.41733,
          -503.86297
        ],
        "size": [
          12.32802,
          109.36177,
          6.61182
        ],
        "swappable": true
      },
      {
        "node": "Cylinder007_Material #25_0",
        "group": "Cylinder007_Material #25_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.99705,
          -21.04913,
          -503.72173
        ],
        "size": [
          12.36737,
          4.47674,
          4.5458
        ],
        "swappable": false
      },
      {
        "node": "Cylinder010_Material #25_0",
        "group": "Cylinder010_Material #25_0",
        "role": "body",
        "side": "center",
        "center": [
          -1.99705,
          21.04912,
          -503.72179
        ],
        "size": [
          12.36737,
          4.47671,
          4.54582
        ],
        "swappable": false
      },
      {
        "node": "Cylinder008_Material #25_0",
        "group": "Cylinder008_Material #25_0",
        "role": "tail",
        "side": "center",
        "center": [
          -1.99705,
          -12.76116,
          -503.72181
        ],
        "size": [
          12.24032,
          27.77101,
          12.05437
        ],
        "swappable": true
      },
      {
        "node": "Cylinder011_Material #25_0",
        "group": "Cylinder011_Material #25_0",
        "role": "tail",
        "side": "center",
        "center": [
          -1.99705,
          12.76112,
          -503.7218
        ],
        "size": [
          12.24033,
          27.77101,
          12.05438
        ],
        "swappable": true
      },
      {
        "node": "Cylinder004_Material #25_0",
        "group": "Cylinder004_Material #25_0",
        "role": "wing",
        "side": "left",
        "center": [
          269.56824,
          24.68952,
          219.26553
        ],
        "size": [
          564.43418,
          36.07457,
          71.61546
        ],
        "swappable": true
      },
      {
        "node": "Cylinder002_Material #25_0",
        "group": "Cylinder002_Material #25_0",
        "role": "wing",
        "side": "right",
        "center": [
          -269.56822,
          25.11615,
          214.36933
        ],
        "size": [
          564.43424,
          36.07479,
          71.61529
        ],
        "swappable": true
      },
      {
        "node": "Cylinder016__0",
        "group": "Cylinder016",
        "role": "tail",
        "side": "center",
        "center": [
          -19.60518,
          -4.36703,
          -434.11511
        ],
        "size": [
          21.9943,
          20.87079,
          16.83179
        ],
        "swappable": true
      },
      {
        "node": "Cylinder015__0",
        "group": "Cylinder015",
        "role": "tail",
        "side": "center",
        "center": [
          9.59201,
          -5.60837,
          -434.1151
        ],
        "size": [
          21.9943,
          20.87078,
          16.83179
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "KillCaptureDestroy",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/anduril-altius-700m-4e7fe35b0279418d85af34d33faa9db5"
    }
  },
  {
    "id": "matrice-300",
    "name": "DJI Matrice 300 RTK",
    "family": "consumer",
    "blurb": "Folding-arm industrial quad. Hot-swappable packs, six kilos of it, fifty-five minutes.",
    "environment": "earth",
    "model": "models/matrice-300.glb",
    "spec": {
      "span_m": 0.895,
      "length_m": 0.81,
      "empty_mass_kg": 6.3,
      "mtow_kg": 9,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.533,
      "battery_wh": 548,
      "battery_cells": 12,
      "payload_kg": 2.7,
      "cruise_kmh": 50,
      "max_speed_kmh": 82,
      "endurance_h": 0.92,
      "ceiling_m": 5000
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.08109757390084965,
    "modelExtent": [
      10.312294006347656,
      4.88865375518799,
      11.036088466644292
    ],
    "origin": [
      0.029606567695736885,
      6.535761356353762,
      0.3868156671524048
    ],
    "cuts": {},
    "hidden": [
      "polySurface4181_lambert33_0",
      "polySurface4181_lambert32_0",
      "polySurface4181_lambert35_0",
      "polySurface4181_lambert34_0"
    ],
    "parts": [
      {
        "node": "polySurface4387_lambert19_0_8",
        "group": "polySurface4387_lambert19_0_8",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.48505,
          -0.02999
        ],
        "size": [
          8.29025,
          3.70458,
          7.01683
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert19_0_4",
        "group": "polySurface4387_lambert19_0_4",
        "role": "gear",
        "side": "right",
        "center": [
          -0.22364,
          0.20768,
          -3.21175
        ],
        "size": [
          7.02905,
          0.4385,
          0.69255
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert19_0_3",
        "group": "polySurface4387_lambert19_0_3",
        "role": "gear",
        "side": "right",
        "center": [
          0.04749,
          0.15539,
          -3.2114
        ],
        "size": [
          7.34842,
          0.3816,
          0.69099
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert19_0_6",
        "group": "polySurface4387_lambert19_0_6",
        "role": "gear",
        "side": "left",
        "center": [
          3.78446,
          0.20768,
          3.13098
        ],
        "size": [
          0.72133,
          0.4385,
          0.69489
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert19_0",
        "group": "polySurface4387_lambert19_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.11184,
          0.43255,
          0.04772
        ],
        "size": [
          8.01474,
          3.84183,
          6.849
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert19_0_9",
        "group": "polySurface4387_lambert19_0_9",
        "role": "body",
        "side": "center",
        "center": [
          0,
          1.30635,
          0.15204
        ],
        "size": [
          1.23214,
          2.09423,
          2.32051
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert19_0_7",
        "group": "polySurface4387_lambert19_0_7",
        "role": "body",
        "side": "left",
        "center": [
          0.02239,
          0.50667,
          0.82661
        ],
        "size": [
          8.24547,
          3.66134,
          5.26535
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert19_0_5",
        "group": "polySurface4387_lambert19_0_5",
        "role": "body",
        "side": "center",
        "center": [
          0.0713,
          0.34504,
          0.13135
        ],
        "size": [
          7.586,
          0.0023,
          6.68136
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert19_0_2",
        "group": "polySurface4387_lambert19_0_2",
        "role": "gear",
        "side": "right",
        "center": [
          0.14782,
          0.19576,
          -3.21175
        ],
        "size": [
          7.18067,
          0.46235,
          0.69255
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert19_1",
        "group": "polySurface4387_lambert19_1",
        "role": "body",
        "side": "center",
        "center": [
          -0.35131,
          0.38541,
          -0.04234
        ],
        "size": [
          7.58764,
          0.08305,
          7.02911
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_Copper_1",
        "group": "polySurface4387_Copper_1",
        "role": "gear",
        "side": "center",
        "center": [
          0.02811,
          0.22333,
          -0.04129
        ],
        "size": [
          8.15797,
          0.21857,
          6.98917
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_Copper_0",
        "group": "polySurface4387_Copper_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          0.22333,
          -0.00098
        ],
        "size": [
          8.21591,
          0.21857,
          6.90854
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert19_0_10",
        "group": "polySurface4387_lambert19_0_10",
        "role": "arm",
        "side": "right",
        "center": [
          -1.30701,
          1.34176,
          -1.8085
        ],
        "size": [
          3.59924,
          1.99115,
          2.70027
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_Copper_0_2",
        "group": "polySurface4387_Copper_0_2",
        "role": "gear",
        "side": "right",
        "center": [
          -0.00345,
          0.22333,
          -3.21175
        ],
        "size": [
          7.40539,
          0.21857,
          0.64825
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert18_0",
        "group": "polySurface4387_lambert18_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.37138,
          -0.05712
        ],
        "size": [
          8.30245,
          3.98446,
          7.10738
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert25_0",
        "group": "polySurface4387_lambert25_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          -0.38778,
          -0.04922
        ],
        "size": [
          3.76343,
          4.11309,
          3.82235
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert3_0",
        "group": "polySurface4387_lambert3_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.36154,
          -0.04456
        ],
        "size": [
          8.25067,
          3.8652,
          6.97211
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert20_0",
        "group": "polySurface4387_lambert20_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.40356,
          0
        ],
        "size": [
          10.31229,
          1.1119,
          11.03609
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert7_0",
        "group": "polySurface4387_lambert7_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.66373,
          0.24372
        ],
        "size": [
          1.57175,
          3.28677,
          3.57074
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert5_0",
        "group": "polySurface4387_lambert5_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          -0.52288,
          -0.04033
        ],
        "size": [
          7.63397,
          1.85475,
          6.40531
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert4_0",
        "group": "polySurface4387_lambert4_0",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0.66495,
          -0.04293
        ],
        "size": [
          2.29889,
          0.40647,
          2.94635
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert8_0",
        "group": "polySurface4387_lambert8_0",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0.68834,
          0.22481
        ],
        "size": [
          1.60123,
          3.34066,
          3.61429
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert21_0",
        "group": "polySurface4387_lambert21_0",
        "role": "gear",
        "side": "left",
        "center": [
          0,
          -0.05201,
          1.48798
        ],
        "size": [
          1.38383,
          0.13787,
          1.42624
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert12_0",
        "group": "polySurface4387_lambert12_0",
        "role": "arm",
        "side": "left",
        "center": [
          0.26364,
          0.26318,
          1.91054
        ],
        "size": [
          0.94873,
          3.68398,
          0.90026
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert23_0",
        "group": "polySurface4387_lambert23_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.42262,
          -0.59757
        ],
        "size": [
          1.65291,
          1.20545,
          1.97726
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert29_0",
        "group": "polySurface4387_lambert29_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.40511,
          -1.59227
        ],
        "size": [
          7.45791,
          1.87708,
          3.78884
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert27_0",
        "group": "polySurface4387_lambert27_0",
        "role": "gear",
        "side": "center",
        "center": [
          0,
          -0.82107,
          -0.03827
        ],
        "size": [
          7.75497,
          3.20248,
          6.59021
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert31_0",
        "group": "polySurface4387_lambert31_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.39985,
          0.15924,
          1.20864
        ],
        "size": [
          0.40762,
          0.15799,
          0.41638
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert30_0",
        "group": "polySurface4387_lambert30_0",
        "role": "body",
        "side": "left",
        "center": [
          0.41236,
          0.2599,
          1.1649
        ],
        "size": [
          0.44031,
          0.32594,
          0.51154
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_Glass_2_0",
        "group": "polySurface4387_Glass_2_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.37138,
          -0.63912
        ],
        "size": [
          0.21792,
          2.14589,
          0.95437
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_Yellow_lamp_0",
        "group": "polySurface4387_Yellow_lamp_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.37138,
          -0.63912
        ],
        "size": [
          0.12817,
          2.05266,
          0.86462
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert1_0",
        "group": "polySurface4387_lambert1_0",
        "role": "body",
        "side": "left",
        "center": [
          0.41246,
          0.62901,
          0.38913
        ],
        "size": [
          1.06551,
          3.43019,
          3.03352
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_Glass_sensor_0",
        "group": "polySurface4387_Glass_sensor_0",
        "role": "payload",
        "side": "center",
        "center": [
          0,
          0.67531,
          0.23518
        ],
        "size": [
          1.5753,
          3.26716,
          3.55722
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert24_0",
        "group": "polySurface4387_lambert24_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.42262,
          -0.54625
        ],
        "size": [
          1.65291,
          1.00708,
          1.79033
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert28_0",
        "group": "polySurface4387_lambert28_0",
        "role": "arm",
        "side": "left",
        "center": [
          0,
          0.66284,
          3.31641
        ],
        "size": [
          8.28536,
          0.39254,
          0.14125
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_lambert11_0",
        "group": "polySurface4387_lambert11_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.38245,
          -0.75195
        ],
        "size": [
          0.82224,
          1.95245,
          1.18028
        ],
        "swappable": false
      },
      {
        "node": "polySurface4387_Glass_camera_5_0",
        "group": "polySurface4387_Glass_camera_5_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.66554,
          -0.91451,
          1.96436
        ],
        "size": [
          0.04489,
          0.0669,
          0.05231
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_Glass_camera_4_0",
        "group": "polySurface4387_Glass_camera_4_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.63975,
          -1.32876,
          1.59203
        ],
        "size": [
          0.12601,
          0.18782,
          0.14686
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_Glass_Camera_3_0",
        "group": "polySurface4387_Glass_Camera_3_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.52039,
          -1.30823,
          2.14267
        ],
        "size": [
          0.36161,
          0.53897,
          0.42143
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_Glass_Camera_1_0",
        "group": "polySurface4387_Glass_Camera_1_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.37182,
          -1.28938,
          2.01634
        ],
        "size": [
          0.29002,
          0.43228,
          0.33801
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_Glass_Camera_2_0",
        "group": "polySurface4387_Glass_Camera_2_0",
        "role": "gear",
        "side": "left",
        "center": [
          0.44761,
          -1.299,
          2.08079
        ],
        "size": [
          0.32945,
          0.49104,
          0.38395
        ],
        "swappable": true
      },
      {
        "node": "polySurface4387_lambert26_0",
        "group": "polySurface4387_lambert26_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          1.42262,
          -1.57791
        ],
        "size": [
          0.09248,
          0.31961,
          0.04673
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "19vitali99",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/quadcopter-dji-matrice-300-rtk-6677d02d66df4b73aad0d8e7bb9e3d9c"
    }
  },
  {
    "id": "inspire-2",
    "name": "DJI Inspire 2",
    "family": "consumer",
    "blurb": "Transforming gear: the arms lift out of shot once it is airborne.",
    "environment": "earth",
    "model": "models/inspire-2.glb",
    "spec": {
      "span_m": 0.605,
      "length_m": 0.605,
      "empty_mass_kg": 3.44,
      "mtow_kg": 4.25,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.381,
      "battery_wh": 195,
      "battery_cells": 6,
      "payload_kg": 0.81,
      "cruise_kmh": 50,
      "max_speed_kmh": 94,
      "endurance_h": 0.45,
      "ceiling_m": 5000
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.5334381671662033,
    "modelExtent": [
      1.0116514581967455,
      0.4225204659435049,
      1.1341520671720142
    ],
    "origin": [
      -0.028897601602644735,
      -0.00579834925088997,
      0.07252923370662986
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "MotorProtect_LowPoly1_DroneBody2_0",
        "group": "MotorProtect_LowPoly1_DroneBody2_0",
        "role": "motor",
        "side": "left",
        "center": [
          0.30667,
          0.01817,
          0.30942
        ],
        "size": [
          0.05176,
          0.04829,
          0.05176
        ],
        "swappable": false
      },
      {
        "node": "MotorProtect_LowPoly3_DroneBody2_0",
        "group": "MotorProtect_LowPoly3_DroneBody2_0",
        "role": "motor",
        "side": "left",
        "center": [
          -0.26777,
          0.01817,
          0.30942
        ],
        "size": [
          0.05176,
          0.04829,
          0.05176
        ],
        "swappable": false
      },
      {
        "node": "MotorProtect_LowPoly2_DroneBody2_0",
        "group": "MotorProtect_LowPoly2_DroneBody2_0",
        "role": "motor",
        "side": "right",
        "center": [
          -0.26777,
          0.01817,
          -0.32805
        ],
        "size": [
          0.05176,
          0.04829,
          0.05176
        ],
        "swappable": false
      },
      {
        "node": "MotorProtect_LowPoly_DroneBody2_0",
        "group": "MotorProtect_LowPoly_DroneBody2_0",
        "role": "motor",
        "side": "right",
        "center": [
          0.30667,
          0.01817,
          -0.32805
        ],
        "size": [
          0.05176,
          0.04829,
          0.05176
        ],
        "swappable": false
      },
      {
        "node": "Body_LowPoly_DroneBody2_0",
        "group": "Body_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01929,
          0.09157,
          -0.08488
        ],
        "size": [
          0.11029,
          0.23939,
          0.48201
        ],
        "swappable": false
      },
      {
        "node": "Camera_LowPoly_DroneBody2_0",
        "group": "Camera_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01771,
          -0.14145,
          -0.26134
        ],
        "size": [
          0.10108,
          0.06915,
          0.10028
        ],
        "swappable": false
      },
      {
        "node": "LensFrontRight_LowPoly_Lens1_0",
        "group": "LensFrontRight_LowPoly_Lens1_0",
        "role": "gear",
        "side": "right",
        "center": [
          0.09306,
          -0.0018,
          -0.30966
        ],
        "size": [
          0.01461,
          0.0153,
          0.00588
        ],
        "swappable": true
      },
      {
        "node": "LensFrontLeft_LowPoly_Lens1_0",
        "group": "LensFrontLeft_LowPoly_Lens1_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.05466,
          -0.00147,
          -0.30966
        ],
        "size": [
          0.01461,
          0.0153,
          0.00588
        ],
        "swappable": true
      },
      {
        "node": "LensFrontMid_LowPoly_Lens1_0",
        "group": "LensFrontMid_LowPoly_Lens1_0",
        "role": "gear",
        "side": "right",
        "center": [
          0.01865,
          0.00906,
          -0.3305
        ],
        "size": [
          0.008,
          0.00838,
          0.00322
        ],
        "swappable": true
      },
      {
        "node": "LensFront_LowPoly_Lens1_0",
        "group": "LensFront_LowPoly_Lens1_0",
        "role": "gear",
        "side": "right",
        "center": [
          0.01732,
          -0.14189,
          -0.28725
        ],
        "size": [
          0.03489,
          0.03655,
          0.01405
        ],
        "swappable": true
      },
      {
        "node": "CameraBase_LowPoly_DroneBody2_0",
        "group": "CameraBase_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          -0.01962,
          -0.23446
        ],
        "size": [
          0.17495,
          0.04907,
          0.11852
        ],
        "swappable": false
      },
      {
        "node": "MotorLeg_LowPoly1_DroneBody2_0",
        "group": "MotorLeg_LowPoly1_DroneBody2_0",
        "role": "motor",
        "side": "left",
        "center": [
          0.30621,
          -0.10868,
          0.27789
        ],
        "size": [
          0.05424,
          0.20516,
          0.11632
        ],
        "swappable": false
      },
      {
        "node": "MotorLeg_LowPoly3_DroneBody2_0",
        "group": "MotorLeg_LowPoly3_DroneBody2_0",
        "role": "motor",
        "side": "left",
        "center": [
          -0.26823,
          -0.10868,
          0.27789
        ],
        "size": [
          0.05424,
          0.20516,
          0.11632
        ],
        "swappable": false
      },
      {
        "node": "MotorLeg_LowPoly2_DroneBody2_0",
        "group": "MotorLeg_LowPoly2_DroneBody2_0",
        "role": "motor",
        "side": "right",
        "center": [
          -0.26823,
          -0.10868,
          -0.29703
        ],
        "size": [
          0.05424,
          0.20516,
          0.11632
        ],
        "swappable": false
      },
      {
        "node": "MotorLeg_LowPoly_DroneBody2_0",
        "group": "MotorLeg_LowPoly_DroneBody2_0",
        "role": "motor",
        "side": "right",
        "center": [
          0.30621,
          -0.10868,
          -0.29703
        ],
        "size": [
          0.05424,
          0.20516,
          0.11632
        ],
        "swappable": false
      },
      {
        "node": "Blade_LowPoly1_DroneBody2_0",
        "group": "Blade_LowPoly1_DroneBody2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.30666,
          0.0551,
          0.30946
        ],
        "size": [
          0.39833,
          0.01752,
          0.38088
        ],
        "swappable": true
      },
      {
        "node": "Blade_LowPoly3_DroneBody2_0",
        "group": "Blade_LowPoly3_DroneBody2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.26765,
          0.0551,
          0.3095
        ],
        "size": [
          0.17215,
          0.01752,
          0.51515
        ],
        "swappable": true
      },
      {
        "node": "Blade_LowPoly2_DroneBody2_0",
        "group": "Blade_LowPoly2_DroneBody2_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.26785,
          0.0551,
          -0.32788
        ],
        "size": [
          0.47595,
          0.01752,
          0.27214
        ],
        "swappable": true
      },
      {
        "node": "Blade_LowPoly_DroneBody2_0",
        "group": "Blade_LowPoly_DroneBody2_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.30663,
          0.0551,
          -0.32799
        ],
        "size": [
          0.26783,
          0.01752,
          0.47818
        ],
        "swappable": true
      },
      {
        "node": "SideCamera_LowPoly_DroneBody2_0",
        "group": "SideCamera_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.0047,
          -0.29269
        ],
        "size": [
          0.17478,
          0.03932,
          0.04797
        ],
        "swappable": false
      },
      {
        "node": "CameraArm_LowPoly_DroneBody2_0",
        "group": "CameraArm_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01724,
          -0.10423,
          -0.22713
        ],
        "size": [
          0.12162,
          0.11903,
          0.12923
        ],
        "swappable": false
      },
      {
        "node": "MidPart_LowPoly_DroneBody2_0",
        "group": "MidPart_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.06247,
          -0.12489
        ],
        "size": [
          0.04561,
          0.14304,
          0.05909
        ],
        "swappable": false
      },
      {
        "node": "Tube03_LowPoly2_DroneBody2_0",
        "group": "Tube03_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.01029,
          0.14408,
          -0.18513
        ],
        "size": [
          0.04219,
          0.05389,
          0.05275
        ],
        "swappable": false
      },
      {
        "node": "Tube03_LowPoly_DroneBody2_0",
        "group": "Tube03_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.04823,
          0.14408,
          -0.18513
        ],
        "size": [
          0.04219,
          0.05389,
          0.05275
        ],
        "swappable": false
      },
      {
        "node": "Tube04_LowPoly2_DroneBody2_0",
        "group": "Tube04_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.01175,
          0.13791,
          -0.18513
        ],
        "size": [
          0.04295,
          0.05659,
          0.05275
        ],
        "swappable": false
      },
      {
        "node": "Tube04_LowPoly_DroneBody2_0",
        "group": "Tube04_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.04969,
          0.13791,
          -0.18513
        ],
        "size": [
          0.04295,
          0.05659,
          0.05275
        ],
        "swappable": false
      },
      {
        "node": "MiddleBackPartLeg_LowPoly2_DroneBody2_0",
        "group": "MiddleBackPartLeg_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.26391,
          -0.04067,
          0.03589
        ],
        "size": [
          0.04909,
          0.06889,
          0.03129
        ],
        "swappable": false
      },
      {
        "node": "MiddleBackPartLeg_LowPoly_DroneBody2_0",
        "group": "MiddleBackPartLeg_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "left",
        "center": [
          0.30184,
          -0.04067,
          0.03589
        ],
        "size": [
          0.04909,
          0.06889,
          0.03129
        ],
        "swappable": false
      },
      {
        "node": "Tube01_LowPoly_DroneBody2_0",
        "group": "Tube01_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.02532,
          0.05061,
          -0.15644
        ],
        "size": [
          0.00582,
          0.08448,
          0.01854
        ],
        "swappable": false
      },
      {
        "node": "Tube02_LowPoly_DroneBody2_0",
        "group": "Tube02_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01798,
          0.0506,
          -0.15475
        ],
        "size": [
          0.00413,
          0.08445,
          0.01654
        ],
        "swappable": false
      },
      {
        "node": "Softer_LowPoly_DroneBody2_0",
        "group": "Softer_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          -0.01373,
          -0.28153
        ],
        "size": [
          0.17447,
          0.02001,
          0.0225
        ],
        "swappable": false
      },
      {
        "node": "ScrewHolder_LowPoly_DroneBody2_0",
        "group": "ScrewHolder_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.0813,
          -0.12486
        ],
        "size": [
          0.04731,
          0.05762,
          0.02515
        ],
        "swappable": false
      },
      {
        "node": "MiddleTopLeg_LowPoly6_DroneBody2_0",
        "group": "MiddleTopLeg_LowPoly6_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.03365,
          0.102,
          -0.12172
        ],
        "size": [
          0.06869,
          0.05986,
          0.08493
        ],
        "swappable": false
      },
      {
        "node": "MiddleTopLeg_LowPoly_DroneBody2_0",
        "group": "MiddleTopLeg_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.07158,
          0.102,
          -0.12172
        ],
        "size": [
          0.06869,
          0.05986,
          0.08493
        ],
        "swappable": false
      },
      {
        "node": "BladeHolder01_LowPoly1_DroneBody2_0",
        "group": "BladeHolder01_LowPoly1_DroneBody2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.30666,
          0.05029,
          0.30945
        ],
        "size": [
          0.03202,
          0.01633,
          0.03335
        ],
        "swappable": true
      },
      {
        "node": "BladeHolder01_LowPoly3_DroneBody2_0",
        "group": "BladeHolder01_LowPoly3_DroneBody2_0",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.26778,
          0.05029,
          0.30945
        ],
        "size": [
          0.03905,
          0.01633,
          0.03052
        ],
        "swappable": true
      },
      {
        "node": "BladeHolder01_LowPoly2_DroneBody2_0",
        "group": "BladeHolder01_LowPoly2_DroneBody2_0",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.26778,
          0.05029,
          -0.32802
        ],
        "size": [
          0.03049,
          0.01633,
          0.03657
        ],
        "swappable": true
      },
      {
        "node": "BladeHolder01_LowPoly_DroneBody2_0",
        "group": "BladeHolder01_LowPoly_DroneBody2_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.30667,
          0.05029,
          -0.32802
        ],
        "size": [
          0.03672,
          0.01633,
          0.03051
        ],
        "swappable": true
      },
      {
        "node": "MiddleSmallTube_LowPoly_DroneBody2_0",
        "group": "MiddleSmallTube_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.05161,
          -0.0971
        ],
        "size": [
          0.04102,
          0.01515,
          0.02624
        ],
        "swappable": false
      },
      {
        "node": "FrontCameraHolder_LowPoly_DroneBody2_0",
        "group": "FrontCameraHolder_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.00948,
          -0.31062
        ],
        "size": [
          0.03268,
          0.02474,
          0.03221
        ],
        "swappable": false
      },
      {
        "node": "MiddlePartLeg_LowPoly2_DroneBody2_0",
        "group": "MiddlePartLeg_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.25297,
          -0.01756,
          -0.02226
        ],
        "size": [
          0.07096,
          0.05643,
          0.09646
        ],
        "swappable": false
      },
      {
        "node": "MiddlePartLeg_LowPoly_DroneBody2_0",
        "group": "MiddlePartLeg_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "center",
        "center": [
          0.29091,
          -0.01756,
          -0.02226
        ],
        "size": [
          0.07096,
          0.05643,
          0.09646
        ],
        "swappable": false
      },
      {
        "node": "ScrewLegHolder_LowPoly_DroneBody2_0",
        "group": "ScrewLegHolder_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.03632,
          0.05705,
          -0.12491
        ],
        "size": [
          0.00572,
          0.00572,
          0.02344
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly7_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly7_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.03123,
          0.1122,
          -0.16508
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly6_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly6_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.02982,
          0.1197,
          -0.16508
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly5_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly5_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.06781,
          0.11947,
          -0.16508
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly4_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly4_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.06926,
          0.1122,
          -0.16508
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly3_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly3_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01809,
          0.01062,
          -0.14849
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly2_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.02658,
          0.01062,
          -0.14849
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly1_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly1_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.02459,
          0.09074,
          -0.14849
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "TubeEndPoint_LowPoly_DroneBody2_0",
        "group": "TubeEndPoint_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01772,
          0.09074,
          -0.14849
        ],
        "size": [
          0.00575,
          0.00575,
          0.00199
        ],
        "swappable": false
      },
      {
        "node": "BodyKnob_LowPoly_DroneBody2_0",
        "group": "BodyKnob_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01897,
          0.17627,
          0.07697
        ],
        "size": [
          0.03248,
          0.01368,
          0.03334
        ],
        "swappable": false
      },
      {
        "node": "FrontCamera_LowPoly_DroneBody2_0",
        "group": "FrontCamera_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.01075,
          -0.32432
        ],
        "size": [
          0.02044,
          0.01839,
          0.01393
        ],
        "swappable": false
      },
      {
        "node": "Battery_LowPoly2_DroneBody2_0",
        "group": "Battery_LowPoly2_DroneBody2_0",
        "role": "battery",
        "side": "left",
        "center": [
          -0.02312,
          0.07909,
          0.0495
        ],
        "size": [
          0.05132,
          0.13157,
          0.17667
        ],
        "swappable": false
      },
      {
        "node": "Battery_LowPoly3_DroneBody2_0",
        "group": "Battery_LowPoly3_DroneBody2_0",
        "role": "battery",
        "side": "left",
        "center": [
          0.05995,
          0.07909,
          0.0495
        ],
        "size": [
          0.05132,
          0.13157,
          0.17667
        ],
        "swappable": false
      },
      {
        "node": "Brain_LowPoly_DroneBody2_0",
        "group": "Brain_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.08482,
          -0.22568
        ],
        "size": [
          0.08137,
          0.13747,
          0.1293
        ],
        "swappable": false
      },
      {
        "node": "LegHolderRight_LowPoly2_DroneBody2_0",
        "group": "LegHolderRight_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.00341,
          0.07478,
          -0.12468
        ],
        "size": [
          0.01593,
          0.03997,
          0.03759
        ],
        "swappable": false
      },
      {
        "node": "LegHolderRight_LowPoly_DroneBody2_0",
        "group": "LegHolderRight_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.04134,
          0.07478,
          -0.12468
        ],
        "size": [
          0.01593,
          0.03997,
          0.03759
        ],
        "swappable": false
      },
      {
        "node": "TopBrain_LowPoly_DroneBody2_0",
        "group": "TopBrain_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.14673,
          -0.17093
        ],
        "size": [
          0.06068,
          0.02094,
          0.06346
        ],
        "swappable": false
      },
      {
        "node": "TopBoxScrew_LowPoly_DroneBody2_0",
        "group": "TopBoxScrew_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.1604,
          -0.10948
        ],
        "size": [
          0.06068,
          0.0483,
          0.06908
        ],
        "swappable": false
      },
      {
        "node": "SmallLegTube_LowPoly2_DroneBody2_0",
        "group": "SmallLegTube_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.12357,
          -0.00702,
          -0.03271
        ],
        "size": [
          0.24763,
          0.12641,
          0.12726
        ],
        "swappable": false
      },
      {
        "node": "SmallLegTube_LowPoly3_DroneBody2_0",
        "group": "SmallLegTube_LowPoly3_DroneBody2_0",
        "role": "body",
        "side": "center",
        "center": [
          0.16151,
          -0.00702,
          -0.03271
        ],
        "size": [
          0.24763,
          0.12641,
          0.12726
        ],
        "swappable": false
      },
      {
        "node": "BigLegTube_LowPoly1_DroneBody2_0",
        "group": "BigLegTube_LowPoly1_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.13389,
          0.04765,
          -0.07721
        ],
        "size": [
          0.21885,
          0.14251,
          0.12701
        ],
        "swappable": false
      },
      {
        "node": "Motor_LowPoly1_DroneBody2_0",
        "group": "Motor_LowPoly1_DroneBody2_0",
        "role": "motor",
        "side": "left",
        "center": [
          0.30667,
          0.01833,
          0.30942
        ],
        "size": [
          0.03096,
          0.04641,
          0.03096
        ],
        "swappable": false
      },
      {
        "node": "Motor_LowPoly3_DroneBody2_0",
        "group": "Motor_LowPoly3_DroneBody2_0",
        "role": "motor",
        "side": "left",
        "center": [
          -0.26777,
          0.01833,
          0.30942
        ],
        "size": [
          0.03096,
          0.04641,
          0.03096
        ],
        "swappable": false
      },
      {
        "node": "Motor_LowPoly2_DroneBody2_0",
        "group": "Motor_LowPoly2_DroneBody2_0",
        "role": "motor",
        "side": "right",
        "center": [
          -0.26777,
          0.01833,
          -0.32805
        ],
        "size": [
          0.03096,
          0.04641,
          0.03096
        ],
        "swappable": false
      },
      {
        "node": "LegTube_LowPoly2_DroneBody2_0",
        "group": "LegTube_LowPoly2_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.26815,
          -0.026,
          -0.15526
        ],
        "size": [
          0.03042,
          0.03018,
          0.16985
        ],
        "swappable": false
      },
      {
        "node": "LegTube_LowPoly3_DroneBody2_0",
        "group": "LegTube_LowPoly3_DroneBody2_0",
        "role": "body",
        "side": "left",
        "center": [
          -0.26768,
          -0.026,
          0.13474
        ],
        "size": [
          0.03042,
          0.03018,
          0.16985
        ],
        "swappable": false
      },
      {
        "node": "LegTube_LowPoly1_DroneBody2_0",
        "group": "LegTube_LowPoly1_DroneBody2_0",
        "role": "body",
        "side": "left",
        "center": [
          0.30677,
          -0.026,
          0.13474
        ],
        "size": [
          0.03042,
          0.03018,
          0.16985
        ],
        "swappable": false
      },
      {
        "node": "Motor_LowPoly_DroneBody2_0",
        "group": "Motor_LowPoly_DroneBody2_0",
        "role": "motor",
        "side": "right",
        "center": [
          0.30667,
          0.01833,
          -0.32805
        ],
        "size": [
          0.03096,
          0.04641,
          0.03096
        ],
        "swappable": false
      },
      {
        "node": "BigLegTube_LowPoly_DroneBody2_0",
        "group": "BigLegTube_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.16753,
          0.04895,
          -0.07791
        ],
        "size": [
          0.21885,
          0.14251,
          0.12701
        ],
        "swappable": false
      },
      {
        "node": "LegTube_LowPoly_DroneBody2_0",
        "group": "LegTube_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.30629,
          -0.026,
          -0.15526
        ],
        "size": [
          0.03042,
          0.03018,
          0.16985
        ],
        "swappable": false
      },
      {
        "node": "BatteryKnob_LowPoly1_DroneBody2_0",
        "group": "BatteryKnob_LowPoly1_DroneBody2_0",
        "role": "battery",
        "side": "center",
        "center": [
          -0.04819,
          0.11045,
          -0.02423
        ],
        "size": [
          0.00373,
          0.01726,
          0.01735
        ],
        "swappable": false
      },
      {
        "node": "Memory_LowPoly_DroneBody2_0",
        "group": "Memory_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "left",
        "center": [
          0.01897,
          0.04502,
          0.14148
        ],
        "size": [
          0.02931,
          0.03013,
          0.01459
        ],
        "swappable": false
      },
      {
        "node": "BatteryKnob_LowPoly2_DroneBody2_0",
        "group": "BatteryKnob_LowPoly2_DroneBody2_0",
        "role": "battery",
        "side": "center",
        "center": [
          0.08426,
          0.11045,
          -0.02452
        ],
        "size": [
          0.00257,
          0.01726,
          0.01726
        ],
        "swappable": false
      },
      {
        "node": "Screw_LowPoly_DroneBody2_0",
        "group": "Screw_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01911,
          0.04136,
          -0.12486
        ],
        "size": [
          0.00981,
          0.03137,
          0.00981
        ],
        "swappable": false
      },
      {
        "node": "RandomCube_LowPoly_DroneBody2_0",
        "group": "RandomCube_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.01897,
          0.13456,
          -0.12151
        ],
        "size": [
          0.06563,
          0.002,
          0.08528
        ],
        "swappable": false
      },
      {
        "node": "FrontHolder_LowPoly_DroneBody2_0",
        "group": "FrontHolder_LowPoly_DroneBody2_0",
        "role": "body",
        "side": "right",
        "center": [
          0.0192,
          0.01315,
          -0.25253
        ],
        "size": [
          0.04078,
          0.01916,
          0.06503
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "Leon Heytens",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/dji-inspire-2-c0e0841b557446b0926476152456dbbb"
    }
  },
  {
    "id": "avata",
    "name": "DJI Avata",
    "family": "consumer",
    "blurb": "Ducted cinewhoop. Bounces off things and keeps flying.",
    "environment": "earth",
    "model": "models/avata.glb",
    "spec": {
      "span_m": 0.18,
      "length_m": 0.18,
      "empty_mass_kg": 0.41,
      "mtow_kg": 0.5,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.076,
      "battery_wh": 35.7,
      "battery_cells": 4,
      "payload_kg": 0.05,
      "cruise_kmh": 40,
      "max_speed_kmh": 97,
      "endurance_h": 0.3,
      "ceiling_m": 5000
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.000976799195855862,
    "modelExtent": [
      181.5603360016024,
      80.42662625941347,
      184.27533597863555
    ],
    "origin": [
      -3.080316199785983,
      18.73529385412816,
      -13.354275092463958
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Object_2",
        "group": "Object_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.53876,
          6.23877,
          16.49936
        ],
        "size": [
          103.64323,
          53.15616,
          140.02784
        ],
        "swappable": true
      },
      {
        "node": "Object_12",
        "group": "Object_12",
        "role": "body",
        "side": "left",
        "center": [
          -0.69382,
          3.44959,
          7.0688
        ],
        "size": [
          179.43942,
          52.5439,
          154.74143
        ],
        "swappable": false
      },
      {
        "node": "Object_11",
        "group": "Object_11",
        "role": "body",
        "side": "left",
        "center": [
          -3.42207,
          -1.62353,
          16.76549
        ],
        "size": [
          174.7162,
          75.06061,
          145.29531
        ],
        "swappable": false
      },
      {
        "node": "Object_10",
        "group": "Object_10",
        "role": "body",
        "side": "left",
        "center": [
          0.18079,
          6.17312,
          6.8425
        ],
        "size": [
          181.19877,
          65.94823,
          170.1751
        ],
        "swappable": false
      },
      {
        "node": "Object_9",
        "group": "Object_9",
        "role": "body",
        "side": "left",
        "center": [
          0.23717,
          0.63639,
          6.84971
        ],
        "size": [
          180.82528,
          79.12521,
          163.498
        ],
        "swappable": false
      },
      {
        "node": "Object_8",
        "group": "Object_8",
        "role": "arm",
        "side": "left",
        "center": [
          -8.89425,
          0.52046,
          36.61048
        ],
        "size": [
          160.38804,
          79.3857,
          111.05437
        ],
        "swappable": false
      },
      {
        "node": "Object_7",
        "group": "Object_7",
        "role": "arm",
        "side": "left",
        "center": [
          -27.66916,
          0.27484,
          12.67554
        ],
        "size": [
          121.79081,
          79.87674,
          158.91139
        ],
        "swappable": false
      },
      {
        "node": "Object_6",
        "group": "Object_6",
        "role": "body",
        "side": "center",
        "center": [
          -0.59487,
          -24.09185,
          -1.74946
        ],
        "size": [
          179.64746,
          32.20735,
          180.77641
        ],
        "swappable": false
      },
      {
        "node": "Object_5",
        "group": "Object_5",
        "role": "body",
        "side": "center",
        "center": [
          0.48878,
          -0.77733,
          -1.54755
        ],
        "size": [
          178.09407,
          78.87196,
          180.2987
        ],
        "swappable": false
      },
      {
        "node": "Object_4",
        "group": "Object_4",
        "role": "body",
        "side": "left",
        "center": [
          11.38746,
          5.80045,
          17.75554
        ],
        "size": [
          125.80578,
          53.95511,
          139.37227
        ],
        "swappable": false
      },
      {
        "node": "Object_3",
        "group": "Object_3",
        "role": "body",
        "side": "left",
        "center": [
          -10.61256,
          0.42998,
          13.65205
        ],
        "size": [
          125.08925,
          70.93339,
          149.00697
        ],
        "swappable": false
      },
      {
        "node": "Object_13",
        "group": "Object_13",
        "role": "body",
        "side": "left",
        "center": [
          0.97124,
          5.65752,
          15.71888
        ],
        "size": [
          106.15834,
          59.81275,
          137.4754
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "Archive RO_BG",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/dji-avata-b338aae3a00145dc8dbb7c60135ba2bb"
    }
  },
  {
    "id": "px4-vtol",
    "name": "Standard VTOL",
    "family": "experimental",
    "blurb": "Quadplane. Four rotors to get up, a wing and a pusher to go anywhere.",
    "environment": "earth",
    "model": "models/px4-vtol.glb",
    "spec": {
      "span_m": 2,
      "length_m": 1.2,
      "wing_area_m2": 0.45,
      "empty_mass_kg": 5.025,
      "mtow_kg": 7,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.254,
      "battery_wh": 74,
      "battery_cells": 6,
      "payload_kg": 1.97,
      "cruise_kmh": 60,
      "max_speed_kmh": 90,
      "endurance_h": 0.5,
      "ceiling_m": 1500
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.9298794459057069,
    "modelExtent": [
      1.01303950420589,
      2.150816440567724,
      0.3073487880810744
    ],
    "origin": [
      0.023245047885034287,
      0.00350168037430465,
      0.05401959404422335
    ],
    "cuts": {
      "wing": {
        "axis": 1,
        "axisName": "span",
        "keep": 0.129049,
        "origin": 0.003502
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          0.04113,
          0,
          0
        ],
        "size": [
          0.93077,
          2.15082,
          0.30735
        ],
        "swappable": false
      },
      {
        "node": "rotor_puller",
        "group": "rotor_puller",
        "role": "rotor",
        "side": "center",
        "center": [
          -0.28336,
          -0.00385,
          -0.05053
        ],
        "size": [
          0.00827,
          0.02244,
          0.20619
        ],
        "swappable": true
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.37765,
          -0.35393,
          0.01585
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.32235,
          0.34607,
          0.01585
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.37765,
          0.34607,
          0.01585
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.32235,
          -0.35393,
          0.01585
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "right_elevon",
        "group": "right_elevon",
        "role": "wing",
        "side": "right",
        "center": [
          -0.26203,
          -0.73704,
          -0.05977
        ],
        "size": [
          0.18358,
          0.485,
          0.01157
        ],
        "swappable": true
      },
      {
        "node": "left_elevon",
        "group": "left_elevon",
        "role": "wing",
        "side": "left",
        "center": [
          -0.26291,
          0.738,
          -0.05977
        ],
        "size": [
          0.18358,
          0.485,
          0.01157
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "PX4 / Open Robotics",
      "license": "BSD-3-Clause",
      "licenseName": "BSD 3-Clause",
      "url": "https://app.gazebosim.org/PX4/fuel/models/Standard%20VTOL"
    }
  },
  {
    "id": "px4-tailsitter",
    "name": "Quad tailsitter",
    "family": "experimental",
    "blurb": "Sits on its tail, takes off straight up, then tips over and flies on its wing.",
    "environment": "earth",
    "model": "models/px4-tailsitter.glb",
    "spec": {
      "span_m": 1,
      "length_m": 0.6,
      "wing_area_m2": 0.25,
      "empty_mass_kg": 1.62,
      "mtow_kg": 2.4,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.203,
      "battery_wh": 22,
      "battery_cells": 4,
      "payload_kg": 0.78,
      "cruise_kmh": 55,
      "max_speed_kmh": 80,
      "endurance_h": 0.4,
      "ceiling_m": 1000
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.9345482437366108,
    "modelExtent": [
      0.5475765092472888,
      1.0700357169381571,
      0.5020089894533157
    ],
    "origin": [
      -0.002473247873905682,
      -0.0000036815656340172254,
      0.45622249096632006
    ],
    "cuts": {
      "wing": {
        "axis": 1,
        "axisName": "span",
        "keep": 0.080253,
        "origin": -0.000004
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          -0.00229,
          0,
          0
        ],
        "size": [
          0.33571,
          1.07004,
          0.50201
        ],
        "swappable": false
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.14319,
          -0.22978,
          0.00473
        ],
        "size": [
          0.25405,
          0.02828,
          0.04468
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.14677,
          0.22998,
          0.00446
        ],
        "size": [
          0.25405,
          0.02828,
          0.04468
        ],
        "swappable": true
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.14679,
          0.22946,
          0.00538
        ],
        "size": [
          0.254,
          0.02828,
          0.04466
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.14312,
          -0.2303,
          0.00374
        ],
        "size": [
          0.25405,
          0.02829,
          0.04468
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "PX4 / Open Robotics",
      "license": "BSD-3-Clause",
      "licenseName": "BSD 3-Clause",
      "url": "https://app.gazebosim.org/PX4/fuel/models/quadtailsitter"
    }
  },
  {
    "id": "px4-tiltrotor",
    "name": "Tiltrotor VTOL",
    "family": "experimental",
    "blurb": "The rotors themselves swivel forward. No dead weight once it is up.",
    "environment": "earth",
    "model": "models/px4-tiltrotor.glb",
    "spec": {
      "span_m": 2,
      "length_m": 1.1,
      "wing_area_m2": 0.4,
      "empty_mass_kg": 5.12,
      "mtow_kg": 7,
      "powertrain": "electric",
      "rotors": 4,
      "rotor_diameter_m": 0.254,
      "battery_wh": 74,
      "battery_cells": 6,
      "payload_kg": 1.88,
      "cruise_kmh": 65,
      "max_speed_kmh": 95,
      "endurance_h": 0.5,
      "ceiling_m": 1500
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.9298794459057069,
    "modelExtent": [
      1.01303950420589,
      2.150816440567724,
      0.3073487880810744
    ],
    "origin": [
      0.023245047885034287,
      0.00350168037430465,
      0.05401959404422335
    ],
    "cuts": {
      "wing": {
        "axis": 1,
        "axisName": "span",
        "keep": 0.129049,
        "origin": 0.003502
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          0.04113,
          0,
          0
        ],
        "size": [
          0.93077,
          2.15082,
          0.30735
        ],
        "swappable": false
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.37394,
          -0.3534,
          0.01588
        ],
        "size": [
          0.25768,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "left",
        "center": [
          0.32606,
          0.3466,
          0.01588
        ],
        "size": [
          0.25768,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.37765,
          0.34607,
          0.01585
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.32235,
          -0.35393,
          0.01585
        ],
        "size": [
          0.25774,
          0.02804,
          0.01031
        ],
        "swappable": true
      },
      {
        "node": "right_elevon",
        "group": "right_elevon",
        "role": "wing",
        "side": "right",
        "center": [
          -0.26203,
          -0.73704,
          -0.05977
        ],
        "size": [
          0.18358,
          0.485,
          0.01157
        ],
        "swappable": true
      },
      {
        "node": "left_elevon",
        "group": "left_elevon",
        "role": "wing",
        "side": "left",
        "center": [
          -0.26291,
          0.738,
          -0.05977
        ],
        "size": [
          0.18358,
          0.485,
          0.01157
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "PX4 / Open Robotics",
      "license": "BSD-3-Clause",
      "licenseName": "BSD 3-Clause",
      "url": "https://app.gazebosim.org/PX4/fuel/models/tiltrotor"
    }
  },
  {
    "id": "px4-omnicopter",
    "name": "Omnicopter",
    "family": "experimental",
    "blurb": "Eight rotors, none of them pointing the same way. Can hold any attitude it likes.",
    "environment": "earth",
    "model": "models/px4-omnicopter.glb",
    "spec": {
      "span_m": 0.6,
      "length_m": 0.6,
      "empty_mass_kg": 1.54,
      "mtow_kg": 2.3,
      "powertrain": "electric",
      "rotors": 8,
      "rotor_diameter_m": 0.152,
      "battery_wh": 35.7,
      "battery_cells": 4,
      "payload_kg": 0.76,
      "cruise_kmh": 30,
      "max_speed_kmh": 50,
      "endurance_h": 0.2,
      "ceiling_m": 500
    },
    "axes": {
      "span": 1,
      "length": 2,
      "vertical": 0
    },
    "aftSign": 1,
    "scaleToMetres": 1.619405720404423,
    "modelExtent": [
      0.37044040113687515,
      0.37050628662109375,
      0.3704753816127777
    ],
    "origin": [
      0.0026909713447093864,
      -0.009661353826522834,
      -0.011659201979637157
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          0,
          0,
          0
        ],
        "size": [
          0.37044,
          0.37051,
          0.37048
        ],
        "swappable": false
      },
      {
        "node": "rotor_7",
        "group": "rotor_7",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.1029,
          -0.09045,
          -0.0885
        ],
        "size": [
          0.07828,
          0.02266,
          0.1018
        ],
        "swappable": true
      },
      {
        "node": "rotor_6",
        "group": "rotor_6",
        "role": "rotor",
        "side": "right",
        "center": [
          0.09705,
          -0.09027,
          -0.08817
        ],
        "size": [
          0.11567,
          0.05283,
          0.03216
        ],
        "swappable": true
      },
      {
        "node": "rotor_5",
        "group": "rotor_5",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.1031,
          0.10982,
          -0.08824
        ],
        "size": [
          0.11567,
          0.05283,
          0.03216
        ],
        "swappable": true
      },
      {
        "node": "rotor_4",
        "group": "rotor_4",
        "role": "rotor",
        "side": "left",
        "center": [
          0.09711,
          0.10979,
          -0.08793
        ],
        "size": [
          0.07828,
          0.02266,
          0.1018
        ],
        "swappable": true
      },
      {
        "node": "rotor_3",
        "group": "rotor_3",
        "role": "rotor",
        "side": "right",
        "center": [
          -0.10289,
          -0.09021,
          0.11207
        ],
        "size": [
          0.07828,
          0.02266,
          0.1018
        ],
        "swappable": true
      },
      {
        "node": "rotor_2",
        "group": "rotor_2",
        "role": "rotor",
        "side": "right",
        "center": [
          0.0969,
          -0.09018,
          0.11176
        ],
        "size": [
          0.11567,
          0.05283,
          0.03216
        ],
        "swappable": true
      },
      {
        "node": "rotor_1",
        "group": "rotor_1",
        "role": "rotor",
        "side": "left",
        "center": [
          -0.1046,
          0.11098,
          0.11177
        ],
        "size": [
          0.11645,
          0.052,
          0.0312
        ],
        "swappable": true
      },
      {
        "node": "rotor_0",
        "group": "rotor_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0.0958,
          0.1096,
          0.10994
        ],
        "size": [
          0.07813,
          0.02191,
          0.10206
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "PX4 / Open Robotics",
      "license": "BSD-3-Clause",
      "licenseName": "BSD 3-Clause",
      "url": "https://app.gazebosim.org/PX4/fuel/models/Omnicopter"
    }
  },
  {
    "id": "px4-plane",
    "name": "Advanced Plane",
    "family": "experimental",
    "blurb": "Plain fixed-wing trainer. The airframe every autopilot is tuned against first.",
    "environment": "earth",
    "model": "models/px4-plane.glb",
    "spec": {
      "span_m": 2,
      "length_m": 1.1,
      "wing_area_m2": 0.3,
      "empty_mass_kg": 1.005,
      "mtow_kg": 1.8,
      "powertrain": "electric",
      "rotors": 1,
      "rotor_diameter_m": 0.254,
      "battery_wh": 22,
      "battery_cells": 4,
      "payload_kg": 0.8,
      "cruise_kmh": 60,
      "max_speed_kmh": 100,
      "endurance_h": 0.6,
      "ceiling_m": 1500
    },
    "axes": {
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": -1,
    "scaleToMetres": 0.04604555329460049,
    "modelExtent": [
      31.564301013946533,
      43.43524742126465,
      10.322258472442627
    ],
    "origin": [
      -10.4343466091156,
      0.01959514617919922,
      3.6714750957489013
    ],
    "cuts": {
      "wing": {
        "axis": 1,
        "axisName": "span",
        "keep": 2.171762,
        "origin": 0.019595,
        "bandLength": [
          -4.734645,
          14.203935
        ]
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "base_link",
        "group": "base_link",
        "role": "body",
        "side": "center",
        "center": [
          0.76146,
          0,
          0
        ],
        "size": [
          30.04139,
          43.43525,
          10.32226
        ],
        "swappable": false
      },
      {
        "node": "rotor_puller",
        "group": "rotor_puller",
        "role": "rotor",
        "side": "center",
        "center": [
          10.6442,
          -0.02003,
          -3.66714
        ],
        "size": [
          0.01034,
          0.02804,
          0.25774
        ],
        "swappable": true
      },
      {
        "node": "rudder",
        "group": "rudder",
        "role": "tail",
        "side": "center",
        "center": [
          -13.58616,
          0.02231,
          1.1946
        ],
        "size": [
          4.39197,
          0.3404,
          7.11346
        ],
        "swappable": true
      },
      {
        "node": "elevator",
        "group": "elevator",
        "role": "tail",
        "side": "center",
        "center": [
          -12.43604,
          0.02517,
          -1.48842
        ],
        "size": [
          2.23557,
          11.77849,
          0.27835
        ],
        "swappable": true
      },
      {
        "node": "right_elevon",
        "group": "right_elevon",
        "role": "wing",
        "side": "right",
        "center": [
          3.87819,
          -14.53897,
          2.08378
        ],
        "size": [
          2.13414,
          8.82223,
          0.78866
        ],
        "swappable": true
      },
      {
        "node": "left_elevon",
        "group": "left_elevon",
        "role": "wing",
        "side": "left",
        "center": [
          3.92894,
          14.54497,
          2.08378
        ],
        "size": [
          2.16487,
          8.81452,
          0.78866
        ],
        "swappable": true
      },
      {
        "node": "right_flap",
        "group": "right_flap",
        "role": "wing",
        "side": "right",
        "center": [
          3.50399,
          -6.17867,
          1.82862
        ],
        "size": [
          1.51817,
          7.90999,
          0.85052
        ],
        "swappable": true
      },
      {
        "node": "left_flap",
        "group": "left_flap",
        "role": "wing",
        "side": "left",
        "center": [
          3.5239,
          6.18998,
          1.81316
        ],
        "size": [
          1.52155,
          7.90985,
          0.83506
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "PX4 / Open Robotics",
      "license": "BSD-3-Clause",
      "licenseName": "BSD 3-Clause",
      "url": "https://app.gazebosim.org/PX4/fuel/models/Advanced%20Plane"
    }
  },
  {
    "id": "mq8-firescout",
    "name": "MQ-8C Fire Scout",
    "family": "military",
    "blurb": "An unmanned helicopter. Takes off from a destroyer's deck and hovers for twelve hours.",
    "environment": "earth",
    "model": "models/mq8-firescout.glb",
    "spec": {
      "span_m": 10.67,
      "length_m": 12.6,
      "empty_mass_kg": 1585,
      "mtow_kg": 2721,
      "powertrain": "fuel",
      "fuel_capacity_kg": 590,
      "engine": "Rolls-Royce M250-C47B turboshaft",
      "shaft_power_kw": 559,
      "sfc_kg_per_kwh": 0.36,
      "rotors": 1,
      "rotor_diameter_m": 10.67,
      "prop_blades": 4,
      "payload_kg": 317,
      "cruise_kmh": 213,
      "max_speed_kmh": 259,
      "endurance_h": 12,
      "ceiling_m": 5180,
      "tail_rotor": true
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.023633304686867352,
    "modelExtent": [
      509.24888610839844,
      165.76329421997073,
      451.48150634765636
    ],
    "origin": [
      -29.058570861816406,
      44.53709983825685,
      -2.4471893310546875
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "Object_2",
        "group": "Object_2",
        "role": "rotor",
        "side": "center",
        "center": [
          0,
          0,
          0
        ],
        "size": [
          509.24889,
          165.76329,
          451.48151
        ],
        "swappable": true
      },
      {
        "node": "Object_3",
        "group": "Object_3",
        "role": "body",
        "side": "center",
        "center": [
          -16.47038,
          -6.31173,
          2.44829
        ],
        "size": [
          305.77774,
          153.13984,
          99.13842
        ],
        "swappable": false
      }
    ],
    "credit": {
      "author": "42manako",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/mq-8-fire-scout-f6340be1210b4887adfbadee31bf2d5d"
    }
  },
  {
    "id": "camcopter-s100",
    "name": "Camcopter S-100",
    "family": "military",
    "blurb": "A 200 kg helicopter that lands itself on a moving ship. Runs on the same heavy fuel the ship does.",
    "environment": "earth",
    "model": "models/camcopter-s100.glb",
    "spec": {
      "span_m": 3.4,
      "length_m": 3.11,
      "empty_mass_kg": 110,
      "mtow_kg": 200,
      "powertrain": "fuel",
      "fuel_capacity_kg": 40,
      "engine": "Diamond AE50R rotary",
      "shaft_power_kw": 41,
      "sfc_kg_per_kwh": 0.38,
      "rotors": 1,
      "rotor_diameter_m": 3.4,
      "prop_blades": 2,
      "payload_kg": 50,
      "cruise_kmh": 102,
      "max_speed_kmh": 222,
      "endurance_h": 6,
      "ceiling_m": 5500,
      "tail_rotor": true
    },
    "axes": {
      "span": 2,
      "length": 0,
      "vertical": 1
    },
    "aftSign": 1,
    "scaleToMetres": 0.025343295544569586,
    "modelExtent": [
      130.4454892827098,
      54.142150145516126,
      134.1577694195549
    ],
    "origin": [
      -1.0994921045411417,
      -7.81691884994507,
      15.069748878479015
    ],
    "cuts": {},
    "hidden": [],
    "parts": [
      {
        "node": "camcopters100_camcopters100_0",
        "group": "camcopters100_camcopters100_0",
        "role": "body",
        "side": "center",
        "center": [
          -0.32561,
          0,
          0
        ],
        "size": [
          58.65289,
          54.14215,
          134.15777
        ],
        "swappable": false
      },
      {
        "node": "propellar_back_camcopters100_0",
        "group": "propellar_back_camcopters100_0",
        "role": "rotor",
        "side": "right",
        "center": [
          3.629,
          0.8673,
          -65.01039
        ],
        "size": [
          2.06248,
          22.32836,
          1.81957
        ],
        "swappable": true
      },
      {
        "node": "propellar_top_camcopters100_0",
        "group": "propellar_top_camcopters100_0",
        "role": "rotor",
        "side": "left",
        "center": [
          0,
          22.60926,
          19.74911
        ],
        "size": [
          130.44549,
          2.36778,
          7.89705
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "MaX3Dd",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/camcopter-s-100-800250c9c67c452286d282b51266605a"
    }
  },
  {
    "id": "vbat",
    "name": "MQ-35 V-BAT",
    "family": "military",
    "blurb": "One ducted fan, no runway, no catapult. Stands on its tail and goes straight up.",
    "environment": "earth",
    "model": "models/vbat.glb",
    "spec": {
      "span_m": 2.7,
      "length_m": 2.5,
      "wing_area_m2": 0.9,
      "empty_mass_kg": 34,
      "mtow_kg": 57,
      "powertrain": "fuel",
      "fuel_capacity_kg": 12,
      "engine": "Two-stroke driving a ducted fan",
      "shaft_power_kw": 15,
      "sfc_kg_per_kwh": 0.44,
      "rotors": 1,
      "rotor_diameter_m": 0.76,
      "prop_blades": 3,
      "payload_kg": 11,
      "cruise_kmh": 74,
      "max_speed_kmh": 167,
      "endurance_h": 9,
      "ceiling_m": 6100
    },
    "axes": {
      "span": 1,
      "length": 2,
      "vertical": 0
    },
    "aftSign": 1,
    "scaleToMetres": 0.25915949258882254,
    "modelExtent": [
      2.3695514116011185,
      10.418294823117932,
      9.740543003193817
    ],
    "origin": [
      0.015196342058479528,
      0.16216709512446714,
      2.9817664643046857
    ],
    "cuts": {
      "wing": {
        "axis": 1,
        "axisName": "span",
        "keep": 1.562744,
        "origin": 0.162167
      }
    },
    "hidden": [],
    "parts": [
      {
        "node": "Mesh002_Material #27_0",
        "group": "Mesh002_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.01354,
          -3.65424,
          -0.05271
        ],
        "size": [
          0.8724,
          0.68147,
          0.45599
        ],
        "swappable": true
      },
      {
        "node": "Mesh004_Material #27_0",
        "group": "Mesh004_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.05783,
          -3.41707,
          -0.04896
        ],
        "size": [
          0.68701,
          0.44953,
          0.44661
        ],
        "swappable": true
      },
      {
        "node": "Capsule009_Material #27_0",
        "group": "Capsule009_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.62416,
          -3.00633,
          -0.15443
        ],
        "size": [
          0.20574,
          1.66044,
          0.35829
        ],
        "swappable": false
      },
      {
        "node": "Capsule008_Material #27_0",
        "group": "Capsule008_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.62416,
          -3.00633,
          0.12122
        ],
        "size": [
          0.20574,
          1.66044,
          0.35829
        ],
        "swappable": false
      },
      {
        "node": "Mesh003_Material #27_0",
        "group": "Mesh003_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.02233,
          -3.47287,
          0.00043
        ],
        "size": [
          0.30281,
          0.37235,
          0.44491
        ],
        "swappable": true
      },
      {
        "node": "Sphere009_Material #27_0",
        "group": "Sphere009_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.00914,
          -4.2108,
          0.02458
        ],
        "size": [
          0.89496,
          0.37976,
          0.89496
        ],
        "swappable": false
      },
      {
        "node": "Torus001_Material #27_0",
        "group": "Torus001_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0,
          -4.08673,
          0.0072
        ],
        "size": [
          2.36955,
          0.67831,
          2.36955
        ],
        "swappable": false
      },
      {
        "node": "Mesh005_Material #28_0",
        "group": "Mesh005_Material #28_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.01065,
          -3.92098,
          0.03218
        ],
        "size": [
          1.3092,
          0.11841,
          0.83456
        ],
        "swappable": true
      },
      {
        "node": "Sphere002_Material #27_0",
        "group": "Sphere002_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.28721,
          3.67851,
          0.03131
        ],
        "size": [
          0.57754,
          0.37867,
          0.47786
        ],
        "swappable": true
      },
      {
        "node": "Mesh001_Material #27_0",
        "group": "Mesh001_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.0131,
          -3.60575,
          -0.41603
        ],
        "size": [
          0.5677,
          0.06731,
          0.31363
        ],
        "swappable": true
      },
      {
        "node": "Capsule007_Material #27_0",
        "group": "Capsule007_Material #27_0",
        "role": "body",
        "side": "left",
        "center": [
          0.02202,
          1.70483,
          0.02981
        ],
        "size": [
          0.76754,
          4.56635,
          0.76182
        ],
        "swappable": false
      },
      {
        "node": "Sphere003_Material #27_0",
        "group": "Sphere003_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.38425,
          3.67351,
          0.02819
        ],
        "size": [
          0.33899,
          0.26766,
          0.33899
        ],
        "swappable": true
      },
      {
        "node": "Mesh006_Material #27_0",
        "group": "Mesh006_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          -0.0238,
          -3.40664,
          0.09027
        ],
        "size": [
          1.01069,
          0.41301,
          0.12873
        ],
        "swappable": true
      },
      {
        "node": "Sphere008_Material #27_0",
        "group": "Sphere008_Material #27_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.90569,
          -5.17502,
          -0.8878
        ],
        "size": [
          0.13649,
          0.06825,
          0.13649
        ],
        "swappable": true
      },
      {
        "node": "Sphere007_Material #27_0",
        "group": "Sphere007_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.78073,
          -5.17502,
          -0.99393
        ],
        "size": [
          0.13649,
          0.06825,
          0.13649
        ],
        "swappable": false
      },
      {
        "node": "Sphere006_Material #27_0",
        "group": "Sphere006_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.95501,
          -5.17502,
          0.92214
        ],
        "size": [
          0.13649,
          0.06825,
          0.13649
        ],
        "swappable": false
      },
      {
        "node": "Sphere005_Material #27_0",
        "group": "Sphere005_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.89906,
          -5.17502,
          0.92214
        ],
        "size": [
          0.13649,
          0.06825,
          0.13649
        ],
        "swappable": true
      },
      {
        "node": "ChamferBox001_Material #27_0",
        "group": "ChamferBox001_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.0178,
          -2.34042,
          -0.03542
        ],
        "size": [
          1.56922,
          3.50071,
          1.65112
        ],
        "swappable": false
      },
      {
        "node": "Sphere004_Material #27_0",
        "group": "Sphere004_Material #27_0",
        "role": "hardpoint",
        "side": "left",
        "center": [
          -0.359,
          3.2581,
          -0.00383
        ],
        "size": [
          0.24133,
          0.34838,
          0.24133
        ],
        "swappable": true
      },
      {
        "node": "Tube004_Material #27_0",
        "group": "Tube004_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.12379,
          3.67645,
          0.03079
        ],
        "size": [
          0.10319,
          0.38236,
          0.38236
        ],
        "swappable": true
      },
      {
        "node": "Cylinder016_Material #27_0",
        "group": "Cylinder016_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.83184,
          -4.32977,
          -0.81864
        ],
        "size": [
          0.19214,
          1.63021,
          0.18793
        ],
        "swappable": true
      },
      {
        "node": "Cylinder015_Material #27_0",
        "group": "Cylinder015_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.70687,
          -4.32977,
          -0.92476
        ],
        "size": [
          0.19214,
          1.63021,
          0.18793
        ],
        "swappable": false
      },
      {
        "node": "Cylinder014_Material #27_0",
        "group": "Cylinder014_Material #27_0",
        "role": "rotor",
        "side": "right",
        "center": [
          0.88116,
          -4.32977,
          0.85297
        ],
        "size": [
          0.19214,
          1.63021,
          0.18793
        ],
        "swappable": true
      },
      {
        "node": "Cylinder013_Material #27_0",
        "group": "Cylinder013_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.82521,
          -4.32977,
          0.85297
        ],
        "size": [
          0.19214,
          1.63021,
          0.18793
        ],
        "swappable": true
      },
      {
        "node": "Tube006_Material #28_0",
        "group": "Tube006_Material #28_0",
        "role": "body",
        "side": "right",
        "center": [
          0.5823,
          -2.75301,
          -0.2307
        ],
        "size": [
          0.31338,
          0.10014,
          0.22967
        ],
        "swappable": false
      },
      {
        "node": "Tube002_Material #28_0",
        "group": "Tube002_Material #28_0",
        "role": "body",
        "side": "right",
        "center": [
          0.5823,
          -2.75301,
          0.1975
        ],
        "size": [
          0.31338,
          0.10014,
          0.22967
        ],
        "swappable": false
      },
      {
        "node": "Cylinder029_Material #28_0",
        "group": "Cylinder029_Material #28_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.3693,
          -2.31648,
          -2.05289
        ],
        "size": [
          0.19304,
          0.34774,
          0.08874
        ],
        "swappable": true
      },
      {
        "node": "Cylinder028_Material #28_0",
        "group": "Cylinder028_Material #28_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.3693,
          -2.31648,
          -1.11817
        ],
        "size": [
          0.19304,
          0.34774,
          0.08874
        ],
        "swappable": true
      },
      {
        "node": "Cylinder009_Material #28_0",
        "group": "Cylinder009_Material #28_0",
        "role": "body",
        "side": "left",
        "center": [
          0.49007,
          2.25799,
          0.00337
        ],
        "size": [
          0.19304,
          0.34774,
          0.08874
        ],
        "swappable": false
      },
      {
        "node": "Cylinder031_Material #28_0",
        "group": "Cylinder031_Material #28_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.3693,
          -2.31648,
          1.92211
        ],
        "size": [
          0.19304,
          0.34774,
          0.08874
        ],
        "swappable": true
      },
      {
        "node": "Cylinder030_Material #28_0",
        "group": "Cylinder030_Material #28_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.3693,
          -2.31648,
          0.98739
        ],
        "size": [
          0.19304,
          0.34774,
          0.08874
        ],
        "swappable": true
      },
      {
        "node": "Cylinder026_Material #28_0",
        "group": "Cylinder026_Material #28_0",
        "role": "body",
        "side": "left",
        "center": [
          0.49007,
          1.10952,
          0.00337
        ],
        "size": [
          0.19304,
          0.34774,
          0.08874
        ],
        "swappable": false
      },
      {
        "node": "Tube008_Material #27_0",
        "group": "Tube008_Material #27_0",
        "role": "body",
        "side": "left",
        "center": [
          0.02071,
          1.83846,
          0.02814
        ],
        "size": [
          0.77483,
          0.03431,
          0.77483
        ],
        "swappable": false
      },
      {
        "node": "Tube007_Material #27_0",
        "group": "Tube007_Material #27_0",
        "role": "body",
        "side": "left",
        "center": [
          0.02071,
          3.00776,
          0.02814
        ],
        "size": [
          0.77483,
          0.03019,
          0.77483
        ],
        "swappable": false
      },
      {
        "node": "Tube003_Material #27_0",
        "group": "Tube003_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.02071,
          0.78304,
          0.02814
        ],
        "size": [
          0.77483,
          0.03431,
          0.77483
        ],
        "swappable": true
      },
      {
        "node": "Tube005_Material #27_0",
        "group": "Tube005_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.02071,
          0.84788,
          0.02791
        ],
        "size": [
          0.77483,
          0.03019,
          0.77483
        ],
        "swappable": true
      },
      {
        "node": "Tube001_Material #27_0",
        "group": "Tube001_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.00914,
          -4.4875,
          0.02458
        ],
        "size": [
          0.36284,
          0.30202,
          0.36284
        ],
        "swappable": false
      },
      {
        "node": "ChamferBox002_Material #27_0",
        "group": "ChamferBox002_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.07224,
          -3.64458,
          -0.43989
        ],
        "size": [
          0.75777,
          0.25815,
          0.3547
        ],
        "swappable": false
      },
      {
        "node": "Cylinder004_Material #27_0",
        "group": "Cylinder004_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.12215,
          3.65855,
          0.02466
        ],
        "size": [
          0.21944,
          0.24283,
          0.24283
        ],
        "swappable": true
      },
      {
        "node": "Cylinder007_Material #27_0",
        "group": "Cylinder007_Material #27_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.49759,
          -2.25878,
          0.00626
        ],
        "size": [
          0.38529,
          2.64492,
          0.79096
        ],
        "swappable": true
      },
      {
        "node": "Cylinder001_Material #27_0",
        "group": "Cylinder001_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.49759,
          -2.35484,
          2.52276
        ],
        "size": [
          0.12172,
          0.86716,
          4.69502
        ],
        "swappable": true
      },
      {
        "node": "Cylinder025_Material #27_0",
        "group": "Cylinder025_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.49759,
          -2.35484,
          -2.52276
        ],
        "size": [
          0.12172,
          0.86716,
          4.69502
        ],
        "swappable": true
      },
      {
        "node": "OilTank002_Material #27_0",
        "group": "OilTank002_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.0491,
          -3.5009,
          0.03743
        ],
        "size": [
          0.70065,
          0.38191,
          0.38191
        ],
        "swappable": false
      },
      {
        "node": "OilTank001_Material #27_0",
        "group": "OilTank001_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.00678,
          -3.60496,
          0.07343
        ],
        "size": [
          0.38191,
          0.38191,
          0.70065
        ],
        "swappable": false
      },
      {
        "node": "Cylinder024_Material #27_0",
        "group": "Cylinder024_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.62416,
          -2.75301,
          -0.2307
        ],
        "size": [
          0.21242,
          0.86278,
          0.2157
        ],
        "swappable": false
      },
      {
        "node": "Cylinder023_Material #27_0",
        "group": "Cylinder023_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.45418,
          -4.51172,
          0.46963
        ],
        "size": [
          0.69901,
          0.33838,
          0.69901
        ],
        "swappable": true
      },
      {
        "node": "Cylinder022_Material #27_0",
        "group": "Cylinder022_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.43591,
          -4.51172,
          -0.42046
        ],
        "size": [
          0.69901,
          0.33838,
          0.69901
        ],
        "swappable": false
      },
      {
        "node": "Cylinder021_Material #27_0",
        "group": "Cylinder021_Material #27_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.45418,
          -4.51172,
          -0.42046
        ],
        "size": [
          0.69901,
          0.33838,
          0.69901
        ],
        "swappable": true
      },
      {
        "node": "Cylinder020_Material #27_0",
        "group": "Cylinder020_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.43591,
          -4.51172,
          0.46963
        ],
        "size": [
          0.69901,
          0.33838,
          0.69901
        ],
        "swappable": false
      },
      {
        "node": "Cylinder019_Material #27_0",
        "group": "Cylinder019_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.00914,
          -4.51172,
          -0.60481
        ],
        "size": [
          0.04387,
          0.33838,
          0.94469
        ],
        "swappable": false
      },
      {
        "node": "Cylinder018_Material #27_0",
        "group": "Cylinder018_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          -0.00914,
          -4.51172,
          0.65397
        ],
        "size": [
          0.04387,
          0.33838,
          0.94469
        ],
        "swappable": false
      },
      {
        "node": "Cylinder002_Material #27_0",
        "group": "Cylinder002_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.62025,
          -4.51172,
          0.02458
        ],
        "size": [
          0.94469,
          0.33838,
          0.04387
        ],
        "swappable": false
      },
      {
        "node": "Cylinder017_Material #27_0",
        "group": "Cylinder017_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.63853,
          -4.51172,
          0.02458
        ],
        "size": [
          0.94469,
          0.33838,
          0.04387
        ],
        "swappable": true
      },
      {
        "node": "Cylinder005_Material #27_0",
        "group": "Cylinder005_Material #27_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.31541,
          3.65855,
          0.02466
        ],
        "size": [
          0.09406,
          0.131,
          0.13302
        ],
        "swappable": true
      },
      {
        "node": "Cylinder003_Material #27_0",
        "group": "Cylinder003_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.62416,
          -2.75301,
          0.1975
        ],
        "size": [
          0.21242,
          0.86278,
          0.2157
        ],
        "swappable": false
      },
      {
        "node": "object_4_Material #27_0",
        "group": "object_4_Material #27_0",
        "role": "gear",
        "side": "left",
        "center": [
          -0.42032,
          5.02544,
          -0.00364
        ],
        "size": [
          0.02255,
          0.36742,
          0.02309
        ],
        "swappable": true
      },
      {
        "node": "Cylinder032_Material #27_0",
        "group": "Cylinder032_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.0178,
          -3.06003,
          -0.00053
        ],
        "size": [
          0.2746,
          0.63663,
          1.00162
        ],
        "swappable": true
      },
      {
        "node": "Cylinder008_Material #27_0",
        "group": "Cylinder008_Material #27_0",
        "role": "gear",
        "side": "left",
        "center": [
          -0.41892,
          4.20883,
          -0.00383
        ],
        "size": [
          0.01765,
          1.63338,
          0.01792
        ],
        "swappable": true
      },
      {
        "node": "C-Ext005_Material #27_0",
        "group": "C-Ext005_Material #27_0",
        "role": "tail",
        "side": "right",
        "center": [
          0.39742,
          -0.57085,
          0.19285
        ],
        "size": [
          0.033,
          0.07505,
          0.02428
        ],
        "swappable": true
      },
      {
        "node": "C-Ext004_Material #27_0",
        "group": "C-Ext004_Material #27_0",
        "role": "hardpoint",
        "side": "right",
        "center": [
          -0.14955,
          -0.57085,
          -0.35411
        ],
        "size": [
          0.02428,
          0.07505,
          0.033
        ],
        "swappable": true
      },
      {
        "node": "C-Ext003_Material #27_0",
        "group": "C-Ext003_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.19091,
          -0.57085,
          -0.35411
        ],
        "size": [
          0.02428,
          0.07505,
          0.033
        ],
        "swappable": false
      },
      {
        "node": "C-Ext002_Material #27_0",
        "group": "C-Ext002_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.19091,
          -0.57085,
          0.39936
        ],
        "size": [
          0.02428,
          0.07505,
          0.033
        ],
        "swappable": false
      },
      {
        "node": "C-Ext001_Material #27_0",
        "group": "C-Ext001_Material #27_0",
        "role": "gear",
        "side": "right",
        "center": [
          -0.14955,
          -0.57085,
          0.39936
        ],
        "size": [
          0.02428,
          0.07505,
          0.033
        ],
        "swappable": true
      },
      {
        "node": "C-Ext006_Material #27_0",
        "group": "C-Ext006_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.35606,
          -0.57085,
          -0.1476
        ],
        "size": [
          0.033,
          0.07505,
          0.02428
        ],
        "swappable": true
      },
      {
        "node": "C-Ext007_Material #27_0",
        "group": "C-Ext007_Material #27_0",
        "role": "payload",
        "side": "right",
        "center": [
          -0.35606,
          -0.57085,
          0.19285
        ],
        "size": [
          0.033,
          0.07505,
          0.02428
        ],
        "swappable": true
      },
      {
        "node": "C-Ext008_Material #27_0",
        "group": "C-Ext008_Material #27_0",
        "role": "body",
        "side": "right",
        "center": [
          0.39742,
          -0.57085,
          -0.1476
        ],
        "size": [
          0.033,
          0.07505,
          0.02428
        ],
        "swappable": false
      },
      {
        "node": "Mesh007_Material #28_0",
        "group": "Mesh007_Material #28_0",
        "role": "tail",
        "side": "left",
        "center": [
          0.39737,
          3.80068,
          0.03156
        ],
        "size": [
          0.21624,
          0,
          0.09683
        ],
        "swappable": true
      }
    ],
    "credit": {
      "author": "KillCaptureDestroy",
      "license": "CC-BY-4.0",
      "licenseName": "CC Attribution 4.0",
      "url": "https://sketchfab.com/3d-models/mq-35-v-bat-4543fb39c7794ccebf272052a0877dd8"
    }
  }
]

export const AIRCRAFT_BY_ID: Record<string, AircraftModel> = Object.fromEntries(
  AIRCRAFT.map((a) => [a.id, a]),
)
