import { useContext } from 'react'
import { FilterContext } from '../contexts/FilterContext'
import noResultsStyles from '../styles/components/NoResults.module.scss'

const NoResults = () => {
  const {
    filterState: { query }
  } = useContext(FilterContext)
  return (
    <div className={noResultsStyles.container}>
      <h2>No GIFs found for {query}</h2>
    </div>
  )
}

export default NoResults
