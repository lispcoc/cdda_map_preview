class Tileset {
    constructor(json, path = "./ChibiUltica/", onload_events = []) {
        this.json = json
        this.width = json.tile_info[0].width
        this.height = json.tile_info[0].height
        this.sub = []
        this.tiles = {}
        this.sprites = []
        this.id_cache = {}
        this.valid = false
        this.onload_events = onload_events
        this.on_subset_load = () => {
            for(var s of this.sub){
                if(!s.valid) {
                    return false
                }
            }
            this.build_tiles()
            this.valid = true
            this.onload_events.forEach(f => f(this))
        }
        for(var j of json["tiles-new"]) {
            this.sub.push(new Subset(j, path, this.width, this.height, [this.on_subset_load]))
        }
    }
    build_tiles() {
        const force_array = (e) => {
            if(Array.isArray(e)){
                return e
            }
            return [e]
        }
        for(var subset of this.sub) {
            for(var i = 0; i < subset.size; i++){
                this.sprites.push(new SpriteData(subset, i))
            }
        }
        for(var subset of this.sub) {
            for(var tile of subset.tiles) {
                force_array(tile.id).forEach(id => {
                    this.tiles[id] = new TileData(id, tile, this.sprites)
                })
            }
        }
    }
    is_valid() {
        return this.valid
    }
    draw_sprite(canvas_ctx, index, x, y){
        const sprite = this.sprites[index]
        canvas_ctx.drawImage(
            sprite.img,
            sprite.start_x, sprite.start_y,
            sprite.width, sprite.height,
            x * this.width + sprite.offset_x, y * this.height + sprite.offset_y,
            sprite.width, sprite.height
        )
        
    }
    draw_all(canvas_ctx, a = [[]], offset_x = 0, offset_y = 0){
        const compare_safe = (a, y1, x1, y2, x2, target = "fg") => {
            if(!Array.isArray(a[y1])){
                return false
            }
            if(x1 > a[y1].length || x1 < 0 || !this.tiles[a[y1][x1]] || !Array.isArray(this.tiles[a[y1][x1]][target])){
                return false
            }
            if(!Array.isArray(a[y2])){
                return false
            }
            if(x2 > a[y2].length || x2 < 0 || !this.tiles[a[y2][x2]] || !Array.isArray(this.tiles[a[y2][x2]][target])){
                return false
            }
            return this.tiles[a[y1][x1]][target][0] == this.tiles[a[y2][x2]][target][0]
        }

        for(var y = 0; y < a.length; y++) {
            for(var x = 0; x < a[y].length; x++) {
                var connect = DIR_NO
                if(compare_safe(a, y, x, y - 1, x)) {connect |= DIR_U}
                if(compare_safe(a, y, x, y, x - 1)) {connect |= DIR_L}
                if(compare_safe(a, y, x, y + 1, x)) {connect |= DIR_D}
                if(compare_safe(a, y, x, y, x + 1)) {connect |= DIR_R}
                if(compare_safe(a, y, x, y - 1, x - 1)) {connect |= DIR_UL}
                if(compare_safe(a, y, x, y + 1, x - 1)) {connect |= DIR_DL}
                if(compare_safe(a, y, x, y + 1, x + 1)) {connect |= DIR_DR}
                if(compare_safe(a, y, x, y - 1, x + 1)) {connect |= DIR_UR}
                this.draw(canvas_ctx, a[y][x], x + offset_x, y + offset_y, connect)
            }
        }
    }
    draw(canvas_ctx, id, x, y, connect = DIR_NO){
        const tile = this.tiles[id]
        if(tile){
            const fg = tile.connected_sprite("fg", connect)
            const bg = tile.connected_sprite("bg", connect)
            if(bg){
                canvas_ctx.drawImage(
                  bg.img,
                  bg.start_x, bg.start_y,
                  bg.width, bg.height,
                  x * this.width + bg.offset_x, y * this.height + bg.offset_y,
                  bg.width, bg.height
                )
            }
            if(fg){
                canvas_ctx.drawImage(
                  fg.img,
                  fg.start_x, fg.start_y,
                  fg.width, fg.height,
                  x * this.width + fg.offset_x, y * this.height + fg.offset_y,
                  fg.width, fg.height
                )
            }
        }
    }
}

class Subset {
    constructor( json, path, default_w, default_h, onload_events = [] ) {
        this.json = json
        this.tiles = json.tiles
        this.img = new Image()
        this.img.src = path + json.file
        this.sprite_width = json.sprite_width ? json.sprite_width : default_w
        this.sprite_height = json.sprite_height ? json.sprite_height : default_h
        this.sprite_offset_x = json.sprite_offset_x ? json.sprite_offset_x : 0
        this.sprite_offset_y = json.sprite_offset_y ? json.sprite_offset_y : 0
        this.xsize = 0
        this.ysize = 0
        this.size = 0
        this.img.onload = this.onload
        this.valid = false
        this.onload_events = onload_events
    }
    onload = () => {
        this.update_size()
        this.valid = true
        this.onload_events.forEach(f => f(this))
    }
    update_size() {
        if(this.size > 0){
            return
        }
        this.xsize = parseInt(this.img.width / this.sprite_width)
        this.ysize = parseInt(this.img.height / this.sprite_height)
        this.size = this.xsize * this.ysize
    }
}

class TileData {
    constructor(id, json, sprites) {
        const force_array = (fgbg) => {
            if(Array.isArray(fgbg)){
                return fgbg
            }
            return [fgbg]
        }
        const get_num = (fgbg) => {
            var e = force_array(fgbg)[0]
            if(isObject(e)){
                return e.sprite
            }
            return e
        }

        this.id = id
        this.fg = force_array(json.fg).map(fg => sprites[get_num(fg)])
        this.bg = force_array(json.bg).map(bg => sprites[get_num(bg)])

        if(json.additional_tiles){
            this.additional_tiles = {}
            json.additional_tiles.forEach(json => {
                this.additional_tiles[json.id] = new TileData(json.id, json, sprites)
            })
        }

        const sample = {
          "id": "t_ice",
          "fg": 1949,
          "multitile": true,
          "additional_tiles": [
            { "id": "center", "fg": 1934 },
            { "id": "corner", "fg": [ 1936, 1938, 1937, 1935 ], "//": "[左上, 左下, 右下, 右上]"}, 
            { "id": "t_connection", "fg": [ 1946, 1948, 1947, 1945 ], "//": "[上淵, 左淵, 下淵, 右淵]" },
            { "id": "edge", "fg": [ 1940, 1939 ], "//": "[垂直, 水平]" },
            { "id": "end_piece", "fg": [ 1942, 1944, 1943, 1941 ], "//": "[上終端, 左終端, 下終端, 右終端]" },
            { "id": "unconnected", "fg": [ 1949, 1949 ] }
          ]
        }
    }
    connected_sprite(target = "fg", connected = DIR_NO){
        const set = [
            { cond: CENTER, target: "center", index: 0},
            { cond: TC_U, target: "t_connection", index: 0},
            { cond: TC_L, target: "t_connection", index: 1},
            { cond: TC_D, target: "t_connection", index: 2},
            { cond: TC_R, target: "t_connection", index: 3},
            { cond: CORNER_UL, target: "corner", index: 0},
            { cond: CORNER_DL, target: "corner", index: 1},
            { cond: CORNER_DR, target: "corner", index: 2},
            { cond: CORNER_UR, target: "corner", index: 3},
            { cond: EDGE_V, target: "edge", index: 0},
            { cond: EDGE_H, target: "edge", index: 1},
            { cond: END_U, target: "end_piece", index: 0},
            { cond: END_L, target: "end_piece", index: 1},
            { cond: END_D, target: "end_piece", index: 2},
            { cond: END_R, target: "end_piece", index: 3},
        ]
        if(this.additional_tiles){
            var e = set.find(e => {return (e.cond & connected) == e.cond})
            if(e && this.additional_tiles[e.target]) {
                if(this.additional_tiles[e.target][target]){
                    if(this.additional_tiles[e.target][target][e.index]){
                        return this.additional_tiles[e.target][target][e.index]
                    }
                }
            }
        }
        return this[target][0]
    }
}

class SpriteData {
    constructor(subset, index) {
        this.img = subset.img
        this.index = index
        this.start_x = (index % subset.xsize) * subset.sprite_width
        this.start_y = parseInt(index / subset.xsize) * subset.sprite_height
        this.width = subset.sprite_width
        this.height = subset.sprite_height
        this.offset_x = subset.sprite_offset_x
        this.offset_y = subset.sprite_offset_y
    }
}
