import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import dts from 'vite-plugin-dts'
export default defineConfig({
  plugins: [dts(), solid()],
  build: {
    lib: {
      entry: './src/Calendar.tsx',
      name: 'Calendar',
      fileName: 'Calendar'
    }
  }
})
