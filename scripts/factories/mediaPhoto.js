export default class Photo{
    constructor(data, name) {        
        this._name = name
        this._filename = data.image
        this._title = data.title
    }

    createTag(){
        const tag = `<img src="./assets/sample-photos/${this._name}/${this._filename}" class="photographer-media photographer-image" alt="${this._title}" tabindex="0">`
        return tag
    }
}