import { useEffect, useState } from 'react'
import StarredItem from './StarredItem'
import EmptyPage from './EmptyPage'
import { removeFromFavorite } from '../utils/helpers'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const Starred = () => {
  const [starredGIFs, setStarredGIFs] = useState([])
  useEffect(() => {
    const starredGIFsArr = []
    Object.keys(sessionStorage).map(slug => {
      const info = {}
      info[slug] = sessionStorage.getItem(slug)
      starredGIFsArr.push(info)
    })
    setStarredGIFs(starredGIFsArr)
  }, [])

  const handleUnstar = slug => {
    removeFromFavorite(slug)
    setStarredGIFs(starredGIFs.filter(gif => Object.keys(gif)[0] !== slug))
  }

  const renderStarredItem = () => {
    return (
      <>
        <ResponsiveMasonry>
          <Masonry>
            {starredGIFs.map((starredGIF, i) => {
              return (
                <StarredItem
                  starredGIF={starredGIF}
                  handleUnstar={handleUnstar}
                  key={i}
                />
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </>
    )
  }
  return (
    <>
      <h1>My Favorites</h1>
      {starredGIFs.length ? renderStarredItem() : <EmptyPage />}
    </>
  )
}

export default Starred
