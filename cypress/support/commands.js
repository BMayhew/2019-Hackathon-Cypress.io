// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//Custom Login Helper For Section 3
Cypress.Commands.add('login', () => {
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
})

//Custom Login Helper for Adds
Cypress.Commands.add('loginwadds', () => {
    cy.visit('/hackathon.html?showAd=true')
    // cy.visit('/hackathonV2.html?showAd=true')
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
})