import { defineConfig } from 'tsup'

export default defineConfig({
  globalName: 'FullEventCalendar',
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true
})
