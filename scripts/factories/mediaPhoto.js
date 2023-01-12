export default class Photo{
    constructor(data, name) {        
        this._name = name
        this._filename = data.image
    }

    createTag(){
        const tag = `<img src="./assets/sample-photos/${this._name}/${this._filename}" class="photographer-media photographer-image">`
        return tag
    }
}