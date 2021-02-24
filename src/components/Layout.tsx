import Header from './Header'
import Nav from './Nav'
import layoutStyles from '@/styles/Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Nav />
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>{children}</main>
      </div>
    </>
  )
}

export default Layout
