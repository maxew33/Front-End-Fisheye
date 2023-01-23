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
        
        const { name, portraitPath, place, tagline } = this.photographer

        const cardContent = `
        <div class="photographer-infos">
            <h1 class="photographer-name">
                ${name}
            </h1>
            <span class="photographer-place">
                ${place}
            </span>
            <span class="photographer-tagline">
                ${tagline}
            </span>
        </div>
        <button class="contact_button display-modal-button" aria-label="contact me">Contactez-moi</button>
        <img src="${portraitPath}" class="photographer-portrait" alt="${name}">
            `

        return cardContent
    }
}