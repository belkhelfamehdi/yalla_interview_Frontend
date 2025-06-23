describe('Dashboard page', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'abc')
    cy.intercept('GET', '/api/sessions/my-sessions', {
      sessions: [
        {
          _id: '1',
          role: 'Developer',
          experience: '1',
          topicToFocus: 'React',
          description: 'desc',
          questions: [],
          updatedAt: '2024-06-01',
        },
      ],
    }).as('getSessions')
  })

  it('loads sessions and opens create form', () => {
    cy.visit('/dashboard')
    cy.wait('@getSessions')
    cy.contains('Add New').click()
    cy.get('input[placeholder="e.g., Frontend Developer, UI/UX Designer, etc."]').should('be.visible')
  })
})
