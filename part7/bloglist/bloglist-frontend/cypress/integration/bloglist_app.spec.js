describe('bloglist app', function() {

  const frontendUrl = 'http://localhost:3000'

  const user = {
    name: 'Test User',
    username: 'testuser',
    password: 'testuser'
  }

  const user2 = {
    name: 'Test User 2',
    username: 'testuser2',
    password: 'testuser2'
  }

  beforeEach(function() {
    cy.resetDb()
    cy.createUser(user)
    cy.createUser(user2)
    cy.visit(frontendUrl)
  })
  it('Login form is displayed by default', function() {
    cy.get('#login-form')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type(user.username)
      cy.get('#password-input').type(user.password)
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username-input').type(user.username)
      cy.get('#password-input').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('#notification').should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login(user)
    })

    const newBlog = {
      title: 'test blog title',
      author: 'test blog author',
      url: 'testblogurl',
      likes: 4
    }

    const newBlog2 = {
      title: 'test blog 2 title',
      author: 'test blog 2 author',
      url: 'testblog2url',
      likes: 3
    }

    it('user can log out', function() {
      cy.logout()
      cy.get('#blogs').should('not.exist')
    })

    it('a new blog can be added', function() {
      cy.get('#toggle-add-blog-form').click()
      cy.get('#blog-title-input').type(newBlog.title)
      cy.get('#blog-author-input').type(newBlog.author)
      cy.get('#blog-url-input').type(newBlog.url)
      cy.get('#submit-blog-button').click()
      cy.get('#notification').should('contain', 'new blog added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#blogs').should('contain', newBlog.title)
        .and('contain', newBlog.author)
    })

    it('user can like blog', function() {
      cy.addBlog(newBlog)
      cy.get('#blogs').contains('test blog title').click()
      cy.get('.like-button').click()
      cy.get('.likes').contains('5')
    })

    it('user can delete blog if they added it', function() {
      cy.addBlog(newBlog)
      cy.get('#blogs').contains('test blog title').click()
      cy.get('.delete-button').click()
      cy.get('#blogs').should('not.contain', newBlog.title)
        .and('not.contain', newBlog.author)
    })

    it.only('user cannot delete blog if they didn\'t add it', function() {
      cy.addBlog(newBlog)
      cy.logout()
      cy.login(user2)
      cy.get('#blogs').contains('test blog title').click()
      cy.get('.blog').should('not.contain', '.delete-button')
    })

    it('blogs are ordered according to most likes', function() {
      cy.addBlog(newBlog)
      cy.addBlog(newBlog2)
      cy.get('.blog').first().should('contain', newBlog.title)
        .and('contain', newBlog.author)
      cy.get('.expand-button').click({ multiple: true })
      cy.get('.blog').last().find('.like-button').click().click().click()
      cy.get('.blog').first().should('contain', newBlog2.title)
        .and('contain', newBlog2.author)
    })
  })
})
