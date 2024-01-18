import { defineConfig } from 'tsup'
import * as preset from 'tsup-preset-solid'

const preset_options: preset.PresetOptions = {
  // array or single object
  entries: [
    {
      entry: 'src/index.ts'
    }
  ],
  // Set to `true` to remove all `console.*` calls and `debugger` statements in prod builds
  drop_console: false,
  cjs: true,
  
}

export default defineConfig((config) => {
  const watching = !!config.watch

  const parsed_data = preset.parsePresetOptions(preset_options, watching)


  // const ssss = preset.generateTsupOptions(parsed_data)[0]
  // ssss['dts'] = {
  //   banner: "sdasdasd"
  // }
  // console.log([ssss])
  return preset.generateTsupOptions(parsed_data)
})
