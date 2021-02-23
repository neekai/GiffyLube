import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import AbortController from 'abort-controller'
import { DelayContext } from '../contexts/DelayContext'
import { FilterContext } from '../contexts/FilterContext'
import { SET_SEARCH_VALUE, SET_CATEGORY } from '../utils/actions'
import { getRandomGIF } from '../services/getGIFs'
import { isItemStarred, handleToggleStar } from '../utils/helpers'
import Search from './Search'
import NoResults from './NoResults'
import mainStyles from '../styles/components/Main.module.scss'
import imageStyles from '../styles/components/Image.module.scss'

const Main = () => {
  const {
    setFilter,
    filterState: { query }
  } = useContext(FilterContext)
  const {
    delayState: { delay }
  } = useContext(DelayContext)
  const [randomGIF, setRandomGIF] = useState(null)
  const [loading, setLoading] = useState(false)
  const [starred, setStarred] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const controller = new AbortController()
  const { signal } = controller

  const handleGetRandomGIF = async () => {
    setFilter({ type: SET_SEARCH_VALUE, payload: '' })
    setNoResults(false)
    setLoading(true)
    const GIF = await getRandomGIF(signal, delay)
    setRandomGIF(GIF)
    setLoading(false)
  }

  useEffect(() => {
    const fetchRandomGIF = async () => {
      setLoading(true)
      const GIF = await getRandomGIF(signal, delay)
      setRandomGIF(GIF)
      setLoading(false)
    }
    fetchRandomGIF()
  }, [])

  useEffect(() => {
    if (isItemStarred(randomGIF)) setStarred(true)
    setFilter({ type: SET_SEARCH_VALUE, payload: '' })
    setFilter({ type: SET_CATEGORY, payload: '' })
  }, [])

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div>
      {randomGIF && (
        <section className={mainStyles['container']}>
          <div className={mainStyles['header']}>
            <h1>#{query || 'random'}</h1>
            <p>A GIF a Day Keeps the Doctor Away </p>
          </div>
          <Search
            setLoading={setLoading}
            apiCall={getRandomGIF}
            setResponse={setRandomGIF}
            setNoResults={setNoResults}
            signal={signal}
          />
          {noResults ? (
            <NoResults />
          ) : (
            <div
              className={`${imageStyles['image-container']} ${
                imageStyles['random-image']
              }`}
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
          )}
          <button
            onClick={handleGetRandomGIF}
            disabled={loading}
            className={mainStyles.button}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
            ) : (
              "I'm feeling funky!"
            )}
          </button>
        </section>
      )}
      {loading && !randomGIF && (
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
      )}
    </div>
  )
}

export default Main
