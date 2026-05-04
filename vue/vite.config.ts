import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import GdsiResolver from '@gdsicon/vue/resolver'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Tailwind from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import JSX from '@vitejs/plugin-vue-jsx'
import PxdResolver from 'pxd/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { transformLazyShow } from 'v-lazy-show'
import Layouts from 'vite-plugin-vue-meta-layouts'
import { defineConfig } from 'vite-plus'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'

const __dirname = fileURLToPath(new URL('./', import.meta.url))

const iconCollections = {
  'local-heart': FileSystemIconLoader('./src/icons/heart'),
}

const extensions = ['vue', 'tsx']

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    reportCompressedSize: false,
    rolldownOptions: {
      onLog(level, log, defaultHandler) {
        console.log({ log, level })
        if (log.code === 'SOURCEMAP_ERROR' && log.message?.includes('outside its package')) {
          return
        }

        defaultHandler(level, log)
      },
      output: {
        codeSplitting: {
          groups: [
            {
              test: /[\\/]node_modules[\\/](vue|pinia|vue-router)[\\/]/,
              name: 'vue',
            },
            {
              test: /~icons|[\\/]node_modules[\\/]@gdsicon[\\/]/,
              name: 'icons',
            },
            {
              test: /[\\/]node_modules[\\/]es-toolkit[\\/]/,
              name: 'utils',
            },
            {
              test: /[\\/]node_modules[\\/]pxd[\\/]/,
              name: 'ui',
            },
            {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
            },
            {
              test: /locales[\\/].*\.yaml/,
              name: 'intl',
            },
          ],
        },
      },
    },
  },

  plugins: [
    Layouts({
      target: 'src/layouts',
      defaultLayout: 'default',
      skipTopLevelRouteLayout: true,
      excludes: ['/components/**/*'],
    }),

    AutoImport({
      dirs: ['./src/composables/**'],
      imports: ['vue', 'vue-i18n', VueRouterAutoImports],
      dts: './src/types/auto-imports.d.ts',
    }),

    Components({
      dts: './src/types/components.d.ts',
      extensions,
      resolvers: [
        IconsResolver({
          alias: {},
          customCollections: Object.keys(iconCollections),
        }),
        GdsiResolver({ prefix: 'IGds' }),
        PxdResolver(),
      ],
    }),

    Icons({
      scale: 1,
      compiler: 'vue3',
      autoInstall: true,
      defaultClass: 'inline-block svg-icon',
      customCollections: iconCollections,
    }),

    VueI18n({
      runtimeOnly: true,
      fullInstall: false,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/*.yaml')],
    }),

    // router must be before vue
    VueRouter({
      routesFolder: [
        {
          path: '',
          src: 'src/views',
        },
      ],
      routeBlockLang: 'yaml',
      dts: 'src/types/typed-router.d.ts',
      extensions: extensions.map((ext) => `.${ext}`),
      exclude: [
        '**/*/apis/**/*',
        '**/*/components/**/*',
        '**/*/composables/**/*',
        '**/*/styles/**/*',
        '**/*/utils/**/*',
      ],
      pathParser: {
        // `users.[id]` -> `users/:id`
        dotNesting: true,
      },
    }),

    Tailwind(),

    JSX(),

    Vue({
      template: {
        compilerOptions: {
          nodeTransforms: [transformLazyShow],
        },
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    open: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3000',
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },

  fmt: {
    ignorePatterns: ['dist/', 'node_modules/', '*.md'],
    semi: false,
    tabWidth: 2,
    endOfLine: 'lf',
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    insertFinalNewline: true,
    sortImports: {
      sortSideEffects: true,
      newlinesBetween: true,
    },
    sortPackageJson: true,
    sortTailwindcss: {
      preserveDuplicates: false,
      preserveWhitespace: false,
      functions: ['clsx', 'cn', 'cva', 'tw', 'twMerge'],
      stylesheet: './src/styles/tailwind.css',
    },
  },

  lint: {
    ignorePatterns: ['dist/', 'node_modules/', '*.md'],
    jsPlugins: ['eslint-plugin-better-tailwindcss'],
    rules: {
      curly: 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error',
      'better-tailwindcss/enforce-consistent-variable-syntax': ['error', { syntax: 'shorthand' }],
      'better-tailwindcss/enforce-consistent-important-position': [
        'error',
        { position: 'recommended' },
      ],
    },
    plugins: ['oxc', 'eslint', 'import', 'vitest', 'promise', 'unicorn', 'typescript'],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/tailwind.css',
      },
    },
  },

  staged: {
    '*': 'vp check --fix',
  },
})
