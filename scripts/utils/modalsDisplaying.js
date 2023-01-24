
const body = document.querySelector('body')

/**
 * @param modal - the modal element
 * @param focusableElements - an array of all the focusable elements in the modal
 * @param focusTrap - a function that traps the focus within the modal
 */

/**
 * When the modal is opened, the body's overflow is set to hidden, the first focusable element is
 * focused, and the focus trap is activated.
 */
export function openModal(modal, focusableElements, focusTrap) {
    modal.style.display = 'grid'
    body.style.overflow = 'hidden'
    window.addEventListener('keydown', focusTrap)
    focusableElements[0].focus()
}

/**
 * When the user clicks the close button, the modal is hidden, the body's overflow is set to auto, and
 * the focus trap is removed.
 */
export function closeModal(modal, focusTrap) {
    modal.style.display = 'none'
    body.style.overflow = 'auto'
    window.removeEventListener('keydown', focusTrap)
}


