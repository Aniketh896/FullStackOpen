describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const newUser = {
      username: 'cypress_user',
      name: 'Cypress User',
      password: 'cypressuser'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cypress_user')
      cy.get('#password').type('cypressuser')
      cy.get('button').click()

      cy.get('html').contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress_user_wrong')
      cy.get('#password').type('cypressuser')
      cy.get('button').click()

      cy.get('#notification').should('contain', 'wrong username or password')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})

