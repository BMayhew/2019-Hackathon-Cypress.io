/// <reference types="cypress" />

beforeEach(function () {
    //cy.visit('https://demo.applitools.com/hackathonV2.html')
    cy.visit('https://demo.applitools.com/hackathon.html')
})

//Custom Login Helper For Section 3
Cypress.Commands.add('login', () => {
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
})


it('should show proper advertisments', () => {
    cy.visit('https://demo.applitools.com/hackathon.html?showAd=true')
    cy.login()
    cy.get('.element-balances').within(() => {
        cy.get('#flashSale').should('include.html', 'src="img/flashSale.gif"')
        cy.get('#flashSale2').should('include.html', 'src="img/flashSale2.gif"')
    })
})

it('should show proper advertisments', () => {
    cy.visit('https://demo.applitools.com/hackathonV2.html?showAd=true')
    cy.login()
    cy.get('.element-balances').within(() => {
        cy.get('#flashSale2').should('include.html', 'src="img/flaseSale3.gif"')
    })
})

//TODO, make Section 5 Tests smarter
//TODO, Visualization Tests