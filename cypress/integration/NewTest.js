/// <reference types="cypress" />

const urls = ["/hackathon.html", "/hackathonV2.html"];

urls.forEach(url => {
  describe(`Login Page UI Elements Test on ${url}`, () => {
    beforeEach(function() {
      cy.visit(`${url}?showAd=true`);
    });
    it("should show proper advertisments hard coded", () => {
      cy.login();
      cy.get(".element-balances").within(() => {
        cy.get("#flashSale").should(
            "include.html", 
            'src="img/flashSale.gif"');
        cy.get("#flashSale2").should(
          "include.html",
          'src="img/flashSale2.gif"'
        );
      });
    });

    it("should show atleast 2 advertisements ", () => {
      cy.login();
      cy.get(".element-balances")
        .find("img")
        .should($img => {
          expect($img).to.have.length(2);
        });
    });

    it("should support dynamic proper advertisments", () => {
      cy.login();
      cy.get(".element-balances")
        .find("img")
        .should($img => {
          const imageSrc0 = $img[0].src;

          expect(imageSrc0).to.match(/img\/*.*\.gif/);
        });
    });
  });
});
