import { useState, useEffect } from 'react'
import { getRandomGIF } from '../services/gallery.js'
import randomStyles from '../styles/components/Random.module.scss'
import imageStyles from '../styles/components/Image.module.scss'

const Random = ({ initialRandomGIF }) => {
  const [randomGIF, setRandomGIF] = useState(initialRandomGIF)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleGetRandomGIF = async () => {
    setSearchValue('')
    setLoading(true)
    const GIF = await getRandomGIF()
    setRandomGIF(GIF)
    setLoading(false)
  }

  const handleSearchValue = e => {
    const value = e.target.value.trim()
    console.log('value', value)
    setSearchValue(value)
  }

  const handleSearchSubmit = async e => {
    e.preventDefault()
    console.log('search value', searchValue)
    setLoading(true)
    const GIF = await getRandomGIF(searchValue)
    setRandomGIF(GIF)
    setLoading(false)
  }
  console.log('random gif', randomGIF)
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
      <button onClick={handleGetRandomGIF}>
        {loading ? 'loading' : 'Get Funky!'}
      </button>
    </section>
  )
}

export default Random
