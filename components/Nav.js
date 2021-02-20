import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { CATEGORIES, RATINGS } from '../utils/constants'
import { FilterContext } from '../contexts/FilterContext'
import { SET_CATEGORY, SET_RATING } from '../utils/actions'
import navStyles from '../styles/components/Nav.module.scss'

const Nav = () => {
  const {
    filterState: { category: categoryName, rating },
    setFilter
  } = useContext(FilterContext)
  console.log('whats category', categoryName)
  return (
    <div className={navStyles.container}>
      <nav className={navStyles.nav}>
        <section>Logo</section>
        <ul>
          <li>
            <Link href="/">Trending</Link>
          </li>
          <li className={navStyles.category}>
            Categories
            <div className={navStyles['category-dropdown']}>
              {CATEGORIES.map((category, i) => (
                <Link
                  key={i}
                  href="/category/[name]"
                  as={`/category/${category.value}`}
                >
                  <div
                    onClick={() =>
                      setFilter({ type: SET_CATEGORY, payload: category.value })
                    }
                  >
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </li>
          <li className={navStyles.rating}>
            Rating
            <ul className={navStyles['rating-dropdown']}>
              {RATINGS.map((rating, i) => (
                <li
                  key={i}
                  onClick={() =>
                    setFilter({ type: SET_RATING, payload: rating.value })
                  }
                >
                  {rating.name}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
          <li>Delay</li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
