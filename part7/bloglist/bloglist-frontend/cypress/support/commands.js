const backendUrl = 'http://localhost:3003/api'
const frontendUrl = 'http://localhost:3000'

// create user
Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', `${backendUrl}/users`, user)
})

// login
Cypress.Commands.add('login', (user) => {
  cy.request('POST', `${backendUrl}/login`, {
    username: user.username, password: user.password
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
    cy.visit(`${frontendUrl}`)
  })
})

// logout
Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedInUser')
  cy.visit(`${frontendUrl}`)
})

// add new blog via POST
Cypress.Commands.add('addBlog', (blog) => {
  cy.request({
    url: `${backendUrl}/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  })
  cy.visit(`${frontendUrl}`)
})

// reset db state
Cypress.Commands.add('resetDb', () => {
  cy.request('POST', `${backendUrl}/testing/reset`)
})
