import { useState, useContext } from 'react'
import { FilterContext } from '../contexts/FilterContext'
import useFilterSearch from '../utils/useFilterSearch.js'
import GalleryItem from './GalleryItem'
import galleryStyles from '../styles/components/Gallery.module.scss'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
const Gallery = ({ initialGIFs }) => {
  console.log('initial gifs')
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
  // console.log('gifs yo', GIFs)
  // console.log('filter state', category, rating)
  return (
    <>
      <ResponsiveMasonry>
        <Masonry>
          {GIFs.map((GIF, i) => (
            <GalleryItem
              GIF={GIF}
              key={i}
              gifCount={GIFs.length}
              index={i}
              loading={loading}
              hasMore={hasMore}
              offset={offset}
              setOffset={setOffset}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div>{loading && 'Loading'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

export default Gallery
