import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  //@ts-ignore'
  plugins: [vue()],
  resolve: {
    alias: {
      '@full-event-calendar/basic-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/daily-grid/node_modules/@full-event-calendar/basic-grid/dist/index.js'
      ),
      '@full-event-calendar/daily-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/daily-grid/dist/index.js'
      ),

      '@full-event-calendar/group-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/weekly-grid/node_modules/@full-event-calendar/group-grid/dist/index.js'
      ),

      '@full-event-css-core': path.join(__dirname, '/node_modules/@full-event-calendar/core/dist/index.css'),
      '@full-event-css-basic': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/daily-grid/node_modules/@full-event-calendar/basic-grid/dist/index.css'
      ),
      '@full-event-css-daily': path.join(__dirname, '/node_modules/@full-event-calendar/daily-grid/dist/index.css'),
      '@full-event-css-month': path.join(__dirname, '/node_modules/@full-event-calendar/month-grid/dist/index.css'),
      '@full-event-css-week': path.join(__dirname, '/node_modules/@full-event-calendar/weekly-grid/dist/index.css'),
      '@full-event-calendar/core': path.join(__dirname, '/node_modules/@full-event-calendar/core/dist/index.js'),
      '@full-event-calendar/weekly-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/weekly-grid/dist/index.js'
      ),
      '@full-event-calendar/month-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/month-grid/dist/index.js'
      )
    }
  }
})
