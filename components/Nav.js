import { useEffect } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '../utils/constants'
import navStyles from '../styles/components/Nav.module.scss'

const Nav = () => {
  useEffect(() => {
    console.log('hello')
  }, [])
  return (
    <div className={navStyles.container}>
      <nav className={navStyles.nav}>
        <section>Logo</section>
        <ul>
          <li>
            <Link href="/">Trending</Link>
          </li>
          <li className={navStyles.categories}>
            Categories
            <ul>
              {CATEGORIES.map((category, i) => (
                <li key={i}>{category.name}</li>
              ))}
            </ul>
          </li>
          <li>Rating</li>
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
