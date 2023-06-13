import { fileURLToPath, URL } from 'node:url'

import unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unimport from 'unimport/unplugin'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import routerPages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router', 'date-fns']
  },

  esbuild: {
    target: 'esnext'
  },

  plugins: [
    unocss(),
    routerPages({
      dirs: ['src/views'],
      extensions: ['vue'],
      routeBlockLang: 'yaml',
      exclude: ['**/components/**/*']
    }),
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    components({
      dts: './shims/components.d.ts'
      // globs: ['src/components/**/index.{vue,tsx,ts}']
    }),
    unimport.vite({
      dts: './shims/unimport.d.ts',
      dirs: ['./src/composables/**/*'],
      presets: ['vue', 'pinia', 'vue-router', '@vueuse/core']
      // imports: [
      //   { name: 'useRoute', from: 'vue-router/auto' }
      // ]
    })

  ]
})
