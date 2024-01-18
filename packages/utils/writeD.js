import { promises as fsPromises } from 'fs';
import path from 'path';
async function updateDeclarationFile() {
  try {

    // Read package.json to get module name
    const packageJsonPath = path.resolve('./', 'package.json');
    const packageJsonContent = await fsPromises.readFile(packageJsonPath, 'utf-8');
    const { name } = JSON.parse(packageJsonContent);

    // Read the existing .d.ts file
    const declarationFilePath = path.resolve('./', 'dist', 'index.d.ts');
    let declarationFileContent = await fsPromises.readFile(declarationFilePath, 'utf-8');

    // Add declare module statement
    const declareModuleStatement = `declare module '${name}';`;
    declarationFileContent += declareModuleStatement;
    // Write back the updated content to the .d.ts file
    await fsPromises.writeFile(declarationFilePath, declarationFileContent, 'utf-8');

    console.log('Declaration file updated successfully.');
  } catch (error) {
      console.error('Error updating declaration file:', error.message);
  }
}

// Call the function to update the declaration file
updateDeclarationFile();