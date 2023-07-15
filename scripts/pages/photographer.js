// importation des utilitaires
import {
  openModal,
  closeModal,
  submit,
  eventListenerCheckMinLength,
  eventListenerValidateEmail,
  eventListenerEscape
} from '../utils/contactForm.js'
import { openLightbox } from '../utils/lightbox.js'

// Importation des factories
import mediaFactory from '../factories/media.js'

// Variables globales
const urlParams = new URL(window.location.toLocaleString()).searchParams
const photographerId = Number(urlParams.get('id'))
const mediaSelectedMenu = document.querySelector('.media_select_menu')
const mediaSelectMenuOptions = document.querySelectorAll(
  '.media_select_menu_option'
)
let dataMediasPhotographer

// Récupération des médias du photographe
const getMedias = async () => {
  const response = await fetch('../../data/photographers.json')
  const json = await response.json()
  const medias = json.media.filter(
    photo => photo.photographerId === photographerId
  )
  return medias
}

// Récupération des informations du photographe
const getPhotographer = async () => {
  const response = await fetch('../../data/photographers.json')
  const json = await response.json()
  const photographer = json.photographers.filter(
    photographer => photographer.id === photographerId
  )
  return photographer
}

// Affichage des médias
const displayData = async medias => {
  // récupère les infos du photographe via l'ID contenue dans l'URL
  const photographerData = await getPhotographer(photographerId)
  const completeName = photographerData[0].name.split(' ')
  const mediaPath = `assets/images/${completeName[0]}`

  // Affichage des vignettes de media
  const mediasSection = document.querySelector('.medias_section')
  mediasSection.innerHTML = ''
  medias.forEach(async (media, index) => {
    const tabIndexMediaNumber = 10 + index * 2
    const mediaModel = mediaFactory(media, tabIndexMediaNumber)
    const mediaCardDOM = await mediaModel.getMediaCardDOM()
    mediasSection.appendChild(mediaCardDOM)
    mediaCardDOM
      .querySelector('.media-likes-icon')
      .addEventListener('click', e => {
        const likesId = e.target.id
        incrementLike(likesId)
      })
    mediaCardDOM
      .querySelector('.media-likes-icon')
      .addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          const likesId = e.target.id
          incrementLike(likesId)
        }
      })

    // Ecoute du clic sur une des options de tri
    const mediaVignette = mediaCardDOM.querySelector('.media-vignette')
    mediaVignette.addEventListener('click', () => {
      openLightbox(medias, mediaPath, index)
    })
    mediaVignette.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        openLightbox(medias, mediaPath, index)
      }
    })
  })
}

// Incrémentation des likes d'un média
const incrementLike = likesId => {
  const tabTmpLikesId = likesId.split('_')
  const idMedia = Number(tabTmpLikesId[1])
  const likesNumberDiv = document
    .querySelector(`#media_${idMedia}`)
    .querySelector('.media-likes-number')
  dataMediasPhotographer.forEach(media => {
    if (media.id === idMedia) {
      media.likes++
      likesNumberDiv.innerText = media.likes
    }
  })
  updateTotalLikes()
}

// Incrémentation des likes totaux
const updateTotalLikes = () => {
  let totalLikes = 0
  dataMediasPhotographer.forEach(media => {
    totalLikes += media.likes
  })
  document.querySelector('.total-likes-number').innerText = totalLikes
}

// Tri des médias
const mediasSortBy = (medias, sortBy) => {
  if (sortBy === 'date') {
    medias.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  } else if (sortBy === 'title') {
    medias.sort((a, b) => {
      a = a.title.toLowerCase()
      b = b.title.toLowerCase()

      return a < b ? -1 : a > b ? 1 : 0
    })
  } else if (sortBy === 'popularity') {
    medias.sort((a, b) => {
      return b.likes - a.likes
    })
  }
}

// Fonction d'appel du tri des médias
const sortMedias = async (option, label) => {
  mediasSortBy(dataMediasPhotographer, option)
  document.querySelector('.media_selected').innerText = label
  await displayData(dataMediasPhotographer)
  toggleFilter(true)
  console.log('Objet dataMediasPhotographer')
  dataMediasPhotographer.forEach(element => {
    console.log(element.title, ' | ', element.likes, ' | ', element.date)
  })
}

// Affichage des options de tri
const toggleFilter = (forceHide = false) => {
  if (mediaSelectedMenu.style.visibility === 'visible' || forceHide === true) {
    mediaSelectedMenu.style.visibility = 'hidden'
    document.body.removeEventListener('focus', accessSortingOptionsFocus, true) // focus blocked options
  } else {
    mediaSelectedMenu.style.visibility = 'visible'
    mediaSelectMenuOptions[0].focus()
    document.body.addEventListener('focus', accessSortingOptionsFocus, true) // focus blocked options
  }
}

// Garder le focus dans les options de tri
const accessSortingOptionsFocus = event => {
  const isInclude = Array.from(mediaSelectMenuOptions).filter(e =>
    e.isEqualNode(event.target)
  )
  if (isInclude.length === 0) {
    mediaSelectMenuOptions[0].focus()
  }
}

// Gestion des listeners du modal form
const formListener = photographer => {
  // Ouvrir le formulaire (bouton contact)
  document
    .getElementById('contact-open')
    .addEventListener('click', () => openModal())

  // Fermer le formulaire (clic croix sur le modal)
  document
    .getElementById('contact-close')
    .addEventListener('click', () => closeModal())

  // Fermer le formulaire (entrer croix sur le modal)
  document.getElementById('contact-close').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      closeModal()
    }
  })

  // Listener des vérifications de champs
  eventListenerCheckMinLength(
    'contact-firstName',
    1,
    'error-firstName',
    'Veuillez renseignez le champs'
  )
  eventListenerCheckMinLength(
    'contact-lastName',
    1,
    'error-lastName',
    'Veuillez renseignez le champs'
  )
  eventListenerValidateEmail(
    'contact-email',
    'error-email',
    "Le format de l'email n'est pas correct."
  )
  eventListenerCheckMinLength(
    'contact-message',
    10,
    'error-message',
    'Veuillez renseigner un message de plus de 10 caractères'
  )
  eventListenerEscape()

  // Soumission du formulaire
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault()

    if (submit(e) === true) {
      console.log('Formulaire envoyé')
    } else {
      console.log('Erreur dans le formulaire')
    }
  })
}

// Gestion des listeners des filtres de médias
const filterListener = () => {
  const mediaSelected = document.querySelector('.media_selected')
  const mediaSelectBloc = document.querySelector('.media_select_bloc')
  const mediaSelectMenuOption = document.querySelectorAll(
    '.media_select_menu_option'
  )

  // Ecoute du clic sur le bouton Trier par
  mediaSelected.addEventListener('click', () => toggleFilter())
  mediaSelected.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      toggleFilter()
    }
  })

  // Ecoute du clic sur le bouton Trier par
  document.addEventListener('click', e => {
    const mediaSelectBlocDomClasses = mediaSelectBloc.querySelectorAll('*')
    let count = false
    mediaSelectBlocDomClasses.forEach(element => {
      if (element.className === e.target.className) {
        count = true
      }
    })
    if (count === false) {
      toggleFilter(true)
    }
  })

  // Fermer les options de tri (touche Escape)
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      toggleFilter(true)
    }
  })

  // Ecoute du clic sur une des options de tri
  mediaSelectMenuOption.forEach(element => {
    let mediaFilterType = ''
    switch (element.innerHTML) {
      case 'Date':
        mediaFilterType = 'date'
        break
      case 'Popularité':
        mediaFilterType = 'popularity'
        break
      case 'Titre':
        mediaFilterType = 'title'
        break
    }
    element.addEventListener('click', () => {
      sortMedias(mediaFilterType, element.innerHTML)
    })
    element.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        sortMedias(mediaFilterType, element.innerHTML)
      }
    })
  })
}

// Initialisation de la page
const init = async () => {
  // récupère les infos du photographe via l'ID contenue dans l'URL
  const photographerData = await getPhotographer(photographerId)

  const photographerName = photographerData[0].name
  const photographerCity = photographerData[0].city
  const photographerCountry = photographerData[0].country
  const photographerTagline = photographerData[0].tagline
  const photographerPortrait = `assets/photographers/${photographerData[0].portrait}`
  const photographerPrice = photographerData[0].price

  // Affiche les infos du photographe
  document.querySelector('.photograph-name').innerText = photographerName
  document.querySelector(
    '.photograph-country'
  ).innerText = `${photographerCity}, ${photographerCountry}`
  document.querySelector('.photograph-tagline').innerText = photographerTagline
  document.querySelector('.photograph-img').src = photographerPortrait
  document.querySelector('.photograph-img').alt = photographerName
  document.querySelector(
    '.total-price'
  ).innerText = `${photographerPrice}€ / jour`

  // Récupère les datas des médias d'un photographe
  const mediasData = await getMedias()
  dataMediasPhotographer = mediasData
  await sortMedias('popularity', 'Popularité')
  updateTotalLikes()

  // Ajout du listener du modal form
  formListener(photographerData)

  // Ajout du listener des filtres
  filterListener()

  // Ajout du nom du photographe au titre du modal form
  const title = document.getElementById('title-form')
  title.innerHTML += '\n' + photographerData[0].name
}

init()
