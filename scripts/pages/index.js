import MyApi from "../api/Api.js"
import PhotographerCard from "../templates/photographerCard.js"
import init from "../utils/filter.js"

const api = new MyApi('./../../data/photographers.json'),
    photographersContainer = document.querySelector('.photographer-section')

async function main() {
    const photographersInfos = await api.getPhotographers(),
        mediaInfos = await api.getMedia()

    console.log('loaded index')
    console.log(photographersInfos, mediaInfos)

    photographersInfos.forEach(photographer => {
        const card = new PhotographerCard(photographer)
        console.log(photographer, card)
        const myCard = card.createPhotographerCard()
        console.log(myCard)
        photographersContainer.appendChild(myCard)
    });

    init()

}

main()