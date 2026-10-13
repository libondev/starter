import GdsiResolver from '@gdsicon/vue/resolver'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import PxdResolver from 'pxd/resolver'
import { FileSystemHMRIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { electronSimple } from 'vite-plugin-electron/multi-env'
import { notBundle } from 'vite-plugin-electron/plugin'
import { defineConfig, lazyPlugins } from 'vite-plus'
import VueRouter from 'vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe

  const ignorePatterns = ['dist', 'dist-electron', 'release', 'node_modules', '.vscode', '*.md']

  return {
    staged: {
      '*.{js,ts,tsx,vue,html,css}': 'vp check --fix',
    },
    fmt: {
      semi: false,
      tabWidth: 2,
      endOfLine: 'lf',
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: true,
      insertFinalNewline: true,
      sortImports: {
        sortSideEffects: true,
        internalPattern: ['~/', '@/', '#/'],
        newlinesBetween: false,
        groups: [
          ['type-import', 'type-internal', 'type-parent', 'type-sibling', 'type-index'],
          ['value-builtin', 'value-external'],
          'value-internal',
          ['value-parent', 'value-sibling', 'value-index'],
          'unknown',
        ],
      },
      sortPackageJson: true,
      ignorePatterns,
    },
    lint: {
      jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
      rules: {
        curly: 'error',
        'vite-plus/prefer-vite-plus-imports': 'error',
      },
      plugins: ['oxc', 'eslint', 'import', 'promise', 'unicorn', 'typescript', 'vue'],
      ignorePatterns,
      env: { builtin: true },
      options: { typeAware: true, typeCheck: true },
    },
    plugins: lazyPlugins(() => [
      VueRouter({
        dts: 'src/types/typed-router.d.ts',
      }),
      Vue(),
      Tailwindcss(),
      Components({
        resolvers: [
          IconsResolver({ customCollections: ['window-controls'] }),
          PxdResolver(),
          GdsiResolver({ prefix: 'IGds' }),
        ],
        dts: 'src/types/components.d.ts',
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          ...FileSystemHMRIconLoader('src/icons/window-controls', 'window-controls'),
          // ...FileSystemHMRIconLoader('src/icons', 'app')
        },
      }),
      electronSimple({
        main: {
          input: 'electron/main/index.ts',
          plugins: [notBundle()],
          options: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              // Empty per build instead of a config-time rmSync: vp lint/fmt load this config too
              emptyOutDir: true,
            },
          },
        },
        preload: {
          input: 'electron/preload/index.ts',
          plugins: [notBundle()],
          options: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              emptyOutDir: true,
            },
          },
        },
        // Polyfill the Electron and Node.js API for Renderer process.
        // If you want to use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        // renderer: {},
      }),
    ]),
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            minShareCount: 3,
            groups: [{ name: 'vendor', test: /node_modules/ }],
          },
        },
      },
    },
    clearScreen: false,
  }
})
