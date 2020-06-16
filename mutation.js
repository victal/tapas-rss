/* global addRSSButtons, getRSSUrl */
// Adds button to /info modal on episode page
// Select the node that will be observed for mutations
const targetNode = document.querySelector('body')

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true }

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.target.classList.contains('modal-backdrop')) {
      if (mutation.addedNodes.length > 0) {
        console.log({ mutation })
        console.log('adding rss buttons from observer')
        addRSSButtons(getRSSUrl())
        observer.disconnect()
      }
    }
  }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
observer.observe(targetNode, config)

// Later, you can stop observing
