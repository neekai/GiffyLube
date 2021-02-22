import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { addToFavorite, removeFromFavorite } from '../utils/helpers'
import modalStyles from '../styles/components/Modal.module.scss'
import imageStyles from '../styles/components/Image.module.scss'

const Modal = ({
  displayModal,
  toggleModal,
  currentlySelectedGIF,
  setCurrentlySelectedGIF
}) => {
  const [saved, setSaved] = useState(false)

  const handleCloseModal = () => {
    setCurrentlySelectedGIF(null)
    toggleModal()
  }

  const handleToggleStar = (slug, url) => {
    if (saved) {
      setSaved(false)
      removeFromFavorite(slug)
    } else {
      setSaved(true)
      addToFavorite(slug, url)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem(currentlySelectedGIF.slug)) setSaved(true)
  }, [])

  return (
    <div
      className={`${modalStyles.container} ${
        displayModal ? modalStyles.active : ''
      }`}
    >
      <div className={`${modalStyles.modal}`}>
        <span className={modalStyles.close} onClick={handleCloseModal}>
          X
        </span>
        <div className={imageStyles['image-container']}>
          <img
            src={currentlySelectedGIF.images.original.url}
            alt={currentlySelectedGIF.title}
          />
          <div className={imageStyles['image-details']}>
            <FontAwesomeIcon
              icon={saved ? fasStar : farStar}
              className={imageStyles.star}
              onClick={() => {
                handleToggleStar(
                  currentlySelectedGIF.slug,
                  currentlySelectedGIF.images.original.url
                )
              }}
            />
            <h2>{currentlySelectedGIF.title}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
