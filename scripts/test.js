import cypress from 'cypress'
import { glob } from 'glob'
import process from 'node:process'
import path from 'path'
const cwd = process.cwd()
console.log(path.join(cwd, 'cypress/e2e/1-getting-started/todo.cy.js'))
const main = async () => {
  const result = await cypress.run({
    spec: 'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/month-grid/__tests__/GridMonth.cy.js',
    // spec: path.join(cwd,'cypress/e2e/1-getting-started/todo.cy.js'),
    reporter: 'junit'
  })

  return result
}
cypress.open({
  config: {
    baseUrl: 'http://localhost:8080',
    experimentalRunAllSpecs: true
  },
  specPattern: 'packages/**/__tests__/*.cy.js',

  env: {
    login_url: '/login',
    products_url: '/products'
  }
})
// main()
