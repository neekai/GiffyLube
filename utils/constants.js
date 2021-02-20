const CATEGORIES = [
  { name: 'Actions', value: 'actions' },
  { name: 'Mood', value: 'adjectives' },
  { name: 'Animals', value: 'animals' },
  { name: 'Anime', value: 'anime' },
  { name: 'Art & Design', value: 'art-design' },
  { name: 'Cartoons & Comics', value: 'cartoons-comics' },
  { name: 'Celebrities', value: 'celebrities' },
  { name: 'Decades', value: 'decades' }
]

const RATINGS = [
  { name: 'G', value: 'g' },
  { name: 'PG', value: 'pg' },
  { name: 'PG 13', value: 'pg13' },
  { name: 'R', value: 'r' }
]

const MAX_OFFSET = 4999

module.exports = {
  CATEGORIES,
  MAX_OFFSET,
  RATINGS
}
