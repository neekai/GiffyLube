import Head from 'next/head'
import Main from '../components/Main'

const Home = () => {
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
        <Main />
      </main>
    </div>
  )
}

export default Home
