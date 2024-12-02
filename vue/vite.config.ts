import { fileURLToPath, URL } from 'node:url'

import TW from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import JSX from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// z-lazy-show/v-show.lazy
import { transformLazyShow } from 'v-lazy-show'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

const extensions = ['vue', 'tsx']

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',

  build: {
    cssMinify: 'lightningcss',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/lodash')) {
            return 'lodash'
          }

          if (
            id.includes('node_modules/vue') ||
            id.includes('node_modules/pinia')
          ) {
            return 'vue'
          }

          if (id.includes('node_modules/')) {
            return 'vendors'
          }

          return 'chunk'
        },
      },
    },
  },

  css: {
    devSourcemap: true,
  },

  esbuild: {
    target: 'esnext',
    // 在生产环境下去掉 console/debugger
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },

  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router', 'lodash-es', 'nprogress', 'data-fns', 'axios', '@vueuse/core'],
    exclude: ['vue-demi'],
  },

  plugins: [
    TW(),

    JSX(),

    Vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
      template: {
        compilerOptions: {
          nodeTransforms: [
            transformLazyShow,
          ],
        },
      },
    }),

    AutoImport({
      dirs: [
        './src/composables/**',
      ],
      imports: [
        'vue',
        'vue-router',
      ],
      resolvers: [],
      dts: './shims/auto-imports.d.ts',
      // include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    }),

    Components({
      dts: './shims/components.d.ts',
      extensions,
      resolvers: [],
      // globs: ['src/components/**/index.{vue,tsx,ts}']
    }),

    Pages({
      dirs: 'src/views',
      routeBlockLang: 'yaml',
      extensions,
      exclude: [
        '**/*/components/**/*',
        '**/*/composables/**/*',
        '**/*/styles/**/*',
        '**/*/utils/**/*',
      ],
    }),

    Layouts({
      defaultLayout: 'default',
      extensions,
      layoutsDirs: 'src/layouts',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // server: {
  //   open: true,
  //   proxy: {
  //     '/api': {
  //       changeOrigin: true,
  //       target: 'http://localhost:3000',
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
}))
