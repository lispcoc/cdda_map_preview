class Palette {
    constructor( json ) {
        this.json = json
        this.id = json.id ? json.id : "___"
        this.terrain = json.terrain ? json.terrain : {}
        this.furniture = json.furniture ? json.furniture : {}
    }
    get_terrain(ch) {
        if(ch in this.terrain) {
            if(Array.isArray(this.terrain[ch])){
                return this.terrain[ch][0]
            }
            return this.terrain[ch]
        }
        return "null"
    }
    get_furniture(ch) {
        if(ch in this.furniture) {
            if(Array.isArray(this.furniture[ch])){
                return this.furniture[ch][0]
            }
            return this.furniture[ch]
        }
        return "null"
    }
}
