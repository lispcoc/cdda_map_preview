const pfx = "./ChibiUltica/"

class Tileset {
    constructor( json ) {
        this.json = json
        this.width = json.tile_info[0].width
        this.height = json.tile_info[0].height
        this.sub = []
        this.id_cache = {}
        for(var j of json["tiles-new"]) {
            this.sub.push(new Subset(j, pfx, this.width, this.height))
        }
    }
    load_from_id(id_str) {
        var id_set = {fg: -1, bg: -1}
        var fg = -1
        var fg_offset = -1
        var fg_subset = null
        var bg = -1
        var bg_offset = -1
        var bg_subset = null
        for(var subset of this.sub) {
            subset.update_size()
            var set = subset.get_id(id_str)
            if(set){
                fg = set.fg
                bg = set.bg
                break
            }
        }

        var start = 0
        for(var subset of this.sub) {
            if(start + subset.size > fg){
                fg_offset = fg - start
                fg_subset = subset
                break;
            }
            start += subset.size
        }

        start = 0
        for(var subset of this.sub) {
            if(start + subset.size > bg){
                bg_offset = bg - start
                bg_subset = subset
                break;
            }
            start += subset.size
        }

        return {
            fg: fg_subset ? this.get_offset(fg_subset, fg_offset) : null,
            bg: bg_subset ? this.get_offset(bg_subset, bg_offset) : null
        }
    }
    get_offset(subset, n) {
        const x = (n % subset.xsize) * subset.sprite_width
        const y = parseInt(n / subset.xsize) * subset.sprite_height
        return {
            img:subset.img,
            w:subset.sprite_width, h:subset.sprite_height,
            x:x, y:y,
            offset_x: subset.sprite_offset_x, offset_y: subset.sprite_offset_y
        }
    }
}

class Subset {
    constructor( json, path, default_w, default_h ) {
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
            if(t.id == id_str) {
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
