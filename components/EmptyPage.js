import emptyPageStyles from '../styles/components/EmptyPage.module.scss'

const EmptyPage = () => {
  return (
    <div className={emptyPageStyles.container}>
      <h1>The Page is Quite Empty :(</h1>
    </div>
  )
}

export default EmptyPage
