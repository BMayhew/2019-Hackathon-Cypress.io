/// <reference types="cypress" />

export class LoginPage {
  //Experimenting with page objects can be found in NewTest.js
  navigate(site) {
    cy.visit(site);
  }

  login(username, password) {
    cy.get("form #username").type(username);
    cy.get("form #password").type(password);
    cy.get("#log-in").click();
  }
}
