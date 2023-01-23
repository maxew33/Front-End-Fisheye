import MediaFactory from "../factories/MediaFactory.js"

export default class PhotographerGallery {
    constructor(gallery) {
        this._gallery = gallery
    }

    createPhotographerGallery() {
        
        const $container = document.createElement('article')
        $container.classList.add('photographer-image-container')

        const { title, date, likes } = this._gallery

        const customDate = date.replace(/-/g, '')

        $container.dataset.likes = likes
        $container.dataset.title = title
        $container.dataset.date = customDate

        const media = new MediaFactory(this._gallery)

        // createTag method get the media type and create img or video tag 
        const cardMedia = media.createTag('min')

        const cardInfos = `
            <div class="photographer-image-infos">
                <span class="photographer-image-title">${title}</span>
                <span class="photographer-image-likes-increase">

                    <span class="photographer-image-likes">${likes}</span>

                    <button span class="hearts-container" aria-label="likes">
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
                </span>
            </div>
            `

        const cardContent = cardMedia + cardInfos

        $container.innerHTML = cardContent
        return $container
    }
}