import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { CATEGORIES, DELAY_VALUES } from '../utils/constants'
import { FilterContext } from '../contexts/FilterContext'
import { DelayContext } from '../contexts/DelayContext'
import { SET_CATEGORY, SET_DELAY } from '../utils/actions'
import navStyles from '../styles/components/Nav.module.scss'

const Nav = () => {
  const {
    filterState: { category: categoryName },
    setFilter
  } = useContext(FilterContext)

  const { setDelay } = useContext(DelayContext)

  return (
    <div className={navStyles.container}>
      <nav className={navStyles.nav}>
        <Link href="/">Logo</Link>
        <ul>
          <li
            onClick={() =>
              setFilter({ type: SET_CATEGORY, payload: 'trending' })
            }
          >
            <Link href="/trending">Trending</Link>
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
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
          <li className={navStyles.delay}>
            Delay
            <div className={navStyles['delay-dropdown']}>
              {DELAY_VALUES.map((delay, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setDelay({ type: SET_DELAY, payload: delay.value })
                  }}
                >
                  {delay.name}
                </div>
              ))}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
