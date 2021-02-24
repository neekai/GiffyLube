import { useState, useEffect, useContext } from 'react'
import AbortController from 'abort-controller'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { DelayContext } from '@/contexts/DelayContext'
import { FilterContext } from '@/contexts/FilterContext'
import { SET_SEARCH_VALUE } from '@/utils/actions'
import searchStyles from '@/styles/Search.module.scss'

interface PageProps {
  setLoading: (boolean) => void
  setResponse: (GIF: object) => void
  setNoResults: (boolean) => void
  apiCall: (
    signal: object,
    delay: number,
    searchValue: string
  ) => Promise<object>
}

const Search = ({
  setLoading,
  apiCall,
  setResponse,
  setNoResults
}: PageProps) => {
  const { setFilter } = useContext(FilterContext)
  const {
    delayState: { delay }
  } = useContext(DelayContext)

  const [searchValue, setSearchValue] = useState('')
  const controller = new AbortController()
  const { signal } = controller

  const handleSearchChange = e => {
    const value = e.target.value.trim()
    setSearchValue(value)
  }

  const handleSearchSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setFilter({ type: SET_SEARCH_VALUE, payload: searchValue })
    const GIF = await apiCall(signal, delay, searchValue)
    if (Array.isArray(GIF) && GIF.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
      setResponse(GIF)
    }
    setLoading(false)
  }

  useEffect(() => {
    return () => controller.abort()
  }, [])

  return (
    <form className={searchStyles.search} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search for a random GIF by Tag!"
        value={searchValue}
        onChange={handleSearchChange}
        required
      />
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  )
}

export default Search