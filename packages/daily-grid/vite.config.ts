import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  //@ts-ignore
  plugins: [solid()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'index',
      fileName: 'index'
    }
  }
})
