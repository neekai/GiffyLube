import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import AbortController from 'abort-controller'
import { DelayContext } from '../contexts/DelayContext'
import { FilterContext } from '../contexts/FilterContext'
import { getRandomGIF } from '../services/getGIFs'
import { SET_SEARCH_VALUE, SET_CATEGORY } from '@/utils/actions'
import Search from './Search'
import RandomGIF from './RandomGIF'
import Loading from './Loading'
import NoResults from './NoResults'
import mainStyles from '@/styles/Main.module.scss'

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
          {noResults ? <NoResults /> : <RandomGIF randomGIF={randomGIF} />}
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
      {loading && !randomGIF && <Loading />}
    </div>
  )
}

export default Main
