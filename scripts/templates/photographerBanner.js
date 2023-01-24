/**
 * creation of a banner with the photographer's infos (name, portrait, place and tagline) and a contact button. 
 * return the DOM element.
 * */ 

export default class PhotographerBanner{
    constructor(photographer){
        this.photographer = photographer
    }

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