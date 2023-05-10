function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    //const picture = `assets/photographers/${portrait}`;

    function getMediaCardDOM() {
        // bloc carte
        const article = document.createElement( 'article' );
        // // image
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // // titre
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // // résidence
        // const residence = document.createElement('div');
        // residence.className = 'residence';
        // residence.textContent = `${city}, ${country}`;
        // // tagline
        // const tag = document.createElement('div');
        // tag.className = 'tagline';
        // tag.textContent = tagline;
        // // prix
        // const tarif = document.createElement('div');
        // tarif.className = 'price';
        // tarif.textContent = `${price}€/jour`;

        // article.appendChild(img);
        // article.appendChild(h2);
        // article.appendChild(residence);
        // article.appendChild(tag);
        // article.appendChild(tarif);
        return (article);
    }
    return { /*name, picture,*/ getMediaCardDOM }
}