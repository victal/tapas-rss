// Map of known Tapas series pages along with their ids
const testPages = [
  // Comics
  {
    name: 'Anna-Saito',
    title: 'Anna Saito - Journalist Fighter (pt_BR)',
    id: '85441',
    episode: '1051129'
  }, {
    name: 'Dying-Light1',
    title: 'Dying Light',
    id: '199357',
    episode: '2266438'
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
    name: 'What-if-xkcd',
    title: 'What if?',
    id: '254613',
    episode: '2756941'
  }
]

module.exports = {
  testPages
}
