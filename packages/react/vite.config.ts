import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
      // '@full-event-calendar/utils': path.join(
      //   __dirname,
      //   '/node_modules/@full-event-calendar/core/node_modules/@full-event-calendar/utils/dist/index.js'
      // ),

      '@full-event-css-core': path.join(__dirname, '/node_modules/@full-event-calendar/core/dist/index.css'),
      '@full-event-css-basic': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/daily-grid/node_modules/@full-event-calendar/basic-grid/dist/index.css'
      ),
      '@full-event-css-daily': path.join(__dirname, '/node_modules/@full-event-calendar/daily-grid/dist/index.css'),
      '@full-event-css-month': path.join(__dirname, '/node_modules/@full-event-calendar/month-grid/dist/index.css'),
      '@full-event-css-week': path.join(__dirname, '/node_modules/@full-event-calendar/weekly-grid/dist/index.css'),
      // '@full-event-calendar/core': path.join(__dirname, '/node_modules/@full-event-calendar/core/dist/index.js'),
      '@full-event-calendar/weekly-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/weekly-grid/dist/index.js'
      ),
      '@full-event-calendar/month-grid': path.join(
        __dirname,
        '/node_modules/@full-event-calendar/month-grid/dist/index.js'
      )
    }
  },
})
