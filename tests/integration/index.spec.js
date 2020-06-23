const { testPages } = require('../utils/series')

describe('Cypress tests for extension UI changes', () => {
  for (const info of testPages) {
    it(`Should find an RSS button accessing the info page directly for ${info.name}`, () => {
      cy.visit(`https://tapas.io/series/${info.name}/info`)

      // TODO: Get adjacent subscribe button and validate same css except for a ignoreList
      // Or add visual validation
      const rssButtons = cy.get('.button-rss')
      rssButtons.should('contain', 'RSS')
      rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}`)
    })

    it(`Should find an RSS button on the last episode page for ${info.name}'s sidebar`, () => {
      cy.visit(`https://tapas.io/series/${info.name}`)
      const subscribeButtons = cy.get('.side-section').get('.subscribe-btn')
      const rssButtons = subscribeButtons.parent().children('.button-rss')
      rssButtons.should('contain', 'RSS')
      rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}`)
    })

    it(`Should find an RSS button on a ${info.name} episode page sidebar`, () => {
      cy.visit(`https://tapas.io/episode/${info.episode}`)
      const subscribeButtons = cy.get('.side-section').get('.subscribe-btn')
      const rssButtons = subscribeButtons.parent().children('.button-rss')
      rssButtons.should('contain', 'RSS')
      rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}`)
    })

    it(`Should find an RSS button in the /info popup from the ${info.name} episode page`, () => {
      cy.visit(`https://tapas.io/episode/${info.episode}`)
      cy.get('.side-section').get('.js-series-btn').first().click()
      cy.location().should(loc => {
        expect(loc.pathname).to.be.equal(`/series/${info.name}/info`)
      })
      const subscribeButtons = cy.get('.modal-backdrop').get('.button--subscribe')
      const rssButtons = subscribeButtons.parent().children('.button-rss')
      rssButtons.should('contain', 'RSS')
      rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}`)
    })
  }
})
