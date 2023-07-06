let modal = document.getElementById('contact_modal')

// Ouvrir le formulaire
function openModal() {
    modal.style.display = "block";
    modal.ariaHidden = "false"

    document.body.addEventListener('focus', accessibilityFocus, true)
}

// Fermer le formulaire
function closeModal() {
    document.body.removeEventListener('focus', accessibilityFocus, true)
    modal.style.display = "none";
    modal.ariaHidden = "true"
}

// Garder le focus dans le modal
function accessibilityFocus(element) {
    let modalNodes = modal.getElementsByTagName('*')
    let isInclude = Array.from(modalNodes).filter((e) => e.isEqualNode(element.target))
    console.log(element.target)
    if (isInclude.length === 0)
        document.getElementById('contact-firstName').focus()
}

// Vérification du minimum de caractères
function checkMinLength(string, length) {
    if (string.length >= length)
        return true;
    return false;
}

// Vérification de la forme de l'email
function validateEmail(email) {
    var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
}

// Affichage d'un message d'erreur sur le champ concerné
function writeError(id, message) {
    document.getElementById(id).innerText = message
}

// Soumission du formulaire
function submit(e) {
    e.preventDefault();

    var firstName = document.getElementById('contact-firstName').value;
    var lastName = document.getElementById('contact-lastName').value;
    var email = document.getElementById('contact-email').value;
    var message = document.getElementById('contact-message').value;

    if (checkMinLength(firstName, 1) && checkMinLength(lastName, 1) && validateEmail(email) && checkMinLength(message, 10)) {
        console.log(`Prénom : ${firstName}\nNom : ${lastName}\nEmail : ${email}\nMessage : ${message}`)
        return true
    }
    else {
        // Écriture des erreurs du formulaire
        if (!checkMinLength(firstName, 1))
            writeError('error-firstName', "Veuillez renseignez le champs");

        if (!checkMinLength(lastName, 1))
            writeError('error-lastName', "Veuillez renseignez le champs");

        if (!validateEmail(email))
            writeError('error-email', "Le format de l'email n'est pas correct.");

        if (!checkMinLength(email))
            writeError('error-message', "Veuillez renseigner un message");

        return false
    }
}

//  ------- Function de test pour les champs de text -------

function eventListenerCheckMinLength(id, length, idError, error) {
    document.getElementById(id).addEventListener('input', (e) => {
        if (!checkMinLength(e.target.value, length))
            writeError(idError, error);
        else
            writeError(idError, "");
    })
}

function eventListenerValidateEmail(id, idError, error) {
    document.getElementById(id).addEventListener('input', (e) => {
        if (!validateEmail(e.target.value))
            writeError(idError, error);
        else
            writeError(idError, "");
    })
}

function eventListenerSubmit() {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        submit(e);
    })
}

//  ------- Function éxécutée à l'instanciation de la factory -------
function initForm() {
    // Créer les éventListener sur les champs du formulaire
    eventListenerCheckMinLength('contact-firstName', 1, 'error-firstName', 'Veuillez renseignez le champs');
    eventListenerCheckMinLength('contact-lastName', 1, 'error-lastName', 'Veuillez renseignez le champs');
    eventListenerValidateEmail('contact-email', 'error-email', 'Le format de l\'email n\'est pas correct.');
    eventListenerCheckMinLength('contact-message', 10, 'error-message', 'Veuillez renseigner un message de plus de 10 caractères');
    eventListenerSubmit();
}

initForm();
