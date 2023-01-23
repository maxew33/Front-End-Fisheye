/**
 * It takes an event, the index of the last focused element, and an array of focusable elements, and
 * returns the index of the new focused element
 * @param e - the event object
 * @param lastFocusedElt - the index of the last focused element in the focusableElements array
 * @param focusableElements - an array of all the focusable elements in the modal
 * @returns the value of the lastFocusedElt variable.
 */

export default function focusTrap(e, lastFocusedElt, focusableElements){
    let newFocusedElt
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            lastFocusedElt === 0 ? newFocusedElt = focusableElements.length - 1 : newFocusedElt = lastFocusedElt - 1
        }
        else {
            lastFocusedElt === focusableElements.length - 1 ? newFocusedElt = 0 : newFocusedElt = lastFocusedElt + 1
        }
        focusableElements[newFocusedElt].focus()
        lastFocusedElt = newFocusedElt

    }

    return(lastFocusedElt)
}