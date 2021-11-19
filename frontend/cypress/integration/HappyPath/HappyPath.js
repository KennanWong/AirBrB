/* eslint-disable */
import 'cypress-file-upload';

context ('Register flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });

  it ('Successfuly register', () => {
    const name = 'Kevin';
    const email = 'Kevin@email.com';
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
    
  })
});

context('Create Listing flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/myListings');
    cy.get('button[label=Create]')
      .click()
  });

  it ('Scuessfully create listing', () => {
    const title = 'A listing';
    const streetAddress = '1 Street Road';
    const city = 'City';
    const state = 'NSW';
    const postCode = '2000';
    const country = 'Australia'
    const numBaths = 2;
    const numBeds = 2;
    const type = 'House';
    const price = 200;

    cy.get('div[name=placeHolderThumb')
      .trigger('mouseover')
      cy.get('input[name=thumbUpload]')
        .attachFile('../Images/TestHouse2.jpg')
    
    cy.get('input[name=Title]')
      .focus()
      .type(title)
    
    cy.get('input[name=Street]')
      .focus()
      .type(streetAddress)

    cy.get('input[name=City]')
      .focus()
      .type(city)

    cy.get('input[name=PostCode]')
      .focus()
      .type(postCode)

    cy.get('input[name=State]')
      .focus()
      .type(state)

    cy.get('input[name=Country]')
      .focus()
      .type(country)

    cy.get('input[name=Bathrooms]')
      .focus()
      .type(numBaths)

    cy.get('button[name=AddBedroom]')
      .click()
    
    cy.get('input[name=numBeds]')
      .focus()
      .type(numBeds)

    cy.get('input[name=Price]')
      .focus()
      .type(price)

  });
})