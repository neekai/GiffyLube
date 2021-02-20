import Head from 'next/head'
import Gallery from '../components/Gallery'
import { getTrendingGIFs } from '../services/gallery.js'

const Home = ({ initialGIFs }) => {
  console.log(initialGIFs)
  return (
    <div>
      <Head>
        <title>Giffy Lube</title>
        <meta
          name="keywords"
          content="GIFS, animated GIFs, funny GIFs, reaction GIFs, category GIFs"
        />
      </Head>
      <main>
        <Gallery initialGIFs={initialGIFs} />
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const initialGIFs = await getTrendingGIFs()
  return {
    props: {
      initialGIFs
    }
  }
}
