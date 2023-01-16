import MyApi from "../api/Api.js"
import PhotographerGallery from "../templates/photographerGallery.js"
import PhotographerBanner from "../templates/photographerBanner.js"
import MediaFactory from "../factories/mediaFactory.js"
import focusTrap from "../utils/focusTrap.js"

const api = new MyApi('./../../data/photographers.json'),
    mainContainer = document.querySelector('.photographer-banner'),
    gallery = document.querySelector('.photographer-gallery'),
    lightbox = document.querySelector('.photographer-lightbox'),
    lightboxMediaContainer = document.querySelector('.media-container'),
    lightboxMediaTitle = document.querySelector('.media-title'),
    contactModal = document.getElementById('contact_modal'),
    photographerNameModal = document.querySelector('.photographer-name'),
    photographerLikesQty = document.querySelector('.photographer-likes-qty'),
    photographerPriceValue = document.querySelector('.photographer-price-value'),
    body = document.querySelector('body')

let mediaIndex = 0, //index of the current photo for the lightbox
    mediaQty = 0,
    photographerLikes = 0, // sum of the likes
    photographerName = "",
    lastFocusedElt = 0 // index of the last focused element within the focus trap

async function main() {
    const photographersInfos = await api.getPhotographers(),
        mediaInfos = await api.getMedia()

    //get photographer id from url
    const myURL = new URLSearchParams(document.location.search)
    const photographerId = parseInt(myURL.get("id"))

    const myPhotographer = photographersInfos.filter(photographer => {
        return photographer['id'] === photographerId
    })[0]

    photographerName = myPhotographer.name.split(' ')[0]

    //creation of the banner for the selected photograph
    const photographerInfos = new PhotographerBanner(myPhotographer)
    const banner = photographerInfos.createPhotographerBanner()
    mainContainer.innerHTML = banner

    //get the photographer's media
    const myMedia = mediaInfos.filter(media => {
        return media['photographerId'] === photographerId
    }
    )

    mediaQty = myMedia.length

    const fillGallery = (sortingValue) => {
        //remove content from the gallery
        gallery.innerHTML = ''

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
            const img = photographerGallery.createPhotographerGallery()

            gallery.appendChild(img)
        })

        //increasing / decreasing by 1 likes when clicking on the heart
        const mediaLikesQty = [...document.querySelectorAll('.photographer-image-likes')]
        const mediaLikesBtn = [...document.querySelectorAll('.photographer-image-likes-increase')]
        const likesIncreased = [] // know if the media is already liked
        likesIncreased.length = mediaQty
        likesIncreased.fill(false)

        mediaLikesBtn.forEach((like, index) => like.addEventListener('click', () => {
            mediaLikesQty[index].textContent = myMedia[index].likes + (likesIncreased[index] ? 0 : 1)
            photographerLikes += likesIncreased[index] ? -1 : 1
            likesIncreased[index] = !likesIncreased[index]

            photographerLikesQty.textContent = photographerLikes
        }))


        // open the lightbox
        const myImages = [...document.querySelectorAll('.photographer-gallery .photographer-media')]

        //when I click, open the lightbox with the right index
        myImages.forEach((image, idx) => {
            image.addEventListener('click', () => {
                openlightbox(idx)
            })
            image.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    openlightbox(idx)
                }
            })
        })

        //open the lightbox
        function openlightbox(idx) {
            lightbox.style.display = 'grid'
            body.style.overflow = 'hidden'
            mediaIndex = idx
            displaylightboxMedia(idx)
            window.addEventListener('keydown', lightboxNavigation)
            lightboxBtns[lastFocusedElt].focus()
        }
    }

    fillGallery('title')

    //lightbox logic    
    const closelightboxBtn = document.querySelector('.lightbox-close'),
        lightboxDirectionsBtns = [...document.querySelectorAll('.lightbox-direction-btn')],
        lightboxBtns = [...lightboxDirectionsBtns, closelightboxBtn]

    const lightboxNavigation = e => {
        e.preventDefault()
        e.key === 'Escape' && closeModal(lightbox, lightboxNavigation)
        e.key === 'ArrowLeft' && lightboxBtnNav(0)
        e.key === 'ArrowRight' && lightboxBtnNav(1)
        lastFocusedElt = focusTrap(e, lastFocusedElt, lightboxBtns)
    }

    //displaying lightbox media
    const displaylightboxMedia = (idx) => {
        const media = new MediaFactory(myMedia[idx], photographerName)
        lightboxMediaTitle.innerText = myMedia[idx].title
        lightboxMediaContainer.innerHTML = media.createTag()
    }

    //lightbox interactions

    closelightboxBtn.addEventListener('click', () => {
        closeModal(lightbox, lightboxNavigation)
    })
    closelightboxBtn.addEventListener('keydown', e => {
        e.key === 'Enter' && closeModal(lightbox, lightboxNavigation)
    })

    lightboxDirectionsBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            lightboxBtnNav(idx)
        })
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                lightboxBtnNav(idx)
            }
        })
    })

    function lightboxBtnNav(idx) {
        mediaIndex += (idx * 2 - 1)
        mediaIndex > mediaQty - 1 && (mediaIndex = 0)
        mediaIndex < 0 && (mediaIndex = mediaQty - 1)
        displaylightboxMedia(mediaIndex)
    }

    //Contact modal
    const displayModal = [...document.querySelectorAll('.display-modal-button')]
    let modalDisplayed = "block"

    photographerNameModal.textContent = myPhotographer.name

    displayModal.forEach(btn => {
        console.log('ccc')
        btn.addEventListener('click', () => {
            console.log('ccc')
            contactModal.style.display = modalDisplayed
            modalDisplayed = modalDisplayed === 'block' ? 'none' : 'block'
        })
    })


    // closing the modals

    const closeModal = (modal, focusTrap) => {
        modal.style.display = 'none'
        body.style.overflow = 'auto'
        lastFocusedElt = 0
        window.removeEventListener('keydown', focusTrap)
    }

    //filters 1) with ul / li list - 2) whit a select tag
    const sortingButtons = document.querySelectorAll('.sorting-button')

    sortingButtons.forEach(button => button.addEventListener('click', e => {
        console.log('clic on btn', e.target.dataset.sortingValue)
        fillGallery(e.target.dataset.sortingValue)
    }))

    document.getElementById('filter').addEventListener('change', e => fillGallery(e.target.value))

    //Display photographers infos : likes and price
    photographerLikesQty.textContent = photographerLikes
    photographerPriceValue.textContent = myPhotographer.price

}

main()

