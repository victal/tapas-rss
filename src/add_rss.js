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

let textChangeTimeout = null

const addRSSButtons = getSiblings => async link => {
  const subscribeButtons = getSiblings()
  chrome.storage.sync.get(['rssAction'], config => {
    const action = config.rssAction || 'open'
    for (const button of subscribeButtons) {
      const parent = button.parentElement
      if (!hasRSSButton(parent)) {
        const rssButton = document.createElement('a')
        rssButton.classList = button.classList
        rssButton.classList.add('button-rss')
        rssButton.textContent = 'RSS'
        rssButton.setAttribute('href', link)
        rssButton.setAttribute('target', '_blank')
        if (action === 'copy') {
          rssButton.addEventListener('click', async event => {
            event.preventDefault()
            rssButton.textContent = 'Copied!'
            if (textChangeTimeout) {
              clearTimeout(textChangeTimeout)
            }
            textChangeTimeout = setTimeout(() => {
              rssButton.textContent = 'RSS'
            }, 3000)
            return navigator.clipboard.writeText(link)
          })
          rssButton.addEventListener('mouseout', () => {
            rssButton.textContent = 'RSS'
            textChangeTimeout && clearTimeout(textChangeTimeout)
          })
        }
        parent.appendChild(rssButton)
      }
    }
  })
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
