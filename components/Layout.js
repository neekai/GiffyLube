import Header from './Header'
import Nav from './Nav.js'
import layoutStyles from '../styles/components/Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>
          <Header />
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
