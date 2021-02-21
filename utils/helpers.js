const addToFavorite = (slug, url) => {
  sessionStorage.setItem(slug, url)
}

const removeFromFavorite = slug => {
  sessionStorage.removeItem(slug)
}

module.exports = {
  addToFavorite,
  removeFromFavorite
}
