/* eslint-disable */
context('Publish listing - happy path', () => {
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

  it ('Scuessfully publish listing', () => {
    const date1 = new Date();    
    const date2 = date1+14;

    cy.get('button[name=addAvailability]')
      .click()
      .click()

    cy.get('#datepicker').click();
    //choose previous month
    cy.contains('Prev').click();
    //choose next month 
    cy.contains('Next').click();
    //choose date 24
    cy.contains('24').click();
  });
})
