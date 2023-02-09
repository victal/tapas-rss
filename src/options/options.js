const save = async event => {
  event.preventDefault()
  const fieldset = document.getElementById('action')
  const checkedAction = fieldset.querySelector('input:checked')
  const rssAction = checkedAction.value
  await browser.storage.sync.set({
    rssAction
  })
  return false
}

const restoreOptions = async () => {
  const config = await browser.storage.sync.get(['rssAction'])
  const action = config.rssAction || 'open'
  document.getElementById(`action-${action}`).checked = true
}

const start = () => {
  document.getElementById('form').addEventListener('submit', save)
  restoreOptions()
}
document.addEventListener('DOMContentLoaded', start)
