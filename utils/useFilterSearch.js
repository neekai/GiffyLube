import { useEffect, useState } from 'react'
import { MAX_OFFSET } from './constants'
import { getTrendingGIFs, getGIFsByCategory } from '../services/gallery'

const useFilterSearch = (initialGIFs = [], category, rating, offset = 0) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [GIFs, setGIFs] = useState(initialGIFs || [])
  const [hasMore, setHasMore] = useState(true)

  // const controller = new AbortController();
  // const { signal } = controller

  useEffect(() => {
    setGIFs(initialGIFs)
  }, [initialGIFs, category, rating])

  useEffect(() => {
    if (offset > 0) {
      setLoading(true)
      setError(false)

      if (category === 'trending') {
        getTrendingGIFs(rating, offset)
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
        getGIFsByCategory(category, rating, offset)
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
    }

    // return () => controller.abort()
  }, [category, rating, offset])
  return { loading, error, GIFs, hasMore }
}

export default useFilterSearch
