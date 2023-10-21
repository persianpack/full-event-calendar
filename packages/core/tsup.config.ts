import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig({
  format: ['cjs', 'esm'],
  //@ts-ignore
  esbuildPlugins: [sassPlugin()]
})
