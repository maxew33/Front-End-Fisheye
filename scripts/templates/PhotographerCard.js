/**
 * creation of a card with the photographer's name, portrait, place, tagline, and price. 
 * return the DOM element.
 */ 

export default class PhotographerCard {
    constructor(photographer){
        this._photographer = photographer
    }

    createPhotographerCard() {
        
        const $container = document.createElement('article')
        $container.classList.add('photographer-card')

        const { name, portraitPath, place, tagline, price, id } = this._photographer

        const cardContent = `
        <div class="photographer-card-container">
        <a href="./photographer.html?id=${id}" class="photographer-link">
            <img src="${portraitPath}" class="photographer-portrait" alt="${name}">
            <h2 class="photographer-name">
                ${name}
            </h2>
        </a>
        <p class="photographer-infos">
            <span class="photographer-place">
                ${place}
            </span>
            <span class="photographer-tagline">
                ${tagline}
            </span>
            <span class="photographer-price">
                ${price}
            </span>
        </p>
        </div>`

        $container.innerHTML = cardContent
        
        return $container
    }
}