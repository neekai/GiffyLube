import { AppProps } from 'next/app'
import FilterContextProvider from '@/contexts/FilterContext'
import DelayContextProvider from '@/contexts/DelayContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DelayContextProvider>
      <FilterContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FilterContextProvider>
    </DelayContextProvider>
  )
}

export default MyApp
