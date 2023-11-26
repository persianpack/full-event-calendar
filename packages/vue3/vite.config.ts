import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import solid from 'vite-plugin-solid'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore'
  plugins: [vue()],
  resolve: {
    alias: {
      '@full-event-calendar/basic-grid':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/daily-grid/node_modules/@full-event-calendar/basic-grid/dist/index.js',
      '@full-event-calendar/daily-grid':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/daily-grid/dist/index.js',

      '@full-event-css-core':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/core/dist/index.css',
      '@full-event-css-basic':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/daily-grid/node_modules/@full-event-calendar/basic-grid/dist/index.css',
      '@full-event-css-daily':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/daily-grid/dist/index.css',
      '@full-event-css-month':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/month-grid/dist/index.css',

      '@full-event-calendar/core':
        'C:/Users/AMIRKIANADL/Desktop/projects/calendar-view/packages/vue3/node_modules/@full-event-calendar/core/dist/index.js'
    }
  }
})
