/* global addRSSButtons, getSubscribeButtons, getRSSUrl */
// Adds button to /info modal on episode page
const targetNode = document.querySelector('body')

const config = { attributes: false, childList: true, subtree: true }

const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.target.classList.contains('modal-backdrop')) {
      if (mutation.addedNodes.length > 0) {
        addRSSButtons(getSubscribeButtons)(getRSSUrl())
        observer.disconnect()
      }
    }
  }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
observer.observe(targetNode, config)
