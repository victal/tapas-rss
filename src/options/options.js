const save = event => {
  event.preventDefault()
  const fieldset = document.getElementById('action')
  const checkedAction = fieldset.querySelector('input:checked')
  const rssAction = checkedAction.value
  chrome.storage.sync.set({
    rssAction
  }, () => {
    const status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(() => {
      status.textContent = ''
    }, 750)
  })
}

const restoreOptions = () => {
  chrome.storage.sync.get(['rssAction'], (config) => {
    const action = config.rssAction || 'open'
    document.getElementById(`action-${action}`).checked = true
  })
}

const start = () => {
  document.getElementById('save').addEventListener('click', save)
  restoreOptions()
}
document.addEventListener('DOMContentLoaded', start)
