import { fileURLToPath, URL } from 'node:url'

import presetUno from '@unocss/preset-mini'
import unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unimport from 'unimport/unplugin'
import components from 'unplugin-vue-components/vite'
import defineOptions from 'unplugin-vue-define-options'
import router from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  plugins: [
    defineOptions.vite(),
    vue(/* { reactivityTransform: true } */),
    vueJsx(),
    components({
      dts: './shims/components.d.ts'
    }),
    unocss({
      presets: [
        presetUno()
      ]
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

  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router']
  }
})
