import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import process from 'process'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  await build({
    // root: path.resolve(process.c, './project'),
    base: '/foo/',
    build: {
      lib: {
        entry: [
          'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/basic-grid/src/lib/basicGrid.scss',
          'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/core/src/lib/App.scss'
        ],

        name: 'calendar'
        // ...
      }
    }
  })
})()
