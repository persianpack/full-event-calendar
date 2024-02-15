import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'
import * as preset from 'tsup-preset-solid'

const preset_options: preset.PresetOptions = {
  entries: [
    {
      entry: 'src/index.ts'
    }
  ],
  drop_console: true,
  cjs: true,
  esbuild_plugins: [sassPlugin()]
}

export default defineConfig((config) => {
  const watching = !!config.watch
  const parsed_data = preset.parsePresetOptions(preset_options, watching)
  return preset.generateTsupOptions(parsed_data)
})

