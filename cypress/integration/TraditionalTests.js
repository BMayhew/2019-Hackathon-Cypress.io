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


it('should sort Recent Transaction by Amounts and keep row data consistant', () => {
    cy.login()
    cy.get('#amount').click()
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
