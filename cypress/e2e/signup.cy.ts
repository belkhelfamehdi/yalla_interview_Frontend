describe('Sign up flow', () => {
  it('submits form and redirects to dashboard', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: { token: 'abc', name: 'Jane' },
    }).as('register')

    cy.intercept('GET', '/api/auth/profile', { token: 'abc', name: 'Jane' })
    cy.intercept('GET', '/api/sessions/my-sessions', { sessions: [] })

    cy.visit('/')
    cy.contains('Get Started').click({ force: true })
    cy.contains('Sign Up').click()

    cy.get('input[placeholder="John Doe"]').type('Jane Doe')
    cy.get('input[placeholder="john@example.com"]').type('jane@example.com')
    cy.get('input[placeholder="********"]').type('pass')

    cy.contains('SIGN UP').click()
    cy.wait('@register')
    cy.url().should('include', '/dashboard')
  })
})
