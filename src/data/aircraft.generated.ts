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
        "node": "Global Hawk_1c594d",
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
        "node": "Global Hawk_8d6094",
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
        "node": "Global Hawk_d5a3f1",
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
        "node": "Global Hawk_9720d3",
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
        "node": "Global Hawk_465ef8",
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
        "node": "Global Hawk_2923f3",
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
        "node": "rotors_02_5b1c22",
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
        "node": "rotors_01_07a65e",
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
        "node": "rotors_02_843ca3",
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
        "node": "rotors_01_51adb5",
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
        "node": "parts_02_97381e",
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
        "node": "parts_01_828eaa",
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
        "node": "leg_04_d4d157",
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
        "node": "leg_03_a1fc7e",
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
        "node": "leg_02_7b24d4",
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
        "node": "leg_01_0587cb",
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
        "node": "solar_panel_f450e7",
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
        "node": "leg_04_fbef09",
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
        "node": "leg_03_d531b6",
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
        "node": "leg_02_37017a",
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
        "node": "leg_01_5d8244",
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
        "node": "rotors_02_6a91d8",
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
        "node": "rotors_01_eda2fe",
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
        "node": "bus_ac8333",
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
        "node": "leg_04_5b803a",
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
        "node": "leg_03_cb9666",
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
        "node": "leg_02_7c7351",
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
        "node": "leg_01_98290b",
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
        "node": "parts_02_18a5d2",
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
        "node": "parts_01_8e50bb",
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
        "node": "parts_02_e01974",
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
        "node": "parts_01_f7ab4a",
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
        "node": "solar_panel_1b2a21",
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
        "node": "bus_485259",
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
        "node": "solar_panel_1cb544",
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
        "node": "rotors_01_ee50db",
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
        "node": "bus_8b89ae",
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
        "node": "cams_d18607",
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
        "node": "rotors_02_09e78d",
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
        "node": "solar_panel_d37861",
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
        "node": "cams_4369ed",
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
  }
]

export const AIRCRAFT_BY_ID: Record<string, AircraftModel> = Object.fromEntries(
  AIRCRAFT.map((a) => [a.id, a]),
)
