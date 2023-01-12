import MyApi from "../api/Api.js"
import PhotographerGallery from "../templates/photographerGallery.js"
import PhotographerBanner from "../templates/photographerBanner.js"

const api = new MyApi('./../../data/photographers.json'),
    mainContainer = document.querySelector('.photographer-banner'),
    gallery = document.querySelector('.photographer-gallery'),
    carousel = document.querySelector('.photographer-carousel'),
    carouselImagesContainer = document.querySelector('.images-container'),
    photographerLikesQty = document.querySelector('.photographer-likes-qty'),
    photographerPriceValue = document.querySelector('.photographer-price-value'),
    body = document.querySelector('body')

let imageIndex = 0, //index of the current photo for the carousel
    imageQty = 0,
    photographerLikes = 0

async function main() {
    const photographersInfos = await api.getPhotographers(),
        mediaInfos = await api.getMedia()

    //get photographer id from url
    const myURL = new URLSearchParams(document.location.search)
    const photographerId = parseInt(myURL.get("id"))

    const myPhotographer = photographersInfos.filter(photographer => {
        return photographer['id'] === photographerId
    })[0]

    //creation of the banner for the selected photograph
    const photographerInfos = new PhotographerBanner(myPhotographer)
    const banner = photographerInfos.createPhotographerBanner()
    mainContainer.innerHTML = banner
    
    //get the photographer's media
    const myMedia = mediaInfos.filter(media => {
        return media['photographerId'] === photographerId
    }
    )

    imageQty = myMedia.length

    const fillGallery = (sortingValue) => {
        //remove content from the gallery
        gallery.innerHTML = ''
        carouselImagesContainer.innerHTML = ''

        // get the data filtered
        myMedia.sort(function (a, b) {
            if (a[sortingValue] < b[sortingValue]) {
                return -1
            }
            if (a[sortingValue] > b[sortingValue]) {
                return 1
            }
            return 0
        })

        //fill the gallery with the filtered data
        myMedia.forEach(media => {

            photographerLikes += media.likes
            console.log(media.likes)
            const photographerGallery = new PhotographerGallery(media, myPhotographer)
            const img = photographerGallery.createPhotographerGallery(),
                imgClone = img.cloneNode(true) // clone the img const in order to use it a second time

            gallery.appendChild(img)
            carouselImagesContainer.appendChild(imgClone)

        })

        const myImages = [...document.querySelectorAll('.photographer-gallery .photographer-media')]

        //when I click, open the carousel wtih the right index
        myImages.forEach((image, idx) =>
            image.addEventListener('click', () => {
                console.log(myMedia, idx)
                carousel.style.display = 'grid'
                body.style.overflow = 'hidden'
            }))
    }

    fillGallery('title')

    //filters 1) with ul / li list - 2) whit a select tag
    const sortingButtons = document.querySelectorAll('.sorting-button')

    sortingButtons.forEach(button => button.addEventListener('click', e => {
        console.log('clic on btn', e.target.dataset.sortingValue)
        fillGallery(e.target.dataset.sortingValue)
    }))

    document.getElementById('filter').addEventListener('change', e=>fillGallery(e.target.value))

    
    //Display photographers infos : likes and price
    photographerLikesQty.textContent = photographerLikes
    photographerPriceValue.textContent = myPhotographer.price


    //Contact modal

    const displayModal = [...document.querySelectorAll('.display-modal-button')],
        contactModal = document.getElementById('contact_modal')

    let modalDisplayed = "block"

    displayModal.forEach(btn => {
        console.log('ccc')
        btn.addEventListener('click', () => {
            console.log('ccc')
            contactModal.style.display = modalDisplayed
            modalDisplayed = modalDisplayed === 'block' ? 'none' : 'block'
        })

    })

}

main()

// carousel navigation

const closeCarousel = document.querySelector('.carousel-close'),
    carouselBtns = [...document.querySelectorAll('.carousel-direction-btn')]

closeCarousel.addEventListener('click', () => {
    carousel.style.display = 'none'
    body.style.overflow = 'auto'
})

carouselBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        let prevIndex = imageIndex
        imageIndex += (idx * 2 - 1)
        console.log(imageIndex)
        if (imageIndex < 0 || imageIndex > imageQty - 1) { (imageIndex = prevIndex) }
        console.log(imageIndex)
        document.documentElement.style.setProperty('--carousel-idx', imageIndex)
    })
})