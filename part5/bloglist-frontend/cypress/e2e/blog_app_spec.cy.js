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
      cy.contains('login').click()

      cy.get('html').contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress_user_wrong')
      cy.get('#password').type('cypressuserwrong')
      cy.contains('login').click()

      cy.get('#notification').should('contain', 'wrong username or password')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('cypress_user')
      cy.get('#password').type('cypressuser')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-note-button').click()
      cy.get('#title-input').type('Cypress Title...')
      cy.get('#author-input').type('Cypress Author...')
      cy.get('#url-input').type('Cypress URL...')
      cy.get('#create-button').click()

      cy.get('.blogRendered').should('contain', 'Cypress Title...')
        .and('contain', 'Cypress Author...')
    })

    it('Users can like a blog', function() {
      cy.get('#new-note-button').click()
      cy.get('#title-input').type('Cypress Title...')
      cy.get('#author-input').type('Cypress Author...')
      cy.get('#url-input').type('Cypress URL...')
      cy.get('#create-button').click()

      cy.get('#view-button').click()
      cy.get('.blogNotRendered').contains('0')
      cy.get('#like-button').click()
      cy.get('.blogNotRendered').contains('1')
    })
  })

  describe('The loggind in User', function () {
    beforeEach(function() {
      const newUpdatedUser = {
        username: 'cypress_user_2',
        name: 'Cypress User 2',
        password: 'cypressuser2'
      }
      cy.request('POST', 'http://localhost:3003/api/users', newUpdatedUser)

      cy.get('#username').type('cypress_user')
      cy.get('#password').type('cypressuser')
      cy.contains('login').click()

    })
    it('can delete a blog they created', function() {
      cy.get('#new-note-button').click()
      cy.get('#title-input').type('Cypress Title...')
      cy.get('#author-input').type('Cypress Author...')
      cy.get('#url-input').type('Cypress URL...')
      cy.get('#create-button').click()

      cy.get('#blogs').should('exist')
      cy.get('#blogs').should('contain', 'Cypress Title...')

      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.on('window:confirm', () => true)

      cy.get('#blogs').should('not.exist')
    })

    it('cannot delete a blog they did not create', async function() {
      cy.get('#new-note-button').click()
      cy.get('#title-input').type('Cypress Title...')
      cy.get('#author-input').type('Cypress Author...')
      cy.get('#url-input').type('Cypress URL...')
      cy.get('#create-button').click()

      cy.get('#logout-button').click()

      cy.get('#username').type('cypress_user_2')
      cy.get('#password').type('cypressuser2')
      cy.contains('login').click()

      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.on('window:confirm', () => true)

      cy.get('#blogs').should('contain', 'Cypress Title...')


      // //cy.get('#blogs').should('exist')
      // cy.get('#blogs').should('contain', 'Cypress Title...')

      // cy.get('#view-button').click()
      // cy.get('#remove-button').click()

      // cy.get('#blogs').should('not.exist')
    })
  })
})

