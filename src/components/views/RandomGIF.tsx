import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { isItemStarred, handleToggleStar } from '@/utils/helpers'
import imageStyles from '@/styles/Image.module.scss'

interface ImageURL {
  url: string
}

interface GIF {
  slug: string
  title: string
  images: {
    [key: string]: ImageURL
  }
}

interface PageProps {
  randomGIF: GIF
}

const RandomGIF = ({ randomGIF }: PageProps) => {
  const [starred, setStarred] = useState<boolean>(false)

  useEffect(() => {
    if (isItemStarred(randomGIF)) setStarred(true)
  }, [])

  return (
    <div
      className={`${imageStyles['image-container']} ${imageStyles['random-image']}`}
    >
      <img src={randomGIF.images.original.url} alt={randomGIF.title} />
      <div className={imageStyles['image-details']}>
        <FontAwesomeIcon
          icon={starred ? fasStar : farStar}
          className={imageStyles.star}
          onClick={() => {
            handleToggleStar(
              randomGIF.slug,
              randomGIF.images.original.url,
              starred,
              setStarred
            )
          }}
        />
        <h2>{randomGIF.title}</h2>
      </div>
    </div>
  )
}

export default RandomGIF
