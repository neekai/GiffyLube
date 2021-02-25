import { useEffect, useState } from 'react'
import StarredItem from '../components/StarredItem'
import EmptyPage from '../components/EmptyPage'
import { removeFromFavorite } from '@/utils/helpers'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const Starred = () => {
  const [starredGIFs, setStarredGIFs] = useState<Array<object>>([])
  useEffect(() => {
    const starredGIFsArr: Array<object> = []
    Object.keys(sessionStorage).map(slug => {
      const info: any = {}
      info[slug] = sessionStorage.getItem(slug)
      starredGIFsArr.push(info)
    })
    setStarredGIFs(starredGIFsArr)
  }, [])

  const handleUnstar = (slug: string) => {
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
