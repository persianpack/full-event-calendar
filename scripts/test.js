import cypress from 'cypress'
import { glob } from 'glob'
import process from 'node:process'
import path from 'path'
const cwd = process.cwd()
console.log(path.join(cwd, 'cypress/e2e/1-getting-started/todo.cy.js'))
const main = async () => {
  const result = await cypress.run({
    spec: 'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/cypress/e2e/**/basic-grid.cy.js',
    // spec: path.join(cwd,'cypress/e2e/1-getting-started/todo.cy.js'),
    reporter: 'junit'
  })

  return result
}
cypress.open({
  config: {
    baseUrl: 'http://localhost:8080'
  },
  env: {
    login_url: '/login',
    products_url: '/products'
  }
})
main()
