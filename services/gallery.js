const getGIFs = async (category = 'trending', rating = '', offset = 0) => {
  //use offset and rating
  let url
  if (category === 'trending') {
    url = `${process.env.NEXT_PUBLIC_GET_TRENDING}?rating=${rating}&offset=${offset}&limit=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    try {
      console.log('url', url)
      const apiCall = await fetch(url)
      const response = await apiCall.json()
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = {
  getGIFs
}
