function photographerFactory(data) {
    const { city, country, name, portrait, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // bloc carte
        const article = document.createElement( 'article' );
        // image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        // titre
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const residence = document.createElement('div');
        residence.className = 'residence';
        residence.textContent = `${city}, ${country}`;
        const tag = document.createElement('div');
        tag.className = 'tagline';
        tag.textContent = tagline;
        const tarif = document.createElement('div');
        tarif.className = 'price';
        tarif.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(residence);
        article.appendChild(tag);
        article.appendChild(tarif);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}