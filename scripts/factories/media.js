function mediaFactory(data, countData = 0) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    // Obtention du répertoire des médias du photographe
    async function getMediaFolder()
    {
        const response = await fetch('../../data/photographers.json');
        const json = await response.json();
        const photographer = json.photographers.filter(photographer => photographer.id === photographerId);
        const completeName = photographer[0].name.split(' ');
        const mediaPath = `assets/images/${completeName[0]}`;
        return mediaPath;
    }

    // Construction de la carte du média
    async function getMediaCardDOM() {
        const mediaFolder = await getMediaFolder();
        // bloc carte
        const article = document.createElement( 'article' );
        article.setAttribute("id", `media_${id}`);
        // vignette
        const vignette = document.createElement( 'img' );
        vignette.className = 'media-vignette';
        if(video) {
            const videoNameAndExtension = video.split('.');
            vignette.setAttribute("src", `${mediaFolder}/${videoNameAndExtension[0]}.jpg`);
        }
        else {
            vignette.setAttribute("src", `${mediaFolder}/${image}`);
        }
        vignette.setAttribute('data-media_position', countData)
        vignette.addEventListener('click', (e) => {
            var position = e.target.dataset.media_position;
            openLightbox(data, position);
        })
        // bloc nom
        const nameBloc = document.createElement( 'div' );
        nameBloc.className = 'media-name';
        // title
        const h3 = document.createElement( 'h2' );
        h3.className = 'media-title';
        h3.textContent = title;
        // bloc likes
        const likesBloc = document.createElement('div');
        likesBloc.className = 'media-likes';
        // nombre likes
        const likesNumber = document.createElement('div');
        likesNumber.className = 'media-likes-number';
        likesNumber.textContent = likes;
        // icone likes
        const likesIcon = document.createElement('img');
        likesIcon.className = 'media-likes-icon';
        likesIcon.setAttribute("src", 'assets/icons/heart.svg');
        likesIcon.setAttribute("alt", 'likes');
        likesIcon.setAttribute("onclick", `incrementLike(${id})`)

        // Mise en forme du bloc likes
        likesBloc.appendChild(likesNumber);
        likesBloc.appendChild(likesIcon);
        // Mise en forme du bloc nom
        nameBloc.appendChild(h3);
        nameBloc.appendChild(likesBloc);
        // Mise en forme du bloc media
        article.appendChild(vignette);
        article.appendChild(nameBloc);

        return article;
    }

    return { getMediaFolder, getMediaCardDOM }
}