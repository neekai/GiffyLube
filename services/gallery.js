const getTrendingGIFs = async (offset, delay, signal) => {
  console.log('getting GIFs', signal)
  const url = `${process.env.NEXT_PUBLIC_GET_TRENDING}?offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    console.log('url', url)
    const apiCall = await fetch(url, { signal })
    const response = await new Promise(resolve =>
      setTimeout(() => resolve(apiCall.json()), delay)
    )
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

const getGIFsByCategory = async (category, offset = 0, delay, signal) => {
  const url = `${process.env.NEXT_PUBLIC_GET_CATEGORY}?q=${category}&offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    console.log('url', url)
    const apiCall = await fetch(url, { signal })
    // const response = await apiCall.json()
    const response = await new Promise(resolve =>
      setTimeout(() => resolve(apiCall.json()), delay)
    )
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

const getRandomGIF = async (delay = 0, tag = '') => {
  const url = `${process.env.NEXT_PUBLIC_GET_RANDOM}?tag=${tag}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  console.log('random url', url)
  try {
    // const apiCall = await setTimeout(() => fetch(url), 3000)
    const apiCall = await fetch(url)
    const response = await new Promise(resolve =>
      setTimeout(() => resolve(apiCall.json()), delay)
    )
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getTrendingGIFs,
  getGIFsByCategory,
  getRandomGIF
}
