import fs from 'fs-extra'
import path from 'path'
import process from 'process'
// Paths
const sourceFolder = path.join(process.cwd(), 'packages', 'vue3', 'dist') // replace with your source folder path
const destinationFolder = path.join(process.cwd(), 'docs', '.vitepress', 'dist') // replace with your destination folder path

// Copy the folder from source to destination
fs.copy(sourceFolder, destinationFolder)
  .then(() => {
    console.log('Folder copied successfully!')
    // Rename index.html to ex.html
    const oldPath = `${destinationFolder}/index.html`
    const newPath = `${destinationFolder}/ex.html`
    fs.rename(oldPath, newPath)
      .then(() => {
        console.log('File renamed successfully!')
      })
      .catch((err) => {
        console.error('Error renaming file:', err)
      })
  })
  .catch((err) => {
    console.error('Error copying folder:', err)
  })
