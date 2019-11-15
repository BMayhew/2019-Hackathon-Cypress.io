/// <reference types="cypress" />

beforeEach(function () {
    cy.visit('https://demo.applitools.com/hackathon.html')
    // cy.visit('https://demo.applitools.com/hackathonV2.html')
})

//Custom Login Helper For Section 3
Cypress.Commands.add('login', () => {
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
})

//Custom Login Helper for Adds
Cypress.Commands.add('loginwadds', () => {
    cy.visit('https://demo.applitools.com/hackathon.html?showAd=true')
    // cy.visit('https://demo.applitools.com/hackathonV2.html?showAd=true')
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
})



it('should show proper advertisments hard coded', () => {
    cy.loginwadds()
    cy.get('.element-balances').within(() => {
        cy.get('#flashSale').should('include.html', 'src="img/flashSale.gif"')
        cy.get('#flashSale2').should('include.html', 'src="img/flashSale2.gif"')
    })
})

it('should show atleast 2 advertisements ', () => {
    cy.loginwadds()
    cy.get('.element-balances').find('img')
    .should(($img) => {
      expect($img).to.have.length(2)
    })
})

it('should support dynamic proper advertisments', () => {
    cy.loginwadds()
    cy.get('.element-balances').find('img')
    .should(($img) => {
  
      const imageSrc0 = $img[0].src
  
      expect(imageSrc0).to.match(/\/img\/flashSale*..gif/)
    })
})


