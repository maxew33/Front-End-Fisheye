export default class PhotographerCard {
    constructor(photographer){
        this.photographer = photographer
    }

    createPhotographerCard() {
        
        const $container = document.createElement('article')
        $container.classList.add('photographer-card')

        const { name, portrait, city, country, tagline, price, id } = this.photographer

        const cardContent = `
        <a href="./photographer.html?id=${id}" class="photographer-link">
            <img src="./assets/photographers/${portrait}" class="photographer-portrait" alt="${name}">
            <h2 class="photographer-name">
                ${name}
            </h2>
        </a>
        <p class="photographer-infos">
            <span class="photographer-place">
                ${city}, ${country}
            </span>
            <span class="photographer-tagline">
                ${tagline}
            </span>
            <span class="photographer-price">
                ${price}€/jour
            </span>
        </p>`

        $container.innerHTML = cardContent
        
        return $container
    }
}

// export {PhotographerCard}