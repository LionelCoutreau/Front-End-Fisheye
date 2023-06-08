//Mettre le code JavaScript lié à la page photographer.html
const urlParams = new URL(window.location.toLocaleString()).searchParams;
const photographerId = Number(urlParams.get('id'));
let dataMediasPhotographer;

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
    mediasSection.innerHTML = "";
    //let totalLikes = 0;
    medias.forEach(async (media) => {
        //totalLikes += media.likes;
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = await mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
    //document.querySelector(".total-likes-number").innerText = totalLikes;
};

function incrementLike(idMedia) {
    const likesNumberDiv = document.querySelector(`#media_${idMedia}`).querySelector(".media-likes-number");
    console.log("like numbers : ", likesNumberDiv.innerText);
    dataMediasPhotographer.forEach(media => {
        if(media.id === idMedia)
        {
            media.likes++;
            likesNumberDiv.innerText = media.likes;
        }
    });
    updateTotalLikes();
}

function updateTotalLikes() {
    let totalLikes = 0;
    dataMediasPhotographer.forEach(media => {
        totalLikes += media.likes;
    });
    document.querySelector(".total-likes-number").innerText = totalLikes;
}

function mediasSortBy(medias, sortBy) {
    if(sortBy === "date") {
        medias.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
    }
    else if(sortBy === "title") {
        medias.sort((a, b) => {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
        })
    }
    else if(sortBy === "popularity") {
        medias.sort((a, b) => {
            return b.likes - a.likes;
        })
    }
}

async function sortMedias(option, label) {
    console.log("Option : " + option);
    console.log("Label : " + label);
    mediasSortBy(dataMediasPhotographer, option)
    console.log(dataMediasPhotographer);
    document.querySelector(".media_selected").innerText = label;
    await displayData(dataMediasPhotographer);
    toggleFilter(true);
}

function toggleFilter(forceHide = false) {
    const mediaSelectedMenu = document.querySelector(".media_select_menu");
    if(mediaSelectedMenu.style.visibility === "visible" || forceHide === true) {
        mediaSelectedMenu.style.visibility = "hidden";
    }
    else {
        mediaSelectedMenu.style.visibility = "visible";
    }
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
    dataMediasPhotographer = mediasData;
    await sortMedias('popularity', 'Popularité') 
    updateTotalLikes();
};

init();
