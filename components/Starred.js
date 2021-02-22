import { useEffect, useState } from 'react'
import StarredItem from './StarredItem'
import NoResults from './NoResults'
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
    setStarredGIFs(starredGIFs.filter(gif => Object.keys(gif)[0] !== slug))
  }

  const renderStarredItem = () => {
    return (
      <ResponsiveMasonry>
        <Masonry>
          {starredGIFs.map(starredGIF => {
            return (
              <StarredItem
                starredGIF={starredGIF}
                handleUnstar={handleUnstar}
              />
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    )
  }
  return <div>{starredGIFs.length ? renderStarredItem() : <NoResults />}</div>
}

export default Starred
