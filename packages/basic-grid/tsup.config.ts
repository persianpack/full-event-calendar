import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig({
  format: ['cjs', 'esm'],
  clean: true,
  //@ts-ignore
  esbuildPlugins: [sassPlugin()]
})
