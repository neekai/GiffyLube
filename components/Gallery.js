import { useState, useEffect, useContext } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FilterContext } from '../contexts/FilterContext'
import { DelayContext } from '../contexts/DelayContext'
import useFilterSearch from '../utils/useFilterSearch.js'
import Modal from './Modal'
import GalleryItem from './GalleryItem'
import galleryStyles from '../styles/components/Gallery.module.scss'

const Gallery = () => {
  const [offset, setOffset] = useState(0)
  const [displayModal, setDisplayModal] = useState(false)
  const [currentlySelectedGIF, setCurrentlySelectedGIF] = useState(null)

  const {
    filterState: { category }
  } = useContext(FilterContext)
  const {
    delayState: { delay }
  } = useContext(DelayContext)
  const { GIFs, hasMore, loading, error } = useFilterSearch(
    category,
    offset,
    delay
  )
  console.log('loading', loading)
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
              offset={offset}
              setOffset={setOffset}
              toggleModal={toggleModal}
              setCurrentlySelectedGIF={setCurrentlySelectedGIF}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div>
        {loading && (
          <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
        )}
      </div>
      <div>{error && <h1>Error</h1>}</div>
    </>
  )
}

export default Gallery
