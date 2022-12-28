class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer
    }

    getInfos() {
        return console.log(this.photographer.name)
    }

    createPhotographerCard() {

        const container = document.createElement('article')
        container.classList.add('photographer-card')

        /*const cardContent = `
        <img src="./assets/photographers/${this.photographer.portrait}>
        <h2>${this.photographer.name}</h2>`*/

        const cardContent = `
        <img src="./assets/photographers/${this.photographer.portrait}">
        <h2>${this.photographer.name}</h2>`

        container.innerHTML = cardContent
        return container
    }
}