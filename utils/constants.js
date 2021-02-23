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

const DELAY_VALUES = [
  { name: '1 second', value: 1000 },
  { name: '2 seconds', value: 2000 },
  { name: '3 seconds', value: 3000 },
  { name: '4 seconds', value: 4000 },
  { name: '5 seconds', value: 5000 },
  { name: 'None', value: 0 }
]

const MAX_OFFSET = 4999

module.exports = {
  CATEGORIES,
  DELAY_VALUES,
  MAX_OFFSET
}
