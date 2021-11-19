/* eslint-disable */
context('Logout - happy path', () => {
  const email = 'Sammy@email.com';
  const password = 'password';
  it('Allows you to logout', () => {
    cy.visit('localhost:3000/login');
    cy.get('input[name=Email')
      .focus()
      .type(email);

    cy.get('input[name=Password')
      .focus()
      .type(password);

    cy.get('button[name=Submit]')
      .click()

    cy.get('button[name=Menu')
      .click()
    
    cy.get('li[name=logout')
      .click()
  });
  
});
