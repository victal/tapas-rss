describe('Cypress initial tests', () => {
  it('Should access a tapas.io info page', () => {
    cy.visit('https://tapas.io/series/Anna-Saito/info')
  })
})
