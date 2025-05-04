/**
 * test scenario for LoginPage spec
 *
 * - LoginPage spec
 *  - should display login page correctly
 *  - should display alert when email is empty
 *  - should display alert when email is not valid
 *  - should display alert when password is empty
 *  - should display alert when email or password is wrong
 *  - should display thread page when email and password are correct
 *
 */

describe('LoginPage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('h1').should('be.visible');
    cy.get('h2').should('be.visible');
    cy.get('p').should('be.visible');
    cy.get('.bg-image').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email is not valid', () => {
    cy.get('input[placeholder="Email"]').type('Tes');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('tes123@gmail.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email or password is wrong', () => {
    cy.get('input[placeholder="Email"]').type('tes123@gmail.com');
    cy.get('input[placeholder="Password"]').type('testestes');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display thread page when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('hahahahaho@gmail.com');
    cy.get('input[placeholder="Password"]').type('hahahahaho');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('.threads').should('be.visible');
  });
});
