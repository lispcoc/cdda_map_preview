class Palette {
    constructor( json ) {
        this.json = json
        this.id = json.id ? json.id : "___"
        this.terrain = json.terrain ? json.terrain : {}
        this.furniture = json.furniture ? json.furniture : {}
    }
    get_terrain(ch) {
        for(const k in this.terrain) {
            if(ch == k){
                return this.terrain[k]
            }
        }
        return "null"
    }
    get_furniture(ch) {
        for(const k in this.furniture) {
            if(ch == k){
                return this.furniture[k]
            }
        }
        return "null"
    }
}
