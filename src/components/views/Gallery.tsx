import { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useFilterContext } from '@/contexts/FilterContext'
import { useDelayContext } from '@/contexts/DelayContext'
import useFilterSearch from '@/utils/useFilterSearch'
import Modal from '../common/Modal'
import GalleryItem from './GalleryItem'
import ErrorPage from '../common/ErrorPage'
import galleryStyles from '@/styles/Gallery.module.scss'

const Gallery = () => {
  const [offset, setOffset] = useState<number>(0)
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [currentlySelectedGIF, setCurrentlySelectedGIF] = useState<
    object | null
  >(null)

  const {
    filterState: { category }
  } = useFilterContext()
  const {
    delayState: { delay }
  } = useDelayContext()
  const { GIFs, hasMore, loading, error } = useFilterSearch(
    category,
    offset,
    delay
  )

  const toggleModal = () => setDisplayModal(!displayModal)

  useEffect(() => {
    displayModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [displayModal])

  return (
    <>
      <div className={galleryStyles.header}>
        <h1>{category} GIFs</h1>
        <p>Find the Latest GIFs!</p>
      </div>
      {currentlySelectedGIF && (
        <Modal
          displayModal={displayModal}
          toggleModal={toggleModal}
          currentlySelectedGIF={currentlySelectedGIF}
          setCurrentlySelectedGIF={setCurrentlySelectedGIF}
        />
      )}
      {GIFs.length && (
        <ResponsiveMasonry>
          <Masonry>
            {GIFs.map((GIF, i) => (
              <GalleryItem
                GIF={GIF}
                key={i}
                gifCount={GIFs.length}
                index={i}
                loading={loading}
                hasMore={hasMore}
                setOffset={setOffset}
                toggleModal={toggleModal}
                setCurrentlySelectedGIF={setCurrentlySelectedGIF}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <div className="loading">
        {loading && (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="loading-icon"
            size="2x"
          />
        )}
      </div>
      {error && <ErrorPage />}
    </>
  )
}

export default Gallery
