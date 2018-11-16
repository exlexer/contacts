describe('Application', () => {
  
  it('loads main component', () => {
    cy.visit('/');
    cy.contains('div', 'Home');
  });

  it('creates new contact', () => {
    cy.visit('/');
    cy.get('.el-table__body > tbody').children().its('length').then(prevCount => {
      cy.get('.el-tabs__new-tab').click();
      cy.get('input[name="firstName"]').type('first');
      cy.get('input[name="lastName"]').type('last');
      cy.get('.el-date-editor').click();
      cy.get('.el-date-table__row').first().children().first().click();
      cy.get('input[name="phone0"]').type('18005675667');
      cy.get('input[name="email0"]').type('member@example.com');
      cy.contains('button', 'Submit').click();
      cy.get('.el-table__body > tbody').children().should('have.length', prevCount + 1);
    });
  });

  it('opens and closes contact', () => {
    cy.visit('/');
    cy.get('.el-tabs__nav').children().should('have.length', 1);
    cy.get('.el-table__row').last().click();
    cy.get('.el-tabs__nav').children().should('have.length', 2);
    cy.get('.el-tabs__nav').children().last().children().click();
    cy.get('.el-tabs__nav').children().should('have.length', 1);
  });

  it('add contact phone', () => {
    cy.visit('/');
    cy.get('.el-table__row').last().click();
    cy.contains('.title', 'Phones').next().find('tbody').children().its('length').then(prevCount => {
      cy.contains('button', 'Add phone').click();
      cy.get('input[name="phone"]').type('18005675699');
      cy.get('button[name="addPhone"]').first().click();
      cy.contains('.title', 'Phones').next().find('tbody').find('.el-table__row').should('have.length', prevCount + 1);
    });
  });

  it('delete contact phone', () => {
    cy.visit('/');
    cy.get('.el-table__row').last().click();
    cy.contains('.title', 'Phones').next().find('tbody').within(($table) => {
      cy.get('.el-table__row').its('length').then(prevCount => {
        cy.get('.el-table__row').last().children().last().contains('button', 'Delete').click();
        cy.get('.el-table__row').should('have.length', prevCount - 1);
      });
    });
  });

  it('add contact email', () => {
    cy.visit('/');
    cy.get('.el-table__row').last().click();
    cy.contains('.title', 'Emails').next().find('tbody').children().its('length').then(prevCount => {
      cy.contains('button', 'Add email').click();
      cy.get('input[name="email"]').type('member@example.com');
      cy.get('button[name="addEmail"]').first().click();
      cy.contains('.title', 'Emails').next().find('tbody').find('.el-table__row').should('have.length', prevCount + 1);
    });
  });

  it('delete contact email', () => {
    cy.visit('/');
    cy.get('.el-table__row').last().click();
    cy.contains('.title', 'Emails').next().find('tbody').within(($table) => {
      cy.get('.el-table__row').its('length').then(prevCount => {
        cy.get('.el-table__row').last().children().last().contains('button', 'Delete').click();
        cy.get('.el-table__row').should('have.length', prevCount - 1);
      });
    });
  });

  it('add contact address', () => {
    cy.visit('/');
    cy.get('.el-table__row').last().click();
    cy.contains('.title', 'Addresses').next().find('tbody').children().its('length').then(prevCount => {
      cy.contains('button', 'Add phone').click();
      cy.get('input[name="line1"]').type('123 Other Place');
      cy.get('input[name="line2"]').type('Apartment 2');
      cy.get('input[name="city"]').type('Alpine');
      cy.get('input[name="state"]').type('Utah');
      cy.get('input[name="country"]').type('USA');
      cy.get('button[name="addAddress"]').first().click();
      cy.contains('.title', 'Addresses').next().find('tbody').find('.el-table__row').should('have.length', prevCount + 1);
    });
  });

  it('delete contact address', () => {
    cy.visit('/');
    cy.get('.el-table__row').last().click();
    cy.contains('.title', 'Addresses').next().find('tbody').within(($table) => {
      cy.get('.el-table__row').its('length').then(prevCount => {
        cy.get('.el-table__row').last().children().last().contains('button', 'Delete').click();
        cy.get('.el-table__row').should('have.length', prevCount - 1);
      });
    });
  });

  it('deletes contact', () => {
    cy.visit('/');
    cy.get('.el-table__row').its('length').then(prevCount => {
      cy.get('.el-tabs__nav').children().should('have.length', 1);
      cy.get('.el-table__row').last().click();
      cy.get('.el-tabs__nav').children().should('have.length', 2);
      cy.contains('button', 'Delete').click();
      cy.get('.el-tabs__nav').children().should('have.length', 1);
      cy.get('.el-table__row').should('have.length', prevCount - 1);
    });
  });
});