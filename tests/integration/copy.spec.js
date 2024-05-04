const { testPages } = require('../utils/series')

describe('Cypress tests for extension UI changes', () => {
  const extensionAlias = `tapas-rss-${Cypress.browser.name}`
  beforeEach(async () => {
    return cy.setExtensionStorage('sync', { rssAction: 'copy' }, { alias: extensionAlias })
  })
  afterEach(() => {
    return cy.clearExtensionStorage('sync', { alias: extensionAlias })
  })

  for (const info of testPages) {
    it(`Should find an RSS button accessing the info page directly for ${info.name}`, () => {
      cy.visit(`https://tapas.io/series/${info.name}/info`)

      // TODO: Get adjacent subscribe button and validate same css except for a ignoreList
      // Or add visual validation
      cy.get('.button-rss')
        .should('contain', 'RSS')
        .should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}/`).each(button => {
          if (button.is(':visible')) {
            cy.get(button).click()
            cy.get(button).should('contain', 'Copied!')
          }
        })
    })

    it(`Should find an RSS button on the last episode page for ${info.name}'s sidebar`, () => {
      cy.visit(`https://tapas.io/series/${info.name}`)
      cy.get('.side-section')
        .get('.subscribe-btn').parent()
        .children('.button-rss')
        .should('contain', 'RSS')
        .should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}/`).each(button => {
          cy.get(button).click()
          cy.get(button).should('contain', 'Copied!')
        })
    })

    it(`Should find an RSS button on a ${info.name} episode page sidebar`, () => {
      cy.visit(`https://tapas.io/episode/${info.episode}`)
      cy.get('.side-section')
        .get('.subscribe-btn').parent()
        .children('.button-rss')
        .should('contain', 'RSS')
        .should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}/`).each(button => {
          cy.get(button).click()
          cy.get(button).should('contain', 'Copied!')
        })
    })

    it(`Should find an RSS button in the /info popup from the ${info.name} episode page`, () => {
      cy.visit(`https://tapas.io/episode/${info.episode}`)
      cy.get('.side-section').get('.js-series-btn').first().click()
      cy.location().should(loc => {
        expect(loc.pathname).to.be.equal(`/series/${info.name}/info`)
      })
      cy.get('.modal-backdrop')
        .get('.button--subscribe').parent()
        .children('.button-rss')
        .should('contain', 'RSS')
        .should('have.attr', 'href', `https://tapas.io/rss/series/${info.id}/`).each(button => {
          if (button.is(':visible')) {
            cy.get(button).click()
            cy.get(button).should('contain', 'Copied!')
          }
        })
    })
  }
})
