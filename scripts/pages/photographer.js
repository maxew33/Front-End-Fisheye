import MyApi from "../api/Api.js"

// constructor pattern
import Photographer from "../models/Photographer.js"
import Media from "../models/Media.js"

// factory pattern
import MediaFactory from "../factories/MediaFactory.js"

// templates
import PhotographerBanner from "../templates/PhotographerBanner.js"
import PhotographerGallery from "../templates/PhotographerGallery.js"

// utils functions
import focusTrap from "../utils/focusTrap.js"
import { closeModal, openModal } from "../utils/modalsDisplaying.js"
import formChecker from "../utils/formChecker.js"

const api = new MyApi('data/photographers.json'),

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
    lastFocusedElt = 0, // index of the last focused element within the focus trap
    mediaSelected // media clicked to open the lightbox

async function main() {
    const photographersInfos = await api.getPhotographers(),
        mediaInfos = await api.getMedia()

    //get photographer id from url
    const myURL = new URLSearchParams(document.location.search)
    const photographerId = parseInt(myURL.get("id"))

    const myPhotographer = new Photographer(photographersInfos.find(photographer => {
        return photographer['id'] === photographerId
    }))

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

    /**
     * 
     * the gallery
     * 
     */

    //remove content from the gallery
    gallery.innerHTML = ''
    galleryContent.length = 0

    //fill the galleryContent array 
    myMedia
        .map(media => new Media(media, photographerId))
        .forEach(media => {
            photographerLikes += media.likes
            const photographerGallery = new PhotographerGallery(media)
            const img = photographerGallery.createPhotographerGallery()
            galleryContent.push(img)
        })

    //fill the gallery with the medias and their infos
    const fillGallery = (content) => content.forEach(elt => {
        gallery.appendChild(elt)
    })

    fillGallery(galleryContent)

    //increasing / decreasing by 1 likes when clicking on the heart
    const mediaLikesQty = [...document.querySelectorAll('.photographer-image-likes')], mediaLikesBtn = [...document.querySelectorAll('.photographer-image-likes-increase')],
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

    /**
     * 
     * the lightbox
     * 
     */

    // lightbox logic
    const myImages = [...document.querySelectorAll('.photographer-gallery .photographer-media')]

    //when I click, open the lightbox with the right index
    myImages.forEach((image, idx) => {
        mediaSelected = image
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
        e.key === 'Escape' && (closeModal(lightbox, lightboxNavigation), mediaSelected.focus())
        e.key === 'ArrowLeft' && lightboxBtnNav(0)
        e.key === 'ArrowRight' && lightboxBtnNav(1)
        lastFocusedElt = focusTrap(e, lastFocusedElt, lightboxBtns)
    }

    //displaying lightbox media
    const displaylightboxMedia = (idx) => {
        const media = new MediaFactory(new Media(myMedia[idx], photographerId))
        lightboxMediaTitle.innerText = myMedia[idx].title
        lightboxMediaContainer.innerHTML = media.createTag()
    }

    //lightbox interactions
    closelightboxBtn.addEventListener('click', () => {
        closeModal(lightbox, lightboxNavigation)
        mediaSelected.focus()
    })
    closelightboxBtn.addEventListener('keydown', e => {
        e.key === 'Enter' && (closeModal(lightbox, lightboxNavigation), mediaSelected.focus())
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

    /**
     * 
     * the contact modal
     * 
     */

    const displayContactModal = [...document.querySelectorAll('.display-modal-button')],
        contactModalBtns = [...document.querySelectorAll('.contact-modal-focusable-elt')]
    let modalDisplayed = false

    photographerNameModal.textContent = myPhotographer.name

    const contactModalNavigation = e => {
        e.key === 'Tab' && e.preventDefault()
        if (e.key === 'Escape') {
            closeModal(contactModal, contactModalNavigation)
            modalDisplayed = !modalDisplayed
            displayContactModal[0].focus()
        }
        lastFocusedElt = focusTrap(e, lastFocusedElt, contactModalBtns)
    }

    displayContactModal.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalDisplayed) {
                closeModal(contactModal, contactModalNavigation)
                displayContactModal[0].focus()
            }
            else {
                openModal(contactModal, contactModalBtns, contactModalNavigation)
                lastFocusedElt = 0
            }
            modalDisplayed = !modalDisplayed
        })
    })

    /* When the submit button is clicked, the page is not reloaded. 
    if the form is correctly filled, the values of the form are logged in the console. the modal is closed, otherwise an error message is displayed. */
    contactModal.addEventListener('submit', e => {
        e.preventDefault()
        const inputs = [...document.querySelectorAll('.contact-form input'), document.querySelector('.contact-form textarea')] // select the inputs + textarea
        const errorMsg = [...document.querySelectorAll('.contact-form .hidden')] // select the message error container

        let inputsCorrect = 0

        inputs.forEach((input, idx) => {
            const inputChecked = formChecker(input)
            if(inputChecked === 'true'){
                inputsCorrect += 1
                input.setAttribute('aria-invalid', false)
                errorMsg[idx].style.display='none'
            }
            else{
                console.error(inputChecked)
                input.setAttribute('aria-invalid', true)
                errorMsg[idx].style.display='block'
            }
        })

        console.log(inputsCorrect)

        if(inputsCorrect === inputs.length){
            console.log('prénom: ', document.getElementById('first-name').value,
            '\n',
            'nom : ', document.getElementById('last-name').value,
            '\n',
            'email: ', document.getElementById('mail').value,
            '\n',
            'message: ', document.getElementById('message').value)

            closeModal(contactModal, contactModalNavigation)
            modalDisplayed = !modalDisplayed
            displayContactModal[0].focus()
        }       
    })

    /**
     * 
     * the media filters
     * 
     */
    
    const filtersBtnContainerOpener = document.querySelector('.filters-btn-opener'),
        filtersBtnContainerOpenerName = document.querySelector('.filters-btn-opener-name'),
        filtersBtnContainer = document.querySelector('.filters-btn-container'),
        filterButtons = document.querySelectorAll('.filter-btn')

    filtersBtnContainerOpener.addEventListener('click', () => {
        filtersBtnContainer.classList.add('open')
        filtersBtnContainerOpener.setAttribute('aria-expanded', 'true')
        filterButtons[0].focus()
    })

    filterButtons.forEach((button, idx) => {

        button.addEventListener('click', () => {
            filterButtonSelected(button.id, button.innerText)
        })

        button.addEventListener('keydown', e => {
            e.key === 'Enter' && filterButtonSelected(button.id, button.innerText)
            e.key === 'Escape' && filtersBtnContainer.classList.remove('open')
            e.key === 'ArrowDown' &&  filterButtons[idx === filterButtons.length - 1 ? idx : idx+1].focus()
            e.key === 'ArrowUp' && filterButtons[idx === 0 ? idx : idx-1].focus()
        })
    })

    //function triggered when a filter is selected
    const filterButtonSelected = (id, text) => {
        filteredGallery(id)
        filtersBtnContainer.classList.remove('open')
        filtersBtnContainerOpener.setAttribute('aria-expanded', 'false')
        filtersBtnContainerOpener.setAttribute('aria-activedescendant', id)
        filtersBtnContainerOpenerName.innerText = text
    }

    /* display the filtered the gallery : date / likes / title */
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

    //Display photographers infos : likes and price
    photographerLikesQty.textContent = photographerLikes
    photographerPriceValue.textContent = myPhotographer.price

}

main()