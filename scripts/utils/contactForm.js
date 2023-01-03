const displayModal = [...document.querySelectorAll('.display-modal-button')],
contactModal = document.getElementById('contact_modal')

let modalDisplayed = "block"

displayModal.forEach(btn => {
    btn.addEventListener('click', () => {
        contactModal.style.display = modalDisplayed
        modalDisplayed = modalDisplayed === 'block' ? 'none' : 'block'
    })
    
})