import MediaFactory from "../factories/mediaFactory.js"

export default class PhotographerCarousel {
    constructor(gallery, photographer) {
        this._photographer = photographer.name.split(' ')[0]
        this._gallery = gallery
    }

    createPhotographerGallery() {
        const $container = document.createElement('div')
        $container.classList.add('photographer-media-container')

        const media = new MediaFactory(this._gallery, this._photographer)

        // createTag method get the media type and create img or video tag 
        const cardMedia = media.createTag()

        const cardInfos = `
            <div class="photographer-image-infos">
                <span class="photographer-image-title">${this._gallery.title}</span>
                <span class="photographer-image-likes">${this._gallery.likes}</span >&nbsp;<button class="photographer-image-likes-increase">❤</button>
            </div>
            `

        const cardContent = cardMedia + cardInfos

        $container.innerHTML = cardContent
        return $container
    }
}