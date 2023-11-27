import { defineConfig } from 'tsup'

export default defineConfig({
  globalName: 'FullEventCalendat',
  entry: ['src/components/FullEventCalendat.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true
})
