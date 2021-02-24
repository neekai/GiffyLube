const addToFavorite = (slug, url) => {
  sessionStorage.setItem(slug, url)
}

const removeFromFavorite = slug => {
  sessionStorage.removeItem(slug)
}

const isItemStarred = slug => {
  return sessionStorage.getItem(slug)
}

const handleToggleStar = (slug, url, starred, setStarred) => {
  if (starred) {
    setStarred(false)
    removeFromFavorite(slug)
  } else {
    setStarred(true)
    addToFavorite(slug, url)
  }
}

module.exports = {
  addToFavorite,
  removeFromFavorite,
  handleToggleStar,
  isItemStarred
}
