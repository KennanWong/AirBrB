/* eslint-disable */

context ('Register flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });

  it ('Successfuly happy path', () => {
    // Register
    const name = 'Sammy';
    const email = 'Sammy@email.com';
    const password = 'password';

    cy.get(`input[name=Name]`)
      .focus()
      .type(name);
    
    cy.get('input[name=Email')
      .focus()
      .type(email);

    cy.get('input[name=Password')
      .focus()
      .type(password);

    cy.get('input[name=Confirm]')
      .focus()
      .type(password);

    cy.get('button[label=Submit]')
      .click()
    
  });
});

