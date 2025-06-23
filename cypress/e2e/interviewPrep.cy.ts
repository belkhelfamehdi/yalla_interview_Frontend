describe('Interview preparation page', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'abc')
    cy.intercept('GET', '/api/sessions/1', {
      session: {
        _id: '1',
        role: 'Dev',
        experience: '1',
        topicToFocus: 'React',
        description: 'desc',
        updatedAt: '2024-06-01',
        questions: [
          {
            _id: 'q1',
            question: 'Why React?',
            answer: 'Because',
            isPinned: false,
          },
        ],
      },
    }).as('getSession')
  })

  it('shows explanation drawer', () => {
    cy.intercept('POST', '/api/ai/generate-explanations', {
      title: 'Explain',
      explanation: 'Some explanation',
    }).as('explain')

    cy.visit('/interview-prep/1')
    cy.wait('@getSession')
    cy.contains('Why React?').parent().find('button').contains(/learn more/i).click({ force: true })
    cy.wait('@explain')
    cy.contains('Explain').should('be.visible')
  })
})
