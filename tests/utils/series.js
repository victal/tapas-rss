// Map of known Tapas series pages along with their ids
const testPages = [
  // Comics
  {
    name: 'Anna-Saito',
    title: 'Anna Saito - Journalist Fighter (pt_BR)',
    id: '85441',
    episode: '1051129'
  }, {
    name: 'BEAR',
    title: 'BEAR',
    id: '3601',
    episode: '901795'
  }, {
    // series with rss only acessible via slash-terminated url
    // see https://forums.tapas.io/t/rss-feeds-gone/41724/5 for details
    name: '48km',
    title: '48km',
    id: '104364',
    episode: '1062095'
  },
  // Novels
  {
    name: 'rtw',
    title: 'Release That Witch',
    id: '128811',
    episode: '1313412'
  }
]

module.exports = {
  testPages
}
