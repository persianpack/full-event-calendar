/// <reference types="cypress" />

describe('Monthly tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('monthly check', () => {
    cy.get('[data-test-id-dropdown=1]').click().get('[data-test-id-drop=2]').click()
    cy.get('[data-test-id-month-row=0] [data-test-id-row-wrapper=0]').children().should('have.length', 2)
    cy.get('[data-test-id-month-row=0] [data-test-id-row-wrapper=1]').children().should('have.length', 2)
    cy.get('[data-test-id-month-row=0] [data-test-id-row-wrapper=2]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=0] [data-test-id-row-wrapper=3]').children().should('have.length', 2)

    cy.get('[data-test-id-month-row=1] [data-test-id-row-wrapper=0]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=1] [data-test-id-row-wrapper=1]').children().should('have.length', 5)
    cy.get('[data-test-id-month-row=1] [data-test-id-row-wrapper=2]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=1] [data-test-id-row-wrapper=3]').children().should('have.length', 3)

    cy.get('[data-test-id-month-row=2] [data-test-id-row-wrapper=0]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=2] [data-test-id-row-wrapper=1]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=2] [data-test-id-row-wrapper=2]').children().should('have.length', 2)

    cy.get('[data-test-id-month-row=2] [data-test-id-row-wrapper=0]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=2] [data-test-id-row-wrapper=1]').children().should('have.length', 1)
    cy.get('[data-test-id-month-row=2] [data-test-id-row-wrapper=2]').children().should('have.length', 2)

    cy.get('[data-test-id-month-row=3] [data-test-id-row-wrapper=0]').children().should('have.length', 1)
  })
})
