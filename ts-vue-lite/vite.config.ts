import { fileURLToPath, URL } from 'node:url'

import presetUno from '@unocss/preset-mini'
import unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unimport from 'unimport/unplugin'
import components from 'unplugin-vue-components/vite'
import router from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
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
      dirs: ['./src/composables/**/*'],
      imports: [
        { name: 'useRoute', from: 'vue-router/auto' },
        { name: 'useRouter', from: 'vue-router/auto' }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
