import { useContext } from 'react'
import { getGIFsByCategory } from '../../../services/gallery'
import Gallery from '../../../components/Gallery'

const category = ({ GIFs }) => {
  return <Gallery initialGIFs={GIFs} />
}

export default category

export const getServerSideProps = async context => {
  console.log('context', context.params.name)
  const GIFs = await getGIFsByCategory(context.params.name)

  return {
    props: {
      GIFs
    }
  }
}
