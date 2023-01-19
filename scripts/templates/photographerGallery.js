import MediaFactory from "../factories/mediaFactory.js"

export default class PhotographerGallery {
    constructor(gallery, photographer) {
        this._photographer = photographer.name.split(' ')[0]
        this._gallery = gallery
    }

    createPhotographerGallery() {
        const $container = document.createElement('article')
        $container.classList.add('photographer-image-container')

        const customDate = this._gallery.date.replace(/-/g, '')

        $container.dataset.likes = this._gallery.likes
        $container.dataset.title = this._gallery.title
        $container.dataset.date = customDate


        const media = new MediaFactory(this._gallery, this._photographer)

        // createTag method get the media type and create img or video tag 
        const cardMedia = media.createTag('min')

        const cardInfos = `
            <div class="photographer-image-infos">
                <span class="photographer-image-title">${this._gallery.title}</span>
                <span class="photographer-image-likes">${this._gallery.likes}</span>
                &nbsp;
                <button class="photographer-image-likes-increase">
                    <span class="heart heart-empty">
                        <i class="fa-regular fa-heart"></i>
                    </span>

                    <span class="heart heart-filled">
                        <i class="fa-solid fa-heart"></i>
                    </span>

                    <span class="beams-container">
                        <span class="beam"></span>
                        <span class="beam"></span>
                        <span class="beam"></span>
                        <span class="beam"></span>
                        <span class="beam"></span>
                    </span>
                </button>
            </div>
            `

        const cardContent = cardMedia + cardInfos

        $container.innerHTML = cardContent
        return $container
    }
}

/* ENLEVER LES DATA ATTRIBUTES ???? */