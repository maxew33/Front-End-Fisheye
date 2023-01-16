export default class PhotographerBanner{
    constructor(photographer){
        this.photographer = photographer
    }

/**
 * It creates a banner for a photographer.
 * 
 * The function is called in the following way:
 * @returns {string} cardContent - photographer infos for homepage
 */
    createPhotographerBanner() {
        
        const { name, portrait, city, country, tagline } = this.photographer

        const cardContent = `
        <div class="photographer-infos">
            <h2 class="photographer-name">
                ${name}
            </h2>
            <span class="photographer-place">
                ${city}, ${country}
            </span>
            <span class="photographer-tagline">
                ${tagline}
            </span>
        </div>
        <button class="contact_button display-modal-button">Contactez-moi</button>
            <img src="./assets/photographers/${portrait}" class="photographer-portrait" alt="${name}">
            `

        return cardContent
    }
}