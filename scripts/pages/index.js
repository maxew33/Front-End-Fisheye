import MyApi from "../api/Api.js"
import Photographer from "../models/Photographer.js"
import PhotographerCard from "../templates/photographerCard.js"

const api = new MyApi('./../../data/photographers.json'),
    photographersContainer = document.getElementById('main-homepage')

async function main() {
    const photographersInfos = await api.getPhotographers()

    photographersInfos
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
            const card = new PhotographerCard(photographer)
            const myCard = card.createPhotographerCard()
            photographersContainer.appendChild(myCard)
        })
}

main()