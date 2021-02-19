import FilterContextProvider from '../contexts/FilterContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <FilterContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FilterContextProvider>
  )
}

export default MyApp
