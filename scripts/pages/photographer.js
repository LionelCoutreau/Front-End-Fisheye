//Mettre le code JavaScript lié à la page photographer.html
const urlParams = new URL(window.location.toLocaleString()).searchParams;
const photographerId = Number(urlParams.get('id'));

async function getMedias() {
    const response = await fetch('../../data/photographers.json');
    const json = await response.json();
    const medias = json.media.filter(photo => photo.photographerId === photographerId);
    return medias;
}

async function getPhotographer() {
    const response = await fetch('../../data/photographers.json');
    const json = await response.json();
    const photographer = json.photographers.filter(photographer => photographer.id === photographerId);
    return photographer;
}

async function displayData(medias) {
    const mediasSection = document.querySelector(".medias_section");
    let totalLikes = 0;
    medias.forEach(async (media) => {
        totalLikes += media.likes;
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = await mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
    document.querySelector(".total-likes-number").innerText = totalLikes;
};

function updateTotalLikes() {
    let totalLikes = 0;
    console.log("totalLikes begin:", totalLikes);
    document.querySelectorAll(".media-likes-number").forEach((number) => {
        totalLikes += Number(number);
        console.log("totalLikes:", totalLikes);
    });
    document.querySelector(".total-likes-number").innerText = totalLikes;
}

async function init() {
    // récupère les infos du photographe via l'ID contenue dans l'URL
    const photographerData = await getPhotographer(photographerId);

    const photographerName = photographerData[0].name;
    const photographerCity = photographerData[0].city;
    const photographerCountry = photographerData[0].country;
    const photographerTagline = photographerData[0].tagline;
    const photographerPortrait = `assets/photographers/${photographerData[0].portrait}`;
    const photographerPrice = photographerData[0].price;
    
    // Affiche les infos du photographe
    document.querySelector(".photograph-name").innerText = photographerName;
    document.querySelector(".photograph-country").innerText = `${photographerCity}, ${photographerCountry}`;
    document.querySelector(".photograph-tagline").innerText = photographerTagline;
    document.querySelector(".photograph-img").src = photographerPortrait;
    document.querySelector(".photograph-img").alt = photographerName;
    document.querySelector(".total-price").innerText = `${photographerPrice}€ / jour`;
    
    // Récupère les datas des médias d'un photographe
    const mediasData = await getMedias();
    displayData(mediasData);
};

init();
