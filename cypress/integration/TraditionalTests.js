/// <reference types="cypress" />

beforeEach(function () {
    cy.visit('https://demo.applitools.com/hackathonV2.html')
    //cy.visit('https://demo.applitools.com/hackathon.html')
})

//Custom Login Helper For Section 3
Cypress.Commands.add('login', () => {
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
})

//Array Equal?
Array.prototype.equals = function (array, strict) {
    if (!array)
        return false;

    if (arguments.length == 1)
        strict = true;

    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i], strict))
                return false;
        }
        else if (strict && this[i] != array[i]) {
            return false;
        }
        else if (!strict) {
            return this.sort().equals(array.sort(), true);
        }
    }
    return true;
}

//Section 1
it('should validate login page title and meta data', () => {   
    cy.title().should('include', 'ACME demo app')
    cy.document().get('head meta[name="description"]').should('have.attr', 'content', 'ACME demo app')
    cy.document().get('head meta[name="keywords"]').should('have.attr', 'content', 'Applitools Visual testing')
})  

it('should validate login page logo and title', () => {   
    cy.get('.logo-w').should('include.html', '<a href="index.html">')
    cy.get('.logo-w > a').should('have.attr', 'href', 'index.html')
    cy.get('.logo-w > a > img')
    cy.get('.auth-header').should('include.text', 'Login Form')
    cy.get('#alertEmpty')
})

it('should validate username component', () => {
    cy.get('form').within(() => {
        cy.get('label:first').should('have.text', 'Username')
        cy.get('.pre-icon:first').should('have.class', 'pre-icon os-icon os-icon-user-male-circle')
        cy.get('#username').should('have.attr', 'placeholder', 'Enter your username')
        cy.get('#username').should('have.attr', 'type', 'text')

    })
})

it('should validate password component', () => {
    cy.get('form').within(() => {
        cy.get('label').eq(1).should('have.text', 'Password')
        cy.get('.pre-icon').eq(1).should('have.class', 'pre-icon os-icon os-icon-fingerprint')
        cy.get('#password').should('have.attr', 'placeholder', 'Enter your password')
        cy.get('#password').should('have.attr', 'type', 'password')

    })
})

it('should validate button commponent', () => {
    cy.get('.buttons-w').within(() => {
        cy.get('#log-in').should('have.text', 'Log In')
        cy.get('.form-check-label').should('have.text', 'Remember Me')
        cy.get('.form-check-input').should('not.be.selected')
    })
})

it('should have proper social media links', () => {
    cy.get('.buttons-w a').eq(0).should('include.html', 'src="img/social-icons/twitter.png"')
    cy.get('.buttons-w a').eq(1).should('include.html', 'src="img/social-icons/facebook.png"')
    cy.get('.buttons-w a').eq(2).should('include.html', 'src="img/social-icons/linkedin.png"')
})

//Section 2
it('should show proper messaging when logging in with no username or password', () => {
    cy.get('#log-in').click()
    cy.get('div[id*="random_id_"]').should('include.text', 'Both Username and Password must be present')
})

it('should show proper messaging when logging in with only username', () => {
    cy.get('form #username').type('Testy McTester')
    cy.get('#log-in').click()
    cy.get('div[id*="random_id_"]').should('include.text', 'Password must be present')
})

it('should show proper messaging when logging in with only password', () => {
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
    cy.get('div[id*="random_id_"]').should('include.text', 'Username must be present')
})

it('should allow login with any username and password combination', () => {
    cy.get('form #username').type('Testy McTester')
    cy.get('form #password').type('Passymcpassword!1')
    cy.get('#log-in').click()
    cy.url().should('include', 'hackathonApp.html')
    cy.get('.top-menu-controls > .logged-user-w').should('include.html', 'src="img/avatar1.jpg"')
})

//Section 3
it('should sort Recent Transaction by Amounts in ascending order', () => {
    cy.login()
    cy.get('#amount').click()
    cy.get('#transactionsTable>tbody>tr>.text-right:first').should('contain.text', '- 320.00 USD')
    cy.get('#transactionsTable>tbody>tr>.text-right:last').should('contain.text', '+ 1,250.00 USD')
})

it('should sort Recent Transaction by Amounts and keep row data consistant static data', () => {
    cy.login()
    cy.get('#amount').click()
    
    //Assuming we have static data this method should work for the first row verification
    cy.get('#transactionsTable>tbody>tr').then(function($lis){
        expect($lis.eq(0))
        .to.contain('Pending')
        .to.contain('Yesterday')
        .to.contain('MailChimp Services')
        .to.contain('Software')
        .to.contain('- 320.00 USD')
    })

    cy.get('#transactionsTable>tbody').find('tr')
    .should(($tr) => {
    // return an array of texts from all of the tr's
    let texts = $tr.map((i, el) => Cypress.$(el).text())

    // jquery map returns jquery object
    // and .get() convert this to simple array
    texts = texts.get().toString()

    // use second argument to expect(...) to provide clear
    // message with each assertion
    expect(texts, 'all rows stay constant').to.deep.contain(
      'Pending',
      'Yesterday',
      'MailChimp Services',
      'Software',
      '- 320.00 USD')
  })
})

it('Row data should stay consistent after sorting', () => {
    cy.login()

    let before_texts = []
    let after_texts = []

    cy.get('#transactionsTable>tbody').find('tr')
        .should(($tr) => {
        // return an array of texts from all of the tr's
        let texts = $tr.map((i, el) => Cypress.$(el).text())

        // jquery map returns jquery object
        // and .get() convert this to simple array
        before_texts = texts.get()
        expect(before_texts).to.be.a('array')
        expect(before_texts).to.be.lengthOf(6)
    })

    //Sort the columns
    cy.get('#amount').click()

    cy.get('#transactionsTable>tbody').find('tr')
        .should(($tr) => {
        // return an array of texts from all of the tr's
        let texts = $tr.map((i, el) => Cypress.$(el).text())

        // jquery map returns jquery object
        // and .get() convert this to simple array
        after_texts = texts.get()
        expect(after_texts).to.be.a('array')
    })

    //console.log(before_texts.equals(after_texts))
    expect(before_texts.equals(after_texts)).to.be.true
})

//Section 4
it('should display expenses chart', () => {
    cy.login()
    cy.get('#showExpensesChart').click()
    cy.get('#canvas')
    .should('be.visible')
    //TODO further asert bars on the chart are correct height assuming static data
})

it('should show next years data in expenses chart', () => {
    cy.login()
    cy.get('#showExpensesChart').click()
    cy.get('#addDataset').click()
    .should('be.visible')
    cy.get('#canvas')
    .should('be.visible')
})

//Section 5
it('should show proper advertisments', () => {
    cy.visit('https://demo.applitools.com/hackathon.html?showAd=true')
    cy.login()
})