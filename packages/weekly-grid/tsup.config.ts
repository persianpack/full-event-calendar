import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'
import * as preset from 'tsup-preset-solid'

const preset_options: preset.PresetOptions = {
  // array or single object
  entries: [
    {
      entry: 'src/index.ts'
    }
  ],

  // Set to `true` to remove all `console.*` calls and `debugger` statements in prod builds
  // drop_console: true,
  cjs: true,
  esbuild_plugins: [sassPlugin()]
}

export default defineConfig((config) => {
  const watching = !!config.watch

  const parsed_data = preset.parsePresetOptions(preset_options, watching)

  if (!watching) {
    const package_fields = preset.generatePackageExports(parsed_data)

    // console.log(`\npackage.json: \n${JSON.stringify(package_fields, null, 2)}\n\n`)

    /*
          will update ./pa ckage.json with the correct export fields
      */
    // preset.writePackageJson(package_fields)
  }

  return preset.generateTsupOptions(parsed_data)
})

// export default defineConfig({
//   format: ['cjs', 'esm'],
//   //@ts-ignore
//   esbuildPlugins: [sassPlugin()]
// })
