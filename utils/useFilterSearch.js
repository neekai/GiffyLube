import { useEffect, useState } from 'react'
import { MAX_OFFSET } from './constants'
import { getTrendingGIFs, getGIFsByCategory } from '../services/gallery'
import AbortController from 'abort-controller'

const useFilterSearch = (category, offset = 0, delay = 0) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [GIFs, setGIFs] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const controller = new AbortController()
  const { signal } = controller

  useEffect(() => {
    setGIFs([])
  }, [category, delay])

  useEffect(() => {
    setLoading(true)
    setError(false)
    if (category === 'trending') {
      console.log('hello')
      getTrendingGIFs(offset, delay, signal)
        .then(res => {
          setGIFs(prevGIFs => {
            return [...prevGIFs, ...res]
          })
          setHasMore(offset < MAX_OFFSET)
          setLoading(false)
        })
        .catch(err => {
          console.log('error', err)
          setError(true)
        })
    } else {
      getGIFsByCategory(category, offset, delay, signal)
        .then(res => {
          setGIFs(prevGIFs => {
            return [...prevGIFs, ...res]
          })
          setHasMore(offset < MAX_OFFSET)
          setLoading(false)
        })
        .catch(err => {
          console.log('error', err)
          setError(true)
        })
    }

    return () => controller.abort()
  }, [offset, delay])
  return { loading, error, GIFs, hasMore }
}

export default useFilterSearch
