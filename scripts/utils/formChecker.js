const formConditions = {
    name: /^[a-zA-Z]{2,}$/,
    email: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9-_]+[.]{1}[a-z]{2,5}$/,
    text: /.{10,}/,
    number: /^\d{1,2}$/
}

export default function formChecker(input){

    let inputChecked = ''

    switch (input.dataset.regex){
        case 'name' :
            inputChecked = input.value.match(formConditions['name']) ? 'true' : 'votre nom doit comporter au moins deux caractères'
            break

            case 'mail' : 
            inputChecked = input.value.match(formConditions['email']) ? 'true' : 'l\'adresse mail n\'est pas valide'
            break

            case 'message' : 
            inputChecked = input.value.match(formConditions['text']) ? 'true' : 'le message est trop court.'
            break

            default : console.error('cet input ne correspond pas à un de ceux attendus')
    }

    return inputChecked

}