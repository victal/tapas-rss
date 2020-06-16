
const getRSSUrl = () => {
  const seriesId = document.querySelectorAll('meta[content*="tapastic://series"]')[0].getAttribute('content').split('/')[3]
  return `https://tapas.io/rss/series/${seriesId}`
}

const hasRSSButton = element => {
  for (const child of element.children) {
    if (child.classList.contains('button-rss')) {
      return true
    }
  }
  return false
}

const addRSSButtons = link => {
  const subscribeButtons = document.querySelectorAll('.button--subscribe')
  for (const button of subscribeButtons) {
    const parent = button.parentElement
    if (!hasRSSButton(parent)) {
      const rssButton = document.createElement('a')
      rssButton.classList = button.classList
      rssButton.classList.add('button-rss')
      rssButton.textContent = 'RSS'
      rssButton.setAttribute('href', link)
      rssButton.setAttribute('style', 'margin-left: 6px;')
      parent.appendChild(rssButton)
    }
  }
}

const addSideRSSButtons = link => {
  const subscribeButtons = document.querySelectorAll('.subscribe-btn')
  for (const button of subscribeButtons) {
    const parent = button.parentElement
    if (!hasRSSButton(parent)) {
      const rssButton = document.createElement('a')
      rssButton.classList = button.classList
      rssButton.classList.add('button-rss')
      rssButton.textContent = 'RSS'
      rssButton.setAttribute('href', link)
      parent.appendChild(rssButton)
    }
  }
}

const hasModule = typeof exports !== 'undefined'

if (hasModule) {
  module.exports = {
    addRSSButtons,
    addSideRSSButtons,
    getRSSUrl
  }
}
