const api = new Api('./../data/photographers.json')
const photographersContainer = document.querySelector('.photographer-section')

async function main() {
    const photographersInfos = await api.getPhotographers(),
    mediaInfos = await api.getMedia()

    console.log('loaded')
    console.log(photographersInfos, mediaInfos)


    photographersInfos.forEach(photographer => 
        {
        const card = new PhotographerCard(photographer)
        console.log(photographer, card)
        card.getInfos()
        const myCard = card.createPhotographerCard()
        console.log(myCard)
        photographersContainer.appendChild(myCard)
    });

}

main()