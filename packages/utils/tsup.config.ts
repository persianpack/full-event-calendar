import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  clean: true
  //@ts-ignore
  // esbuildPlugins: [sassPlugin()]
})
