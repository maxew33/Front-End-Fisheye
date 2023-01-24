/**
 * Creation of an image tag with the given image path and alternative text.
 * return the DOM element
 * */ 

export default class Photo{
    constructor(data) {                     
        this._altText = data.altText
        this._minAltText = data.minAltText
        this._imagePath = data.imagePath
        this._minImagePath = data.minImagePath
    }

    createTag(size){
        let tag = ''

        if(size === "min"){
            tag = `<img src="${this._minImagePath}" class="photographer-media photographer-image" alt="${this._minAltText}" tabindex="0">`
        }
        else{
            tag = `<img src="${this._imagePath}" class="photographer-media photographer-image" alt="${this._altText}" tabindex="0">`
        }
        
        return tag
    }
}
