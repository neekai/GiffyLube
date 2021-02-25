import noResultsStyles from '@/styles/NoResults.module.scss'

interface PageProps {
  query: string
}

const NoResults = ({ query }: PageProps) => {
  return (
    <div className={noResultsStyles.container}>
      <h2>No GIFs found for: {query}</h2>
    </div>
  )
}

export default NoResults
