    async function getPhotographers() {
        const response = await fetch('../../data/photographers.json');
        const json = await response.json();
        console.log("Success:", json.photographers);
        return json.photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        console.log("photographers : " + photographers);
        displayData(photographers);
    };
    
    init();
    
