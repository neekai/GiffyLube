import { useEffect, useState } from 'react'
import { MAX_OFFSET } from './constants'
import { getGIFs } from '../services/gallery'

const useFilterSearch = (initialGIFs, category, rating, offset = 0) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [GIFs, setGIFs] = useState(initialGIFs)
  const [hasMore, setHasMore] = useState(false)
  useEffect(() => {
    setLoading(true)
    setError(false)
    if (offset > 0) {
      getGIFs(category, rating, offset)
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
  }, [category, rating, offset])
  return { loading, error, GIFs, hasMore }
}

export default useFilterSearch
