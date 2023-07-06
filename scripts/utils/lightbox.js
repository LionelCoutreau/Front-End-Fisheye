let lightbox = document.getElementById('lightbox-modal')

// Variable globales pour stocker mes medias
let medias = ''

// Fonction pour ouvrir la lightbox
function openLightbox(data, position) {
    console.log("Data : ", data);
    console.log("Position :", position);
    lightbox.style.display = "block";
    lightbox.ariaHidden = "false";

    // Ajout des medias dans la variable globale
    medias = data;

    // Affichage du media selectionné dans le modal
    displayMediaLightbox(data, position);

    // EventListener pour intéragir avec le modal
    document.addEventListener('keyup', listenerKey) // navigation clavier
    document.body.addEventListener('focus', accessibilityFocus, true) // focus blocked modal
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox)
    document.getElementById('lightbox-next').addEventListener('click', nextSlide)
    document.getElementById('lightbox-next').addEventListener('keyup', (e) => { if (e.key === "Enter") { nextSlide() } })
    document.getElementById('lightbox-previous').addEventListener('click', previousSlide)
    document.getElementById('lightbox-previous').addEventListener('keyup', (e) => { if (e.key === "Enter") { previousSlide() } })
}


// Fonction pour fermer la lightbox
function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.ariaHidden = "true";

    // Suppression des event listener à la fermeture du modal
    document.removeEventListener('keyup', listenerKey)
    document.body.removeEventListener('focus', accessibilityFocus, true)
    document.getElementById('lightbox-close').removeEventListener('click', closeLightbox)
    document.getElementById('lightbox-next').removeEventListener('click', nextSlide)
    document.getElementById('lightbox-next').removeEventListener('keyup', (e) => { if (e.key === "Enter") { nextSlide() } })
    document.getElementById('lightbox-previous').removeEventListener('click', previousSlide)
    document.getElementById('lightbox-previous').removeEventListener('keyup', (e) => { if (e.key === "Enter") { previousSlide() } })
}


// Fonction pour garder le focus dans le modal dialog de la lightbox
function accessibilityFocus(element) {
    let modalNodes = lightbox.getElementsByTagName('*')
    let isInclude = Array.from(modalNodes).filter((e) => e.isEqualNode(element.target))
    if (isInclude.length === 0)
        document.getElementById('lightbox-next').focus()
}


// Affichage d'une photo dans le modal lightbox
function displayMediaLightbox(medias, position) {
    console.log("medias : ", medias);
    let lightboxContent = document.getElementById('lightbox-content')
    lightboxContent.innerHTML = ""

    // Média selectionné (par position)
    let media = medias[position]

    if (media.image) {
        let img = document.createElement('img')
        img.tabIndex = 2
        img.classList.add('lightbox-img')
        img.setAttribute('data-current_position', position)
        img.setAttribute('src', `assets/images/${media.image}`);
        img.alt = media.image.replaceAll('_', " ").replaceAll('.jpg', "");

        let h2 = document.createElement('h2');
        h2.innerText = media.title;
        h2.classList.add('lightbox-title');

        lightboxContent.append(img)
        lightboxContent.append(h2)
    }
    else {
        let video = document.createElement('video')
        video.tabIndex = 2
        video.classList.add('lightbox-img');
        video.setAttribute('controls', true)
        video.setAttribute('data-current_position', position)
        video.setAttribute('src', `assets/images/${media.video}`);
        video.alt = media.video.replaceAll('_', " ").replaceAll('.mp4', "");
        video.play()

        let h2 = document.createElement('h2');
        h2.innerText = media.title;
        h2.classList.add('lightbox-title');

        lightboxContent.append(video)
        lightboxContent.append(h2)
    }

}

// ---------- Fonction pour génrer les écoiuteurs d'évènemment ----------
function listenerKey(e) {
    switch (e.key) {
        case 'ArrowRight':
            nextSlide();
            break;
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'Escape':
            closeLightbox();
            break;
    }
}

function nextSlide() {
    let current_position = Number(document.querySelector('.lightbox-img').dataset.current_position);
    if (current_position + 1 < medias.length) {
        displayMediaLightbox(medias, current_position + 1)
    }
    else {
        displayMediaLightbox(medias, 0)
    }
}

function previousSlide() {
    let current_position = Number(document.querySelector('.lightbox-img').dataset.current_position);
    if (current_position - 1 >= 0) {
        displayMediaLightbox(medias, current_position - 1)
    }
    else {
        displayMediaLightbox(medias, medias.length - 1)
    }
}
