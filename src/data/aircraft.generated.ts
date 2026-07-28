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
    "parts": [
      {
        "node": "Global Hawk_897c58",
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
        "node": "Global Hawk_71024e",
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
        "node": "Global Hawk_ce4e1d",
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
        "node": "Global Hawk_7a9dd7",
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
        "node": "Global Hawk_b35505",
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
        "node": "Global Hawk_34da1f",
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
    "parts": [
      {
        "node": "rotors_02_7a02fc",
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
        "node": "rotors_01_edde83",
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
        "node": "rotors_02_a5f25a",
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
        "node": "rotors_01_a4e18d",
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
        "node": "parts_02_429976",
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
        "node": "parts_01_b9b496",
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
        "node": "leg_04_9159ce",
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
        "node": "leg_03_a4308c",
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
        "node": "leg_02_d807ff",
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
        "node": "leg_01_c6ace8",
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
        "node": "solar_panel_3df8bf",
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
        "node": "leg_04_18ea25",
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
        "node": "leg_03_15defc",
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
        "node": "leg_02_b2c8d4",
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
        "node": "leg_01_9ef8b6",
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
        "node": "rotors_02_355cde",
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
        "node": "rotors_01_9b6831",
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
        "node": "bus_24fdb3",
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
        "node": "leg_04_268c48",
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
        "node": "leg_03_b5034f",
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
        "node": "leg_02_c94163",
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
        "node": "leg_01_a170d1",
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
        "node": "parts_02_430860",
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
        "node": "parts_01_998a63",
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
        "node": "parts_02_525cf1",
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
        "node": "parts_01_b6a223",
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
        "node": "solar_panel_b6b457",
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
        "node": "bus_38997c",
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
        "node": "solar_panel_a9e513",
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
        "node": "rotors_01_8bef90",
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
        "node": "bus_270620",
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
        "node": "cams_762e60",
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
        "node": "rotors_02_4e3eb1",
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
        "node": "solar_panel_ae3d39",
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
        "node": "cams_ca5f05",
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
      "length_m": 0.6,
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
    "cuts": {},
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
      "span": 1,
      "length": 0,
      "vertical": 2
    },
    "aftSign": 1,
    "scaleToMetres": 0.21741926405629108,
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
    "parts": [
      {
        "node": "Object_58",
        "group": "Object_58",
        "role": "body",
        "side": "left",
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
        "role": "body",
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
        "swappable": false
      },
      {
        "node": "Object_38",
        "group": "Object_38",
        "role": "body",
        "side": "left",
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
        "side": "left",
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
        "side": "left",
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
        "side": "right",
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
        "role": "rotor",
        "side": "right",
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
        "swappable": true
      },
      {
        "node": "Object_26",
        "group": "Object_26",
        "role": "body",
        "side": "left",
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
        "role": "body",
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
        "swappable": false
      },
      {
        "node": "Object_52",
        "group": "Object_52",
        "role": "tail",
        "side": "right",
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
        "side": "right",
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
        "role": "body",
        "side": "right",
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
        "swappable": false
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
        "role": "body",
        "side": "right",
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
        "swappable": false
      },
      {
        "node": "Object_54",
        "group": "Object_54",
        "role": "body",
        "side": "right",
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
        "role": "tail",
        "side": "left",
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
        "swappable": true
      },
      {
        "node": "Object_32",
        "group": "Object_32",
        "role": "body",
        "side": "left",
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
        "swappable": false
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
        "role": "arm",
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
        "swappable": false
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
        "role": "arm",
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
        "swappable": false
      },
      {
        "node": "polySurface5_Drone_0",
        "group": "polySurface5_Drone_0",
        "role": "arm",
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
        "swappable": false
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
      "length_m": 0.47,
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
    "aftSign": 1,
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
    "cuts": {},
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
        "role": "tail",
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
        "role": "tail",
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
        "role": "tail",
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
        "role": "tail",
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
  }
]

export const AIRCRAFT_BY_ID: Record<string, AircraftModel> = Object.fromEntries(
  AIRCRAFT.map((a) => [a.id, a]),
)
