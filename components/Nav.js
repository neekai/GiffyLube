import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { CATEGORIES, DELAY_VALUES } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faRocket } from '@fortawesome/free-solid-svg-icons'
import { FilterContext } from '../contexts/FilterContext'
import { DelayContext } from '../contexts/DelayContext'
import { SET_CATEGORY, SET_DELAY } from '../utils/actions'
import navStyles from '../styles/components/Nav.module.scss'

const Nav = () => {
  const { setFilter } = useContext(FilterContext)

  const {
    delayState: { delay: delayStateValue },
    setDelay
  } = useContext(DelayContext)

  return (
    <div className={navStyles.container}>
      <nav className={navStyles.nav}>
        <Link href="/">
          <li>
            <FontAwesomeIcon icon={faRocket} className={navStyles.logo} />
          </li>
        </Link>
        <ul>
          <li
            onClick={() =>
              setFilter({ type: SET_CATEGORY, payload: 'trending' })
            }
          >
            <Link href="/trending">Trending</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
          <li className={navStyles.delay}>
            Delay
            <div
              className={`${navStyles['dropdown']} ${
                navStyles['delay-dropdown']
              }`}
            >
              {DELAY_VALUES.map((delay, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setDelay({ type: SET_DELAY, payload: delay.value })
                  }}
                  className={`${navStyles['dropdown-item']} ${
                    delayStateValue === delay.value ? navStyles['active'] : ''
                  }`}
                >
                  {delay.name}
                </div>
              ))}
            </div>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={navStyles['carrot']}
            />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
