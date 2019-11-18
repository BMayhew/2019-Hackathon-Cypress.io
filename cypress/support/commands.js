//Custom Login Helper
Cypress.Commands.add("login", () => {
  cy.get("form #username").type("Testy McTester");
  cy.get("form #password").type("Passymcpassword!1");
  cy.get("#log-in").click();
});
