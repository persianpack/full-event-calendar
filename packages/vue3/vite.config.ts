import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore'
  plugins: [vue()],
  base: '/full-event-calendar/'
})
