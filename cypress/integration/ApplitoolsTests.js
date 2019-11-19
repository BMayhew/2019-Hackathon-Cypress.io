/// <reference types="cypress" />
/// <reference types="@applitools/eyes-cypress" />

//const urls = ["/hackathon.html"];
const urls = ["/hackathonV2.html"];

urls.forEach(url => {
  beforeEach(function() {
    cy.eyesOpen();
  });

  afterEach(function() {
    cy.eyesClose();
  });

  describe(`Login Page UI Elements Test on ${url}`, () => {
    beforeEach(function() {
      cy.visit(url);
    });
    it("should validate login page title and meta data", () => {
      cy.eyesCheckWindow("Login Page");
    });

    it("should validate button commponent", () => {
      cy.eyesCheckWindow({
        sizeMode: "selector",
        selector: ".buttons-w"
      });
    });
  });

  describe(`Data-Driven Test - Login  on ${url}`, () => {
    beforeEach(function() {
      cy.visit(url);
    });
    it("should show proper messaging when logging in with no username or password", () => {
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login Page - no username or password");
    });

    it("should show proper messaging when logging in with only username", () => {
      cy.get("form #username").type("Testy McTester");
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login Page - username only");
    });

    it("should show proper messaging when logging in with only password", () => {
      cy.get("form #password").type("Passymcpassword!1");
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login Page - no username only password");
    });

    it("should allow login with any username and password combination", () => {
      cy.get("form #username").type("Testy McTester");
      cy.get("form #password").type("Passymcpassword!1");
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login Page - logged in properly");
    });
  });

  describe(`Table Sort Test - Recent Transactions on ${url}`, () => {
    beforeEach(function() {
      cy.visit(url);
    });
    it("should sort Recent Transaction by Amounts in ascending order", () => {
      cy.login();
      cy.get("#amount").click();
      cy.eyesCheckWindow({
        sizeMode: "selector",
        selector: "#transactionsTable"
      });
    });
  });

  describe(`Canvas Chart Test - Compare Expenses on ${url}`, () => {
    beforeEach(function() {
      cy.visit(url);
    });
    it("should display expenses chart", () => {
      cy.login();
      cy.get("#showExpensesChart").click();
      cy.wait(3000);
      cy.eyesCheckWindow("should display expenses chart");
    });
  });

  describe(`Canvas Chart Test - Compare Expenses on ${url}`, () => {
    beforeEach(function() {
      cy.visit(url);
    });
    it("should show next years data in expenses chart", () => {
      cy.login();
      cy.get("#showExpensesChart").click();
      cy.get("#addDataset").click();
      cy.wait(3000);
      cy.eyesCheckWindow("should display expenses chart with next years info");
    });
  });

  describe(`Dynamic Content Test - Advertisments based on rules on ${url}`, () => {
    beforeEach(function() {
      cy.visit(`${url}?showAd=true`);
    });

    it("should show atleast 2 advertisements ", () => {
      cy.login();
      cy.eyesCheckWindow({
        sizeMode: "selector",
        selector: ".element-balances"
      });
    });
  });
});
