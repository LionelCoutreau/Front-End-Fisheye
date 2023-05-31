function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // bloc carte
        const article = document.createElement( 'article' );
        // bloc lien
        const lien = document.createElement( 'a' );
        lien.className = 'link';
        lien.href = `photographer.html?id=${id}`;
        // image
        const img = document.createElement( 'img' );
        img.className = 'picture';
        img.setAttribute("src", picture)
        // titre
        const h2 = document.createElement( 'h2' );
        h2.className = 'name';
        h2.textContent = name;
        // résidence
        const residence = document.createElement('div');
        residence.className = 'residence';
        residence.textContent = `${city}, ${country}`;
        // tagline
        const tag = document.createElement('div');
        tag.className = 'tagline';
        tag.textContent = tagline;
        // prix
        const tarif = document.createElement('div');
        tarif.className = 'price';
        tarif.textContent = `${price}€/jour`;

        // lien cliquable sur l'image et le titre
        lien.appendChild(img);
        lien.appendChild(h2);
        //construction de la carte du photographe
        article.appendChild(lien);
        article.appendChild(residence);
        article.appendChild(tag);
        article.appendChild(tarif);
        return article;
    }
    return { name, picture, getUserCardDOM }
}