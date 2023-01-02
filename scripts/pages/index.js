const api = new Api('./../../data/photographers.json'),
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

}

main()