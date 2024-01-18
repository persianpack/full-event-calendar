import { defineConfig } from 'tsup'

export default defineConfig({
  globalName: 'FullEventCalendar',
  entry: ['src/components/FullEventCalendar.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true
})
