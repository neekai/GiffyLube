import { useRef, useCallback } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import galleryItemStyles from '@/styles/GalleryItem.module.scss'
import imageStyles from '@/styles/Image.module.scss'

interface Image {
  url: string
  height: number
  width: number
}

interface GIF {
  title: string
  slug: string
  images: {
    [key: string]: Image
  }
}

interface PageProps {
  GIF: GIF
  gifCount: number
  index: number
  loading: boolean
  hasMore: boolean
  setOffset: (setState: (offset: number) => number) => void
  toggleModal: () => void
  setCurrentlySelectedGIF: (GIF: object) => void
}

const GalleryItem = ({
  GIF,
  gifCount,
  index,
  loading,
  hasMore,
  setOffset,
  toggleModal,
  setCurrentlySelectedGIF
}: PageProps) => {
  const observer = useRef()
  const lastGIFElementRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset: number) => prevOffset + 20)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const handleClickGIF = (GIF: object) => {
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
