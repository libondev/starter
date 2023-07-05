import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import replace from '@rollup/plugin-replace'

export default defineConfig(({ mode }) => {
  return {
    build: {
      minify: true,
      outDir: './dist',
      target: 'modules',
      lib: {
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: '[name]'
      },
      rollupOptions: {
        external: [],
        output: {
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      }
    },
    plugins: [
      mode === 'production' && dts({
        staticImport: true,
        entryRoot: './src',
        outputDir: './dist'
      }),
      replace({
        preventAssignment: true,
        __DEV__: mode === 'development'
      })
    ]
  }
})
