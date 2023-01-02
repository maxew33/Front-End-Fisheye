class PhotographerGallery {
    constructor(gallery, photographer) {
        this.photographer = photographer
        this.gallery = gallery
    }

    createPhotographerGallery() {

        const { title, image, likes, date, video } = this.gallery

        const container = document.createElement('div')
        container.classList.add('photographer-image')

        console.log(this.photographer.name.split(' ')[0])

        const fileName = this.photographer.name.split(' ')[0]

        console.log(fileName)

        const cardContent =
            image ?
                `
            <img src="./assets/sample-photos/${fileName}/${image}">
            `
                :
                `
            <video controls loop muted autoplay width="250">
        
            <source src="./assets/sample-photos/${fileName}/${video}"
                    type="video/mp4">
                    </video>
            `
        container.innerHTML = cardContent
        return container
    }
}