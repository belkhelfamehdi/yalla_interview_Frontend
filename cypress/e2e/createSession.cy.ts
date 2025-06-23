describe('Create session flow', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'abc')
    cy.intercept('GET', '/api/sessions/my-sessions', { sessions: [] })
    cy.visit('/dashboard')
    cy.contains('Add New').click()
  })

  it('submits session data and navigates to interview page', () => {
    cy.intercept('POST', '/api/ai/generate-questions', { statusCode: 200, body: [] }).as('gen')
    cy.intercept('POST', '/api/sessions/create', {
      statusCode: 200,
      body: { session: { _id: '123' } },
    }).as('create')

    cy.get('input[placeholder="e.g., Frontend Developer, UI/UX Designer, etc."]').type('Frontend Developer')
    cy.get('input[placeholder="e.g., 1 year, 3 years, 5+ years"]').type('1')
    cy.get('input[placeholder="e.g., React, CSS, Algorithms, etc."]').type('React')
    cy.get('input[placeholder="e.g., I want to focus on React and CSS."]').type('desc')
    cy.contains('button', 'Create Session').click()

    cy.wait('@gen')
    cy.wait('@create')
    cy.url().should('include', '/interview-prep/123')
  })
})
