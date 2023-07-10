const lightbox = document.getElementById('lightbox-modal')

// Variable globales pour stocker mes medias
let medias = ''
let mediaPath = ''

// Fonction pour ouvrir la lightbox
const openLightbox = (data, path, position) => {
  lightbox.style.display = 'block'
  lightbox.ariaHidden = 'false'
  mediaPath = path

  // Ajout des medias dans la variable globale
  medias = data

  // Affichage du media selectionné dans le modal
  displayMediaLightbox(data, position)

  // EventListener pour intéragir avec le modal
  document.addEventListener('keyup', listenerKey) // navigation clavier
  document.body.addEventListener('focus', accessibilityFocus, true) // focus blocked modal
  document
    .getElementById('lightbox-close')
    .addEventListener('click', closeLightbox)
  document.getElementById('lightbox-next').addEventListener('click', nextSlide)
  document.getElementById('lightbox-next').addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      nextSlide()
    }
  })
  document
    .getElementById('lightbox-previous')
    .addEventListener('click', previousSlide)
  document.getElementById('lightbox-previous').addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      previousSlide()
    }
  })
}

// Fonction pour fermer la lightbox
const closeLightbox = () => {
  lightbox.style.display = 'none'
  lightbox.ariaHidden = 'true'

  // Suppression des event listener à la fermeture du modal
  document.removeEventListener('keyup', listenerKey)
  document.body.removeEventListener('focus', accessibilityFocus, true)
  document
    .getElementById('lightbox-close')
    .removeEventListener('click', closeLightbox)
  document
    .getElementById('lightbox-next')
    .removeEventListener('click', nextSlide)
  document.getElementById('lightbox-next').removeEventListener('keyup', e => {
    if (e.key === 'Enter') {
      nextSlide()
    }
  })
  document
    .getElementById('lightbox-previous')
    .removeEventListener('click', previousSlide)
  document
    .getElementById('lightbox-previous')
    .removeEventListener('keyup', e => {
      if (e.key === 'Enter') {
        previousSlide()
      }
    })
}

// Fonction pour garder le focus dans le modal dialog de la lightbox
const accessibilityFocus = (event) => {
  const modalNodes = lightbox.getElementsByTagName('*')
  const isInclude = Array.from(modalNodes).filter(e =>
    e.isEqualNode(event.target)
  )
  if (isInclude.length === 0) document.getElementById('lightbox-next').focus()
}

// Affichage d'une photo dans le modal lightbox
const displayMediaLightbox = (medias, position) => {
  const lightboxContent = document.getElementById('lightbox-content')
  lightboxContent.innerHTML = ''

  // Média selectionné (par position)
  const media = medias[position]

  if (media.image) {
    const img = document.createElement('img')
    img.tabIndex = 2
    img.classList.add('lightbox-img')
    img.setAttribute('data-current_position', position)
    img.setAttribute('src', `${mediaPath}/${media.image}`)
    img.setAttribute('alt', `${media.title}`)
    img.alt = media.image.replaceAll('_', ' ').replaceAll('.jpg', '')

    const h2 = document.createElement('h2')
    h2.innerText = media.title
    h2.classList.add('lightbox-title')

    lightboxContent.append(img)
    lightboxContent.append(h2)
  } else {
    const video = document.createElement('video')
    video.tabIndex = 2
    video.classList.add('lightbox-img')
    video.setAttribute('controls', true)
    video.setAttribute('data-current_position', position)
    video.setAttribute('src', `${mediaPath}/${media.video}`)
    video.setAttribute('alt', `${media.title}`)
    video.alt = media.video.replaceAll('_', ' ').replaceAll('.mp4', '')
    video.play()

    const h2 = document.createElement('h2')
    h2.innerText = media.title
    h2.classList.add('lightbox-title')

    lightboxContent.append(video)
    lightboxContent.append(h2)
  }
}

// Gestion du clavier pour les listener
const listenerKey = (e) => {
  switch (e.key) {
    case 'ArrowRight':
      nextSlide()
      break
    case 'ArrowLeft':
      previousSlide()
      break
    case 'Escape':
      closeLightbox()
      break
  }
}

// Média suivant
const nextSlide = () => {
  const currentPosition = Number(
    document.querySelector('.lightbox-img').dataset.current_position
  )
  if (currentPosition + 1 < medias.length) {
    displayMediaLightbox(medias, currentPosition + 1)
  } else {
    displayMediaLightbox(medias, 0)
  }
}

// Média précédent
const previousSlide = () => {
  const currentPosition = Number(
    document.querySelector('.lightbox-img').dataset.current_position
  )
  if (currentPosition - 1 >= 0) {
    displayMediaLightbox(medias, currentPosition - 1)
  } else {
    displayMediaLightbox(medias, medias.length - 1)
  }
}

export { openLightbox }
