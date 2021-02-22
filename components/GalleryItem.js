import { useRef, useCallback } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
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

  const renderImage = () => {
    return (
      <>
        <LazyLoadImage
          effect="blur"
          src={GIF.images.original.url}
          alt={GIF.title}
          wrapperClassName={galleryItemStyles.image}
          height={GIF.images.original.height}
          width={GIF.images.original.width}
        />
        <div className={imageStyles['image-details']}>
          <h2>{GIF.title}</h2>
        </div>
      </>
    )
  }

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
