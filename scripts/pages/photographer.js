import MyApi from "../api/Api.js"
import PhotographerGallery from "../templates/photographerGallery.js"
import PhotographerBanner from "../templates/photographerBanner.js"

const api = new MyApi('./../../data/photographers.json'),
    mainContainer = document.querySelector('.photographer-banner'),
    gallery = document.querySelector('.photographer-gallery'),
    carousel = document.querySelector('.photographer-carousel')

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
    mainContainer.appendChild(banner)

    // get the photographer's media
    const myMedia = mediaInfos.filter(media => {
        return media['photographerId'] === photographerId
    }
    )

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
            const photographerGallery = new PhotographerGallery(media, myPhotographer[0])
            const img = photographerGallery.createPhotographerGallery(),
            imgClone = img.cloneNode(true) // clone the img const in order to uyse it a second time

            carousel.appendChild(img)
            gallery.appendChild(imgClone)

        })

        const myImages = document.querySelectorAll('.photographer-image')

        //when i click, open the carousel wtih the right index
        myImages.forEach((image, idx) => 
            image.addEventListener('click', () => console.log(myMedia, idx)))
    }

    fillGallery('title')

    // const photographerInfos = new PhotographerInfos(photographer)

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

}

main()