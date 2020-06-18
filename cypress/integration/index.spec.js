
// Map of known Tapas series pages along with their ids
const testPages = {
  annaSaito: {
    name: 'Anna-Saito',
    id: '85441',
    episode: '1051129'
  }
}

describe('Cypress initial tests', () => {
  const testInfo = testPages.annaSaito
  it('Should find an RSS button accessing a series info page directly', () => {
    cy.visit(`https://tapas.io/series/${testInfo.name}/info`)

    // TODO: Get adjacent subscribe button and validate same css except for a ignoreList
    const rssButtons = cy.get('.button-rss')
    rssButtons.should('contain', 'RSS')
    rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${testInfo.id}`)

    // TODO: Validate download instead of request if possible
    // TODO: Actually validate rss content
    cy.request(`https://tapas.io/rss/series/${testInfo.id}`).should(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.not.be.undefined
    })
  })

  it('Should find an RSS button on the episode page sidebar', () => {
    cy.visit(`https://tapas.io/episode/${testInfo.episode}`)
    const subscribeButtons = cy.get('.side-section').get('.subscribe-btn')
    const rssButtons = subscribeButtons.parent().children('.button-rss')
    rssButtons.should('contain', 'RSS')
    rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${testInfo.id}`)
  })

  it('Should find an RSS button in the /info popup from the episode page', () => {
    cy.visit(`https://tapas.io/episode/${testInfo.episode}`)
    cy.get('.side-section').get('.js-series-btn').first().click()
    cy.location().should(loc => {
      expect(loc.pathname).to.be.equal(`/series/${testInfo.name}/info`)
    })
    const subscribeButtons = cy.get('.modal-backdrop').get('button--subscribe')
    const rssButtons = subscribeButtons.parent().children('.button-rss')
    rssButtons.should('contain', 'RSS')
    rssButtons.should('have.attr', 'href', `https://tapas.io/rss/series/${testInfo.id}`)
  })
})
