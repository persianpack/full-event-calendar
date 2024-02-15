import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  //@ts-ignore
  plugins: [solid()],
  build: {
    outDir:'./dist',
    lib: {
      entry: './main.css',
     name:'main'
    },
    emptyOutDir:false,
    cssCodeSplit:true
  }
})
