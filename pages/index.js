import Head from 'next/head'
import Random from '../components/Random'
import { getRandomGIF } from '../services/gallery.js'

const Home = ({ initialRandomGIF }) => {
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
        <Random initialRandomGIF={initialRandomGIF} />
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const initialRandomGIF = await getRandomGIF()
  return {
    props: {
      initialRandomGIF
    }
  }
}
