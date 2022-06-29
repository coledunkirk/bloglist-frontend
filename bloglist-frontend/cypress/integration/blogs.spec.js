describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      userName: 'Sindy11',
      password: 'internetcafe'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('Login form can be shown', function() {
    cy.contains('Login').click()
  })
  describe('Login', function() {
    it('User can log in', function() {
      cy.contains('Login').click()
      cy.get('#username').type('Sindy11')
      cy.get('#password').type('internetcafe')
      cy.get('#login-button').click()
      cy.contains('Sindy11 is logged in')
    })
    it('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.get('#username').type('Sindy11')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('Invalid Username or Password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('After Login', function() {
    beforeEach(function() {
      cy.login({ userName: 'Sindy11', password: 'internetcafe' })
    })
    it('New blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('Sindy')
      cy.get('#url').type('www.blog.com')
      cy.get('#blog-submit-button').click()
      cy.contains('new blog')
      cy.contains('Sindy')
    })
    describe('After initial blog is created', function() { 
      beforeEach(function() {
        cy.createBlog({ 
          title: 'blog number 1',
          author: 'Cole',
          url: 'www.blog.com/1'
        })
      })
      it('Users can like a blog', function(){
        cy.contains('show details').click()
        cy.get('#like-button').click()
        cy.get('#blog-likes').contains('1')
      })
      it('Users can delete their own blog', function() {
        cy.contains('show details').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'another blog')
      })
      it.only('Blogs can be orered by number of likes', function() {
        cy.createBlog({
          title: 'blog number 2',
          author: 'Cole',
          url: 'www.blog.com/2'
        })
        cy.createBlog({
          title: 'blog number 3',
          author: 'Sindy',
          url: 'www.blog.com/3'
        })
        cy.contains('blog number 2')
          .contains('show details')
          .click()
        cy.contains('www.blog.com/2')
          .parent()
          .find('#like-button')
          .as('likeBlog2')
        cy.contains('www.blog.com/2')
          .parent()
          .find('#blog-likes')
          .as('blog2likes')
        cy.get('@likeBlog2').click()
        cy.get('@blog2likes').contains('1')
        cy.get('@likeBlog2').click()
        cy.get('@blog2likes').contains('2')
        cy.contains('blog number 3')
          .contains('show details')
          .click()
        cy.contains('www.blog.com/3')
          .parent()
          .find('#like-button')
          .as('likeBlog3')
        cy.contains('www.blog.com/3')
          .parent()
          .find('#blog-likes')
          .as('blog3likes')
        cy.get('@likeBlog3').click()
        cy.get('@blog3likes').contains('1')
        cy.contains('likes').click()
        cy.get('.blog').eq(0).should('contain', 'blog number 2')
        cy.get('.blog').eq(1).should('contain', 'blog number 3')
      })
    })
  })
})