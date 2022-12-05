import { URL, fileURLToPath } from 'node:url'

import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import presetUno from '@unocss/preset-mini'
import router from 'unplugin-vue-router/vite'
import unimport from 'unimport/unplugin'
import unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    unocss({
      presets: [
        presetUno()
      ]
    }),
    components({
      dts: './shims/components.d.ts'
    }),
    router({
      dts: './shims/routers.d.ts',
      routesFolder: ['src/views']
    }),
    unimport.vite({
      dts: './shims/unimport.d.ts',
      presets: ['vue', 'pinia'],
      dirs: ['./src/composables/**/*']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
