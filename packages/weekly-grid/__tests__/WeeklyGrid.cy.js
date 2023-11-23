/// <reference types="cypress" />

describe('Weekly tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('week drag-n drop event', () => {
    cy.get('[data-test-id-dropdown=1]').click().get('[data-test-id-drop=1]').click()

    cy.get('[data-test-event-id=6]').trigger('mouseover').trigger('mousedown')

    cy.get('[data-test-id-daily-grid=cl-2]')
      .children('.fec-daily-grid')
      .children('[data-test-time-range-id=2]')
      .trigger('mouseover')
      .trigger('mouseup')
    cy.get('[data-test-id-daily-grid=cl-2] [data-test-col-id=0]').children('[data-test-event-id=6]').should('exist')
  })
})
