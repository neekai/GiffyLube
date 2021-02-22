const getTrendingGIFs = async (offset, delay) => {
  console.log('getting GIFs')
  const url = `${process.env.NEXT_PUBLIC_GET_TRENDING}?offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    console.log('url', url)
    const apiCall = await fetch(url)
    // const response = await apiCall.json()
    const response = await new Promise(resolve =>
      setTimeout(() => resolve(apiCall.json()), delay)
    )
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

// const fetchWithTimeout = async (resource, options) => {
//   const { timeout = 0 } = options
//   console.log('hello time out', timeout)
//   const controller = new AbortController()
//   const id = setTimeout(() => controller.abort(), timeout)
//   const response = await fetch(resource, {
//     ...options,
//     signal: controller.signal
//   })
//   clearTimeout(id)
//   return response
// }

module.exports = {
  getTrendingGIFs,
  getGIFsByCategory,
  getRandomGIF
}
