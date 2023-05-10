//Mettre le code JavaScript lié à la page photographer.html
async function getMedias(idPhotographer) {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    const response = await fetch('../../data/photographers.json');
    const json = await response.json();
    const medias = json.media.filter(photo => photo.photographerId === idPhotographer);
    console.log("Success:", medias);
    return medias;
}

async function displayData(medias) {
    const mediasSection = document.querySelector(".medias_section");

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
};

async function init() {
    // Récupère les datas des médias d'un photographe
    const medias = await getMedias();
    console.log("medias : " + medias);
    displayData(medias);
};

init();

