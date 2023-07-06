// Importation des factories
import photographerFactory from "../factories/photographer.js"

// Récupération des informations des photographes
async function getPhotographers() {
    const response = await fetch('../../data/photographers.json');
    const json = await response.json();
    console.log("Success:", json.photographers);
    return json.photographers;
}

// Affichage des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer, index) => {
        const tabIndexPhotographerNumber = 2 + index;
        const photographerModel = photographerFactory(photographer, tabIndexPhotographerNumber);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// Initialisation de la page
async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    console.log("photographers : " + photographers);
    displayData(photographers);
};

init();