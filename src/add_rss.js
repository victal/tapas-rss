const getIdFromPage = () => document.querySelectorAll('meta[content*="tapastic://series"]')[0].getAttribute('content').split('/')[3]

const getRSSUrl = id => {
  const seriesId = id || getIdFromPage()
  return `https://tapas.io/rss/series/${seriesId}/`
}

const hasRSSButton = element => {
  for (const child of element.children) {
    if (child.classList.contains('button-rss')) {
      return true
    }
  }
  return false
}

const addRSSButtons = getSiblings => link => {
  const subscribeButtons = getSiblings()
  for (const button of subscribeButtons) {
    const parent = button.parentElement
    if (!hasRSSButton(parent)) {
      const rssButton = document.createElement('a')
      rssButton.setAttribute('target', '_blank')
      rssButton.classList = button.classList
      rssButton.classList.add('button-rss')
      rssButton.textContent = 'RSS'
      rssButton.setAttribute('href', link)
      parent.appendChild(rssButton)
    }
  }
}

const getSubscribeButtons = () => document.querySelectorAll('.button--subscribe, .subscribe-btn')

const hasModule = typeof exports !== 'undefined'

if (hasModule) {
  module.exports = {
    addRSSButtons,
    getSubscribeButtons,
    getRSSUrl
  }
}
