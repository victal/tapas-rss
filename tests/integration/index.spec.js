
// Map of known Tapas series pages along with their ids
const testPages = [
  {
    name: 'Anna-Saito',
    id: '85441',
    episode: '1051129'
  }, {
    name: 'BEAR',
    id: '3601',
    episode: '901795'
  }
]

describe('Cypress initial tests', () => {
  for (const info of testPages) {
    it(`Should find an RSS button accessing the info page directly for ${info.name}`, () => {
      cy.visit(`https://tapas.io/series/${info.name}/info`)

      // TODO: Get adjacent subscribe button and validate same css except for a ignoreList
      // Or add visual validation
      const rssButtons = cy.get('.button-rss')
      rssButtons.should('contain', 'RSS')
      rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}`)

      // TODO: Actually validate rss content
      cy.request(`https://tapas.io/rss/series/${info.id}`).should(response => {
        expect(response.status).to.be.equal(200)
        expect(response.body).to.not.be.undefined
      })
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
