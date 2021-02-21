import { useState, useEffect, useContext } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { FilterContext } from '../contexts/FilterContext'
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
  const { GIFs, hasMore, loading, error } = useFilterSearch(category, offset)

  const toggleModal = () => setDisplayModal(!displayModal)

  useEffect(() => {
    displayModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [displayModal])
  return (
    <>
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
      <div>{loading && 'Loading'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

export default Gallery
