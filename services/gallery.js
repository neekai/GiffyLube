const getTrendingGIFs = async (offset = 0) => {
  console.log('getting GIFs')
  const url = `${process.env.NEXT_PUBLIC_GET_TRENDING}?offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    console.log('url', url)
    const apiCall = await fetch(url)
    const response = await apiCall.json()
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

const getGIFsByCategory = async (category, offset = 0) => {
  const url = `${process.env.NEXT_PUBLIC_GET_CATEGORY}?q=${category}&offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    console.log('url', url)
    const apiCall = await fetch(url)
    const response = await apiCall.json()
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

const getRandomGIF = async (tag = '') => {
  const url = `${process.env.NEXT_PUBLIC_GET_RANDOM}?tag=${tag}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  console.log('random url', url)
  try {
    const apiCall = await fetch(url)
    const response = await apiCall.json()
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
