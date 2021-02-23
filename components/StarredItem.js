import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imageStyles from '../styles/components/Image.module.scss'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const starredItem = ({ starredGIF, handleUnstar }) => {
  return (
    <div className={imageStyles['image-container']}>
      <img
        src={Object.values(starredGIF)[0]}
        alt={Object.keys(starredGIF)[0]}
      />
      <div className={imageStyles['image-details']}>
        <FontAwesomeIcon
          icon={faStar}
          className={imageStyles.star}
          onClick={() => {
            handleUnstar(Object.keys(starredGIF)[0])
          }}
        />
      </div>
    </div>
  )
}

export default starredItem
