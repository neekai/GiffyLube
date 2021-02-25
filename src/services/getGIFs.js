const getGIFsByCategory = async (category, offset, delay, signal) => {
  const url = `${process.env.NEXT_PUBLIC_GET_GIFS_BY_CATEGORY}/${category}?offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    const apiCall = await fetch(url, { signal })
    const response = delay
      ? await new Promise(resolve =>
          setTimeout(() => resolve(apiCall.json()), delay)
        )
      : await apiCall.json()
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const getRandomGIF = async (signal, delay = 0, tag = '') => {
  const url = `${process.env.NEXT_PUBLIC_GET_RANDOM}?tag=${tag}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  try {
    const apiCall = await fetch(url, { signal })
    const response = delay
      ? await new Promise(resolve =>
          setTimeout(() => resolve(apiCall.json()), delay)
        )
      : await apiCall.json()
    return response.data
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getGIFsByCategory,
  getRandomGIF
}
