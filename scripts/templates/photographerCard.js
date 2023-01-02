class PhotographerCard {
    constructor(photographer){
        this.photographer = photographer
    }

    createPhotographerCard() {
        
        const container = document.createElement('article')
        container.classList.add('photographer-card')

        const { name, portrait, city, country, tagline, price, id } = this.photographer;

        const cardContent = `
        <a href ="./photographer.html?id=${id}">
            <img src="./assets/photographers/${portrait}">
            <h2>
                ${name}
            </h2>
        </a>
        <p>
            <span class="place">
                ${city}, ${country}
            </span>
            <span class="tagline">
                ${tagline}
            </span>
            <span class="price">
                ${price}€/jour
            </span>
        </p>`

        container.innerHTML = cardContent
        
        return container
    }
}