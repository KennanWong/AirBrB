/* eslint-disable */
import 'cypress-file-upload';
context('Edit listing - happy path', () => {
  const email = 'Sammy@email.com';
  const password = 'password';
  beforeEach(() => {
    cy.visit('localhost:3000/login');
    cy.get('input[name=Email')
      .focus()
      .type(email);

    cy.get('input[name=Password')
      .focus()
      .type(password);

    cy.get('button[name=Submit]')
      .click()

    cy.visit('localhost:3000/myListings');
    cy.get('button[name=listing-0]')
      .click()
  });

  it ('Scuessfully edit listing', () => {
    const newTitle = 'AHouse';

    cy.get('div[name=placeHolderThumb')
      .trigger('mouseover')
    cy.get('input[name=thumbUpload]')
        .attachFile('../Images/TestHouse3.jpg')
    
    cy.get('input[name=Title]')
      .focus()
      .clear()
      .type(newTitle)

    cy.get('button[name=Save]')
      .click()
  });
})
