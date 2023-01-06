import MyApi from "../api/Api.js"
import PhotographerGallery from "../templates/photographerGallery.js"
import PhotographerBanner from "../templates/photographerBanner.js"

const api = new MyApi('./../../data/photographers.json'),
    mainContainer = document.querySelector('.photographer-banner'),
    gallery = document.querySelector('.photographer-gallery'),
    carousel = document.querySelector('.photographer-carousel'),
    carouselImagesContainer = document.querySelector('.images-container'),
    body = document.querySelector('body')

let imageIndex = 0, //index of the current photo for the carousel
    imageQty = 0

async function main() {
    const photographersInfos = await api.getPhotographers(),
        mediaInfos = await api.getMedia()

    //get photographer id from url
    const myURL = new URLSearchParams(document.location.search)
    const photographerId = parseInt(myURL.get("id"))

    const myPhotographer = photographersInfos.filter(photographer => {
        return photographer['id'] === photographerId
    })


    //creation of the banner for the selected photograph
    const photographerInfos = new PhotographerBanner(myPhotographer[0])
    const banner = photographerInfos.createPhotographerBanner()
    mainContainer.innerHTML = banner

    // get the photographer's media
    const myMedia = mediaInfos.filter(media => {
        return media['photographerId'] === photographerId
    }
    )

    imageQty = myMedia.length

    console.log(imageQty)

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
            const photographerGallery = new PhotographerGallery(media, myPhotographer[0])
            const img = photographerGallery.createPhotographerGallery(),
                imgClone = img.cloneNode(true) // clone the img const in order to uyse it a second time

            gallery.appendChild(img)
            carouselImagesContainer.appendChild(imgClone)

        })

        const myImages = [...document.querySelectorAll('.photographer-gallery .photographer-media')]

        console.log(myImages)

        //when I click, open the carousel wtih the right index
        myImages.forEach((image, idx) =>
            image.addEventListener('click', () => {
                console.log(myMedia, idx)
                carousel.style.display = 'grid'
                body.style.overflow='hidden'
            }))
    }

    fillGallery('title')

    const sortingButtons = document.querySelectorAll('.sorting-button')

    sortingButtons.forEach(button => button.addEventListener('click', e => {
        console.log('clic on btn', e.target.dataset.sortingValue)
        fillGallery(e.target.dataset.sortingValue)
    }))

    /* add my utils js after everything is loaded */
    /*const script = document.createElement('script')
    script.src = "./scripts/utils/filter.js"
    script.async = true
    document.head.appendChild(script)

    const script2 = document.createElement('script')
    script2.src = "./scripts/utils/contactForm.js"
    script2.async = true
    document.head.appendChild(script2)*/


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
        imageIndex += (idx * 2 - 1)
        console.log(imageIndex)
        imageIndex < 0 || imageIndex > imageQty ? console.log('caca') : console.log('ok')
        document.documentElement.style.setProperty('--carousel-idx', imageIndex)
    })
})