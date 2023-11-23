/// <reference types="cypress" />

describe('Daily grid tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('all day header', () => {
    cy.get('.all-day-container').children().should('have.length', 5)

    cy.get('.all-day-container').children('[data-testid=114]').should('have.class', 'month-both-arrow')
    cy.get('.all-day-container').children('[data-testid=32]').should('have.class', 'month-both-arrow')
    cy.get('.all-day-container').children('[data-testid=30]').should('have.class', 'month-both-arrow')
    cy.get('.all-day-container').children('[data-testid=18]').should('have.class', 'month-no-arrow')
    cy.get('.all-day-container').children('[data-testid=19]').should('have.class', 'month-right-arrow')
  })
})
