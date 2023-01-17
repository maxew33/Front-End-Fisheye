export default class Photo{
    constructor(data, name) {        
        this._name = name
        this._filename = data.image
        this._title = data.title
        this._date = data.date
        this._likes = data.likes
    }

    createTag(size){
        let tagPart1 = `<img src="./assets/sample-photos/`
        size === 'min' && (tagPart1 += 'min/')
        const tagPart3 = `${this._name}/${this._filename}" class="photographer-media photographer-image" alt="${this._title}" tabindex="0" data-date=${this._date} data-likes=${this._likes} data-title=${this._title}>`

        const tag = tagPart1 + tagPart3
        return tag
    }
}

/* ENLEVER LES DATA ATTRIBUTES ???? */