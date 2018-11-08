describe('Application', () => {
  it('loads main component', () => {
    cy.visit('/');
    cy.contains('section', 'TESTING');
    cy.contains('section', 'Main');
  })
})