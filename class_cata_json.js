class CataJson {
    constructor( json ) {
        //string
        if (typeof json === "string" || json instanceof String) {
            this.obj = JSON.parse(json)
        } else {
            this.obj = json
        }
        this.cnt = 0
    }
    at(index) {
        if(Array.isArray(this.obj)){
            return this.obj[index]
        }
        return this.obj
    }
    str(...args) {
        return JSON.stringify(this.obj, ...args)
    }
    next() {
        return {value: this.at(this.cnt++), done: !this.at(this.cnt)};
    }
    [Symbol.iterator]() {
        this.cnt = 0
        return this;
    }
}
