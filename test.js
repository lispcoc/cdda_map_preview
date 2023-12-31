
 const test_data =[
   {
    "type": "mapgen",
    "method": "json",
    "om_terrain": [ "basement_bionic" ],
    "weight": 100,
    "object": {
      "fill_ter": "t_thconc_floor",
      "rows": [
        "                        ",
        "           |----------| ",
        "           |...___....| ",
        "           |..........| ",
        "           |..~~~~~~..| ",
        " |---------|..~~~~~~..| ",
        " |...__..i|L..~~~~~~..| ",
        " |?.......|...~~~~~~..| ",
        " |/.......+L..........| ",
        " |.ccc.ccc|LL...___...| ",
        " |------------+-------| ",
        " |{{{{|bbbbbb|...rrccr| ",
        " |....|s....b|ff......| ",
        " |__..|s.t..b|...ccccc| ",
        " |....|a....b|........| ",
        " |^.!.............s..t| ",
        " |................s..t| ",
        " |%.@.............s..t| ",
        " |...............|----| ",
        " |.....|+-|++|...|&..i| ",
        " |.....|.W|..|...+...C| ",
        " |.}...|.F|.<|...|.cc*| ",
        " ---------------------- ",
        "                        "
      ],
      "palettes": [ "basement_game" ],
      "terrain": { "~": "t_water_pool" },
      "furniture": {
        "}": "f_pinball_machine",
        "*": "f_shower",
        "!": [ "f_ergometer", "f_ergometer_mechanical" ],
        "@": [ "f_treadmill", "f_treadmill_mechanical" ],
        "^": "f_exercise",
        "%": "f_floor_canvas",
        "C": "f_cupboard",
        "{": "f_bigmirror",
        "_": "f_bench",
        "L": "f_locker",
        "?": "f_autodoc",
        "/": "f_autodoc_couch",
        "F": "f_home_furnace",
        "W": "f_water_heater"
      },
      "liquids": { "W": { "liquid": "water_clean", "amount": [ 0, 100 ] } },
      "place_loot": [
        { "group": "alcohol", "x": [ 14, 15 ], "y": 12, "chance": 96, "repeat": [ 1, 2 ] },
        { "group": "fridgesnacks", "x": [ 14, 15 ], "y": 12, "chance": 80, "repeat": [ 1, 2 ] },
        { "group": "homebooks", "x": [ 7, 12 ], "y": 11, "chance": 70, "repeat": [ 1, 2 ] },
        { "group": "homebooks", "x": 12, "y": [ 12, 14 ], "chance": 70, "repeat": [ 1, 2 ] },
        { "group": "magazines", "x": 21, "y": [ 15, 17 ], "chance": 30 },
        { "group": "magazines", "x": 9, "y": 12, "chance": 30 },
        { "group": "snacks", "x": [ 16, 21 ], "y": 11, "chance": 40, "repeat": [ 1, 2 ] },
        { "group": "snacks", "x": [ 16, 21 ], "y": 13, "chance": 40, "repeat": [ 1, 2 ] },
        { "group": "softdrugs", "x": 21, "y": 20, "chance": 75, "repeat": [ 1, 2 ] },
        { "group": "cleaning", "x": 11, "y": 6, "chance": 70, "repeat": [ 1, 2 ] },
        { "group": "swimmer_set_any", "x": 11, "y": 8, "chance": 75, "repeat": [ 1, 4 ] },
        { "group": "cleaning", "x": [ 11, 12 ], "y": 9, "chance": 70, "repeat": [ 1, 2 ] },
        { "group": "surgery", "x": [ 8, 9 ], "y": 9, "chance": 70, "repeat": [ 1, 2 ] },
        { "item": "television", "x": 21, "y": 16, "chance": 95 },
        { "item": "soap", "x": 19, "y": 21, "chance": 80 },
        { "item": "towel", "x": 20, "y": 21, "chance": 80 },
        { "item": "towel", "x": 3, "y": 13, "chance": 60 },
        { "item": "stereo", "x": 2, "y": 13, "chance": 50 }
      ],
      "items": { "?": { "item": "autodoc_supplies", "chance": 100 } },
      "place_monster": [ { "monster": "mon_broken_cyborg", "x": 14, "y": 3, "chance": 100 } ]
    }
  }
]

const palettes_json = [
    {
      "type": "palette",
      "id": "basement_residential",
      "terrain": {
        "|": "t_wall_w",
        "%": "t_concrete_wall",
        "<": "t_stairs_up",
        "+": "t_door_c",
        ".": "t_floor",
        "_": "t_linoleum_gray",
        "B": "t_floor",
        "c": "t_floor",
        "i": "t_floor",
        "S": "t_floor",
        "r": "t_linoleum_gray",
        "f": "t_linoleum_gray",
        "t": "t_floor",
        "&": "t_floor",
        "C": "t_floor",
        "d": "t_floor",
        "w": "t_floor",
        "D": "t_floor",
        "P": "t_floor",
        "#": "t_floor",
        "G": "t_floor",
        "s": "t_floor",
        "F": "t_linoleum_gray",
        "W": "t_linoleum_gray",
        "o": "t_linoleum_gray",
        "b": "t_floor",
        "T": "t_floor"
      },
      "furniture": {
        "B": "f_bookcase",
        "c": "f_counter",
        "i": "f_sink",
        "S": "f_shower",
        "r": "f_rack",
        "f": "f_fridge",
        "t": "f_table",
        "&": "f_toilet",
        "C": "f_sofa",
        "d": "f_dryer",
        "w": "f_washer",
        "D": "f_dresser",
        "P": "f_wardrobe",
        "#": "f_bed",
        "G": "f_glass_cabinet",
        "s": "f_chair",
        "F": "f_home_furnace",
        "W": "f_water_heater",
        "o": [ "f_oven", "f_gas_oven_microwave_combo" ],
        "b": "f_cupboard",
        "T": "f_rack"
      },
      "toilets": { "&": {  } }
    },
    {
      "type": "palette",
      "id": "basement_game",
      "terrain": {
        " ": "t_soil",
        "+": "t_door_c",
        "-": "t_wall_w",
        ".": "t_thconc_floor",
        "<": "t_wood_stairs_up",
        "&": "t_thconc_floor",
        "*": "t_thconc_floor",
        "%": "t_thconc_floor",
        "}": "t_thconc_floor",
        "@": "t_thconc_floor",
        "!": "t_thconc_floor",
        "^": "t_thconc_floor",
        "{": "t_thconc_floor",
        "_": "t_thconc_floor",
        "?": "t_thconc_floor",
        "/": "t_thconc_floor",
        "a": "t_thconc_floor",
        "b": "t_thconc_floor",
        "c": "t_thconc_floor",
        "d": "t_thconc_floor",
        "f": "t_thconc_floor",
        "i": "t_thconc_floor",
        "p": "t_thconc_floor",
        "r": "t_thconc_floor",
        "s": "t_thconc_floor",
        "t": "t_thconc_floor",
        "w": "t_thconc_floor",
        "C": "t_thconc_floor",
        "L": "t_thconc_floor",
        ",": "t_floor",
        "T": "t_floor",
        "A": "t_floor",
        "#": "t_floor",
        "n": "t_floor",
        "F": "t_floor",
        "S": "t_floor",
        "l": "t_floor",
        "B": "t_floor",
        "M": "t_floor",
        "|": "t_wall_w",
        "1": "t_wall_log"
      },
      "furniture": {
        "&": "f_toilet",
        "a": "f_armchair",
        "A": "f_armchair",
        "b": "f_bookcase",
        "B": "f_bookcase",
        "c": "f_counter",
        "n": "f_counter",
        "d": "f_dryer",
        "f": "f_fridge",
        "F": "f_fridge",
        "i": "f_sink",
        "p": "f_pool_table",
        "r": "f_rack",
        "s": "f_sofa",
        "S": "f_sofa",
        "t": "f_table",
        "#": "f_table",
        "w": "f_washer",
        "l": "f_floor_lamp",
        "M": "f_desk",
        "T": "f_trashcan",
        "?": "f_freezer"
      },
      "toilets": { "&": {  } }
    },
    {
      "type": "palette",
      "id": "basement_bunker",
      "terrain": {
        "#": "t_soil",
        "+": "t_door_metal_locked",
        "*": "t_door_c",
        "^": "t_door_locked_interior",
        "5": "t_card_military",
        "<": "t_stairs_up",
        "M": "t_wall_metal",
        "|": "t_reinforced_glass",
        "/": "t_door_curtain_c",
        "W": "t_water_dispenser"
      },
      "furniture": { "6": "f_console_broken" },
      "toilets": { "&": {  } },
      "liquids": { "W": { "liquid": "water_clean", "amount": [ 0, 80 ] } }
    },
    {
      "type": "palette",
      "id": "basement_empty",
      "terrain": {
        " ": "t_soil",
        "+": "t_door_c",
        ".": "t_thconc_floor",
        "|": "t_concrete_wall",
        "<": "t_wood_stairs_up",
        "%": "t_wall_w"
      },
      "furniture": {
        "a": "f_fireplace",
        "A": "f_stool",
        "F": "f_home_furnace",
        "J": "f_counter",
        "S": "f_sink",
        "U": "f_utility_shelf",
        "W": "f_washer",
        "Z": "f_dryer",
        "8": "f_counter",
        "9": "f_shower",
        "g": "f_water_heater",
        "v": "f_safe_l",
        "z": "f_cardboard_box",
        "?": "f_freezer"
      },
      "toilets": { "t": {  } },
      "liquids": { "g": { "liquid": "water_clean", "amount": [ 0, 100 ] } },
      "items": {
        "t": { "item": "SUS_toilet", "chance": 10, "repeat": [ 1, 3 ] },
        "v": [
          { "item": "art", "chance": 5 },
          { "item": "harddrugs", "chance": 10, "repeat": [ 1, 2 ] },
          { "item": "maps", "chance": 2 },
          { "item": "guns_pistol_common", "chance": 50, "ammo": 90, "magazine": 100 },
          { "item": "gemstones", "chance": 30, "repeat": [ 1, 2 ] }
        ],
        "S": { "item": "SUS_bathroom_sink", "chance": 75 },
        "U": [
          { "item": "home_hw", "chance": 20, "repeat": [ 1, 2 ] },
          { "item": "cleaning", "chance": 40, "repeat": [ 1, 2 ] },
          { "item": "camping", "chance": 5, "repeat": [ 1, 2 ] }
        ],
        "8": [
          { "item": "SUS_hair_drawer", "chance": 50 },
          { "item": "SUS_bathroom_cabinet", "chance": 50 },
          { "item": "softdrugs", "chance": 20, "repeat": [ 1, 2 ] },
          { "item": "harddrugs", "chance": 2 }
        ],
        "9": { "item": "shower", "chance": 30, "repeat": [ 1, 2 ] },
        "Z": { "item": "laundry", "chance": 100 },
        "W": { "item": "laundry", "chance": 50 },
        "z": [
          { "item": "allsporting", "chance": 40, "repeat": [ 1, 2 ] },
          { "item": "chem_home", "chance": 50, "repeat": [ 1, 2 ] },
          { "item": "child_items", "chance": 30, "repeat": [ 1, 2 ] },
          { "item": "costume_all", "chance": 15, "repeat": [ 1, 6 ] },
          { "item": "stash_drugs", "chance": 1 },
          { "item": "maps", "chance": 4 }
        ]
      }
    }
  ]