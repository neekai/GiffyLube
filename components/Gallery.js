import { useState, useContext } from 'react'
import { FilterContext } from '../contexts/FilterContext'
import useFilterSearch from '../utils/useFilterSearch.js'
import GalleryItem from './GalleryItem'
const Gallery = ({ initialGIFs = [] }) => {
  const {
    filterState: { category, rating }
  } = useContext(FilterContext)
  const [offset, setOffset] = useState(0)

  const { GIFs, hasMore, loading, error } = useFilterSearch(
    initialGIFs,
    category,
    rating,
    offset
  )

  console.log('initial', initialGIFs)
  console.log('filter state', category, rating)
  return <div className="container"></div>
}

export default Gallery
