import { useContext } from 'react'
import { FilterContext } from '../contexts/FilterContext'
import headerStyles from '../styles/components/Header.module.scss'

const Header = () => {
  const {
    filterState: { category, query }
  } = useContext(FilterContext)
  return (
    <div className={headerStyles.container}>
      <h1 className={headerStyles.title}>
        {`#${query}` || `${category} GIFs`}
      </h1>
      <p className={headerStyles.description}>Find the latest GIFs!</p>
    </div>
  )
}

export default Header
