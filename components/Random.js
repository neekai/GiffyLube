import { useState, useContext } from 'react'
import { DelayContext } from '../contexts/DelayContext'
import { getRandomGIF } from '../services/gallery.js'
import randomStyles from '../styles/components/Random.module.scss'
import imageStyles from '../styles/components/Image.module.scss'

const Random = ({ initialRandomGIF }) => {
  const {
    delayState: { delay }
  } = useContext(DelayContext)
  const [randomGIF, setRandomGIF] = useState(initialRandomGIF)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleGetRandomGIF = async () => {
    setSearchValue('')
    setLoading(true)
    const GIF = await getRandomGIF(delay)
    setRandomGIF(GIF)
    setLoading(false)
  }

  const handleSearchValue = e => {
    const value = e.target.value.trim()
    setSearchValue(value)
  }

  const handleSearchSubmit = async e => {
    e.preventDefault()
    console.log('search value', searchValue)
    setLoading(true)
    const GIF = await getRandomGIF(delay, searchValue)
    setRandomGIF(GIF)
    setLoading(false)
  }

  return (
    <section className={randomStyles['container']}>
      <form className={randomStyles.search} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a random GIF by Tag!"
          value={searchValue}
          onChange={handleSearchValue}
          required
        />
        <button>Submit</button>
      </form>
      <div
        className={`${imageStyles['image-container']} ${
          imageStyles['random-image']
        }`}
      >
        <img src={randomGIF.images.original.url} alt={randomGIF.title} />
        <div className={imageStyles['image-details']}>
          <div className={imageStyles.star}>save</div>
          <h2>{randomGIF.title}</h2>
        </div>
      </div>
      <button onClick={handleGetRandomGIF} disabled={loading}>
        {loading ? 'loading' : 'Get Funky!'}
      </button>
    </section>
  )
}

export default Random
