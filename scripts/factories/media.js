function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    async function getMediaFolder()
    {
        const response = await fetch('../../data/photographers.json');
        const json = await response.json();
        const photographer = json.photographers.filter(photographer => photographer.id === photographerId);
        const completeName = photographer[0].name.split(' ');
        const mediaPath = `assets/images/${completeName[0]}`;
        return mediaPath;
    }

    async function getMediaCardDOM() {
        const mediaFolder = await getMediaFolder();
        // bloc carte
        const article = document.createElement( 'article' );
        // vignette
        const vignette = document.createElement( 'img' );
        if(video) {
            const videoNameAndExtension = video.split('.');
            vignette.setAttribute("src", `${mediaFolder}/${videoNameAndExtension[0]}.jpg`);
        }
        else {
            vignette.setAttribute("src", `${mediaFolder}/${image}`);
        }
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
        likesIcon.setAttribute("src", `assets/icons/heart.svg`);

        // Mise en forme du bloc likes
        likesBloc.appendChild(likesNumber);
        likesBloc.appendChild(likesIcon);
        // Mise en forme du bloc nom
        nameBloc.appendChild(h3);
        nameBloc.appendChild(likesBloc);
        // Mise en forme du bloc media
        article.appendChild(vignette);
        article.appendChild(nameBloc);

        return (article);
    }



    return { getMediaFolder, getMediaCardDOM }
}