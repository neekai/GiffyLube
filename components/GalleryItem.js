import { useState, useEffect, useRef, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { addToFavorite, removeFromFavorite } from '../utils/helpers'
import galleryItemStyles from '../styles/components/GalleryItem.module.scss'
import imageStyles from '../styles/components/Image.module.scss'

const GalleryItem = ({
  GIF,
  gifCount,
  index,
  loading,
  hasMore,
  offset,
  setOffset,
  toggleModal,
  setCurrentlySelectedGIF
}) => {
  const [saved, setSaved] = useState(false)
  const observer = useRef()
  const lastGIFElementRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('last')
          setOffset(offset + 20)
        }
      })
      if (node) observer.current.observe(node)
      console.log('node', node)
    },
    [loading, hasMore]
  )

  const handleClickGIF = GIF => {
    setCurrentlySelectedGIF(GIF)
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

  const renderImage = () => {
    return (
      <>
        <img
          src={GIF.images.downsized_medium.url}
          alt={GIF.title}
          className={galleryItemStyles.image}
        />
        <div className={imageStyles['image-details']}>
          <FontAwesomeIcon icon={faStar} className={imageStyles.star} fill />
          <h2>{GIF.title}</h2>
        </div>
      </>
    )
  }

  // useEffect(() => {
  //   if (sessionStorage.getItem(slug)) setSaved(true)
  // }, [])

  return gifCount === index + 1 ? (
    <div
      className={imageStyles['image-container']}
      onClick={() => handleClickGIF(GIF)}
      ref={lastGIFElementRef}
    >
      {renderImage()}
    </div>
  ) : (
    <div
      className={imageStyles['image-container']}
      onClick={() => handleClickGIF(GIF)}
    >
      {renderImage()}
    </div>
  )
}

export default GalleryItem
