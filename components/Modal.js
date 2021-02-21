import modalStyles from '../styles/components/Modal.module.scss'

const Modal = ({
  displayModal,
  toggleModal,
  currentlySelectedGIF,
  setCurrentlySelectedGIF
}) => {
  console.log('display modal', displayModal, currentlySelectedGIF)

  const handleCloseModal = () => {
    setCurrentlySelectedGIF(null)
    toggleModal()
  }
  return (
    <div
      className={`${modalStyles.container} ${
        displayModal ? modalStyles.active : ''
      }`}
    >
      <div className={modalStyles.modal}>
        <span className={modalStyles.close} onClick={handleCloseModal}>
          X
        </span>
        <img
          src={currentlySelectedGIF.images.original.url}
          alt={currentlySelectedGIF.title}
        />
        <h2>{currentlySelectedGIF.title}</h2>
      </div>
    </div>
  )
}

export default Modal
