import headerStyles from '../styles/components/Header.module.scss'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>This is title</h1>
      <p className={headerStyles.description}>Find the latest GIFs!</p>
    </div>
  )
}

export default Header
