import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import AbortController from 'abort-controller'
import { useDelayContext } from '@/contexts/DelayContext'
import { useFilterContext } from '@/contexts/FilterContext'
import { getRandomGIF } from '@/services/getGIFs'
import { SET_SEARCH_VALUE, SET_CATEGORY } from '@/utils/actions'
import Search from '../common/Search'
import RandomGIF from './RandomGIF'
import Loading from '../common/Loading'
import NoResults from '../common/NoResults'
import mainStyles from '@/styles/Main.module.scss'

const Main = () => {
  const {
    setFilter,
    filterState: { query }
  } = useFilterContext()
  const {
    delayState: { delay }
  } = useDelayContext()

  const [randomGIF, setRandomGIF] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [noResults, setNoResults] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const controller = new AbortController()
  const { signal } = controller

  const handleClick = async () => {
    setSearchValue('')
    setLoading(true)
    setNoResults(false)
    setFilter({ type: SET_SEARCH_VALUE, payload: '' })
    const GIF = await getRandomGIF(signal, delay)
    setRandomGIF(GIF)
    setLoading(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = searchValue.trim()
    if (!value) return
    setLoading(true)
    const GIF = await getRandomGIF(signal, delay, value)
    if (Array.isArray(GIF) && GIF.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
      setRandomGIF(GIF)
    }
    setFilter({ type: SET_SEARCH_VALUE, payload: searchValue })
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
  }, [delay])

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
      {randomGIF ? (
        <section className={mainStyles['container']}>
          <div className={mainStyles['header']}>
            <h1>#{query || 'random'}</h1>
            <p>A GIF a Day Keeps the Doctor Away </p>
          </div>
          <Search
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
          {noResults ? (
            <NoResults query={query} />
          ) : (
            <RandomGIF randomGIF={randomGIF} />
          )}
          <button
            onClick={handleClick}
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
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Main
