describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
it('Then: I should see my finished book',() =>{
  cy.get('input[type="search"]').type('typescript');
  cy.get('form').submit()
  cy.get('[data-cy-btnid="1"').contains('Want to Read').click()
  cy.get('[data-testing="toggle-reading-list"]').click()
  cy.get('.mark-btn').click()
  cy.get('.reading-list-item-details-finished-info').should('be.visible');
  cy.get('.close-readlist').click();
  cy.get('[data-cy-finish-btnid="1"').should('be.visible')

})
});
