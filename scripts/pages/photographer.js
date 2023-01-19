import MyApi from "../api/Api.js"

import PhotographerGallery from "../templates/photographerGallery.js"
import PhotographerBanner from "../templates/photographerBanner.js"

import MediaFactory from "../factories/mediaFactory.js"

import focusTrap from "../utils/focusTrap.js"
import { closeModal, openModal } from "../utils/modalsDisplaying.js"

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
    galleryContent = [] // an array with the media

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

    //remove content from the gallery
    gallery.innerHTML = ''
    galleryContent.length = 0

    //fill the galleryContent array 
    myMedia.forEach(media => {
        photographerLikes += media.likes
        const photographerGallery = new PhotographerGallery(media, myPhotographer)
        const img = photographerGallery.createPhotographerGallery()
        galleryContent.push(img)
    })

    //fill the gallery with the medias and their infos
    const fillGallery = (content) => content.forEach(elt => {
        gallery.length = 0
        gallery.appendChild(elt)
    })

    fillGallery(galleryContent)

    /* filter the gallery : date / likes / title */
    const filteredGallery = (filteredValue) => {

        galleryContent.sort(function (a, b) {

/* Converting the string to a number. */
            let aValue = + a.dataset[filteredValue]            
            let bValue = + b.dataset[filteredValue]

/* Checking if the value is a number. If it is not, it is assigning the value to the variable. */
            !aValue && (aValue = a.dataset[filteredValue])
            !bValue && (bValue = b.dataset[filteredValue])

            if (aValue < bValue) {
                return -1
            }
            if (aValue > bValue) {
                return 1
            }
            return 0
        }
        )

        fillGallery(galleryContent)
    }

    //increasing / decreasing by 1 likes when clicking on the heart
    const mediaLikesQty = [...document.querySelectorAll('.photographer-image-likes')],mediaLikesBtn = [...document.querySelectorAll('.photographer-image-likes-increase')],
    heartCharacter = [...document.querySelectorAll('.photographer-image-likes-increase .heart-filled')],
    heartBeams = [...document.querySelectorAll('.photographer-image-likes-increase .beams-container')],
    likesIncreased = [] // know if the media is already liked
    likesIncreased.length = mediaQty
    likesIncreased.fill(false)

    mediaLikesBtn.forEach((like, index) => like.addEventListener('click', () => {
        mediaLikesQty[index].textContent = myMedia[index].likes + (likesIncreased[index] ? 0 : 1)
        photographerLikes += likesIncreased[index] ? -1 : 1

        const animatedHeart = [heartCharacter[index], heartBeams[index]]
        animatedHeart.forEach(elt => elt.classList.toggle('active'))
        
        likesIncreased[index] = !likesIncreased[index]

        photographerLikesQty.textContent = photographerLikes
    }))


    // lightbox logic
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
        openModal(lightbox, lightboxBtns, lightboxNavigation)
        mediaIndex = idx
        displaylightboxMedia(idx)
        lastFocusedElt = 0
    }

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
    const displayContactModal = [...document.querySelectorAll('.display-modal-button')],
        contactModalBtns = [...document.querySelectorAll('.contact-modal-focusable-elt')]
    let modalDisplayed = false

    photographerNameModal.textContent = myPhotographer.name

    const contactModalNavigation = e => {
        e.key === 'Tab' && e.preventDefault()
        e.key === 'Escape' && (closeModal(contactModal, contactModalNavigation), modalDisplayed = !modalDisplayed)
        console.log(e.target)
        lastFocusedElt = focusTrap(e, lastFocusedElt, contactModalBtns)
    }

    displayContactModal.forEach(btn => {

        btn.addEventListener('click', () => {
            modalDisplayed ? closeModal(contactModal, contactModalNavigation) : (openModal(contactModal, contactModalBtns, contactModalNavigation),
                lastFocusedElt = 0)
            modalDisplayed = !modalDisplayed
        })
    })

    //filters 

    const filtersContainer = document.querySelector('.filters-container'),
    filtersBtnContainerOpener = document.querySelector('.filters-btn-opener'),
    filtersBtnContainerOpenerName = document.querySelector('.filters-btn-opener-name'),
    filtersBtnContainer = document.querySelector('.filters-btn-container'),
    filterButtons = document.querySelectorAll('.filter-btn')

     filtersBtnContainerOpener.addEventListener('click', () => filtersBtnContainer.classList.add('open'))

    filterButtons.forEach(button => button.addEventListener('click', e => {
        const filterSelected = e.target.innerText
        filteredGallery(e.target.dataset.filterValue)
        filtersBtnContainer.classList.remove('open')
        filtersBtnContainerOpenerName.innerText = filterSelected
    }))

    //Display photographers infos : likes and price
    photographerLikesQty.textContent = photographerLikes
    photographerPriceValue.textContent = myPhotographer.price

}

main()