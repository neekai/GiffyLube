import { useRef, useCallback } from 'react'
import galleryItemStyles from '../styles/components/GalleryItem.module.scss'
const GalleryItem = ({
  GIF,
  gifCount,
  index,
  loading,
  hasMore,
  offset,
  setOffset
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
  return gifCount === index + 1 ? (
    <figure ref={lastGIFElementRef}>
      <img
        src={GIF.images.downsized_medium.url}
        alt={GIF.title}
        className={galleryItemStyles.image}
      />
    </figure>
  ) : (
    <figure>
      <img
        src={GIF.images.downsized_medium.url}
        alt={GIF.title}
        className={galleryItemStyles.image}
      />
    </figure>
  )
}

export default GalleryItem
