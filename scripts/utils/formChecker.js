const formConditions = {
    name: /^[a-zA-Z]{2,}$/,// regular expression to match names with at least 2 alphabetical characters
    email: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9-_]+[.]{1}[a-z]{2,5}$/,// regular expression to match emails in the format of "example@example.com"
    text: /.{10,}/// regular expression to match text with at least 10 characters
}

export default function formChecker(input){

    let inputChecked = ''

// Check the input's data-regex attribute to determine which regular expression to use
// If input value matches the name regular expression, return 'true', otherwise return an error message
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

            default : console.error('the input format is unexpected')
    }

    return inputChecked

}