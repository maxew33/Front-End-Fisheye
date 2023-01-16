export default class Photo{
    constructor(data, name) {        
        this._name = name
        this._filename = data.image
        this._title = data.title
    }

    createTag(size){
        let tagPart1 = `<img src="./assets/sample-photos/`
        size === 'min' && (tagPart1 += 'min/')
        const tagPart3 = `${this._name}/${this._filename}" class="photographer-media photographer-image" alt="${this._title}" tabindex="0">`

        const tag = tagPart1 + tagPart3
        return tag
    }
}