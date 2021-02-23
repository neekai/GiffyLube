import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { DelayContext } from '../contexts/DelayContext'
import { FilterContext } from '../contexts/FilterContext'
import { SET_SEARCH_VALUE } from '../utils/actions'
import searchStyles from '../styles/components/Search.module.scss'

const Search = ({ setLoading, apiCall, setResponse, setNoResults }) => {
  const {
    filterState: { query },
    setFilter
  } = useContext(FilterContext)
  const {
    delayState: { delay }
  } = useContext(DelayContext)

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = e => {
    const value = e.target.value.trim()
    setSearchValue(value)
  }

  // const handleSearchValue = e => {
  //   const value = e.target.value.trim()
  //   setFilter({ type: SET_SEARCH_VALUE, payload: value })
  // }

  const handleSearchSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setFilter({ type: SET_SEARCH_VALUE, payload: searchValue })
    const GIF = await apiCall(delay, searchValue)
    if (Array.isArray(GIF) && GIF.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
      setResponse(GIF)
    }
    setLoading(false)
  }

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
