import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import dts from 'vite-plugin-dts'
export default defineConfig({
  plugins: [solid(),    dts({
 
    outDir: [
      'dist'
   
    ],
          // include: ['src/index.ts'],
          exclude: ['src/ignore'],
          // aliasesExclude: [/^@components/],
          staticImport: true,
          rollupTypes: true,
          insertTypesEntry: true
  }),],
  build: {
    lib: {
      entry: './src/Calendar.tsx',
      name: 'Calendar',
      fileName: 'Calendar',
      formats: ['es']
    }
  }
})
