import MediaFactory from "../factories/mediaFactory.js"

export default class PhotographerGallery {
    constructor(gallery, photographer) {
        this._photographer = photographer.name.split(' ')[0]
        this._gallery = gallery
    }

    createPhotographerGallery() {
        const $container = document.createElement('div')
        $container.classList.add('photographer-image')

        const media = new MediaFactory(this._gallery, this._photographer)

        // createTag method get the media type and create img or video tag 
        const cardContent = media.createTag()

        $container.innerHTML = cardContent
        return $container
    }
}