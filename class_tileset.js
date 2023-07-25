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
        this.on_subset_load = (subset) => {
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
                    this.tiles[id] = new TileData(tile, this.sprites)
                })
            }
        }
    }
    is_valid() {
        return this.valid
    }
    draw(canvas_ctx, id, x, y){
        const tile = this.tiles[id]
        if(tile){
            if(tile.bg){
                canvas_ctx.drawImage(
                  tile.bg.img,
                  tile.bg.start_x, tile.bg.start_y,
                  tile.bg.width, tile.bg.height,
                  x * this.width + tile.bg.offset_x, y * this.height + tile.bg.offset_y,
                  tile.bg.width, tile.bg.height
                )
            }
            if(tile.fg){
                canvas_ctx.drawImage(
                  tile.fg.img,
                  tile.fg.start_x, tile.fg.start_y,
                  tile.fg.width, tile.fg.height,
                  x * this.width + tile.fg.offset_x, y * this.height + tile.fg.offset_y,
                  tile.fg.width, tile.fg.height
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
    get_id(id_str) {
        for(var t of this.tiles) {
            if(Array.isArray(t.id) && t.id.find(id => id == id_str) || t.id == id_str){
                return {fg: this.get_fgbg(t.fg), bg: this.get_fgbg(t.bg)}
            }
        }
        return null
    }
    get_fgbg(t) {
        var fgbg = get_first(t)
        if(isObject(fgbg)){
            return fgbg.sprite
        }
        return fgbg
    }
}

class TileData {
    constructor(json, sprites) {
        this.fg = sprites[this.get_fgbg(json.fg)]
        this.bg = sprites[this.get_fgbg(json.bg)]
    }

    get_fgbg(fgbg) {
        const force_array = (fgbg) => {
            if(Array.isArray(fgbg)){
                return fgbg
            }
            return [fgbg]
        }

        var e = force_array(fgbg)[0]
        if(isObject(e)){
            return e.sprite
        }
        return e
    }
}

class SpriteData {
    constructor(subset, index) {
        this.img = subset.img
        this.start_x = (index % subset.xsize) * subset.sprite_width
        this.start_y = parseInt(index / subset.xsize) * subset.sprite_height
        this.width = subset.sprite_width
        this.height = subset.sprite_height
        this.offset_x = subset.sprite_offset_x
        this.offset_y = subset.sprite_offset_y
    }
}
