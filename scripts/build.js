import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import process from 'process'
import { promises as fsPromises } from 'fs'
async function updateDeclarationFile(workspacePath) {
  try {
    const packageJsonPath = path.resolve(workspacePath, 'package.json')
    const packageJsonContent = await fsPromises.readFile(packageJsonPath, 'utf-8')
    const { name } = JSON.parse(packageJsonContent)

    const declarationFilePath = path.resolve(workspacePath, 'dist', 'index.d.ts')
    let declarationFileContent = await fsPromises.readFile(declarationFilePath, 'utf-8')

    const declareModuleStatement = `declare module '${name}';`
    declarationFileContent += declareModuleStatement
    await fsPromises.writeFile(declarationFilePath, declarationFileContent, 'utf-8')

    console.log(`Declaration file updated successfully for ${workspacePath}`)
  } catch (error) {
    console.error('Error updating declaration file:', error.message)
  }
}

const workspaces = [
  'basic-grid',
  'core',
  'daily-grid',
  'group-grid',
  'list',
  'month-grid',
  'react',
  'utils',
  'weekly-grid'
]

for (let i = 0; i < workspaces.length; i++) {
  const workspace = workspaces[i]
  const workspacePath = path.join(process.cwd(), 'packages', workspace)
  updateDeclarationFile(workspacePath)
}
