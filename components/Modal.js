import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import {
  faStar as farStar,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons'
import { isItemStarred, handleToggleStar } from '../utils/helpers'
import modalStyles from '../styles/components/Modal.module.scss'
import imageStyles from '../styles/components/Image.module.scss'

const Modal = ({
  displayModal,
  toggleModal,
  currentlySelectedGIF,
  setCurrentlySelectedGIF
}) => {
  const [starred, setStarred] = useState(false)

  const handleCloseModal = () => {
    setCurrentlySelectedGIF(null)
    toggleModal()
  }

  useEffect(() => {
    if (isItemStarred(currentlySelectedGIF.slug)) setStarred(true)
  }, [])

  return (
    <div
      className={`${modalStyles.container} ${
        displayModal ? modalStyles.active : ''
      }`}
    >
      <div className={`${modalStyles.modal}`}>
        <span className={modalStyles.close} onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
        <div className={imageStyles['image-container']}>
          <img
            src={currentlySelectedGIF.images.original.url}
            alt={currentlySelectedGIF.title}
          />
          <div className={imageStyles['image-details']}>
            <FontAwesomeIcon
              icon={starred ? fasStar : farStar}
              className={imageStyles.star}
              onClick={() => {
                handleToggleStar(
                  currentlySelectedGIF.slug,
                  currentlySelectedGIF.images.original.url,
                  starred,
                  setStarred
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
