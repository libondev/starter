import { fileURLToPath, URL } from 'node:url'

import unocss from '@unocss/vite'
import react from '@vitejs/plugin-react-swc'
import unimport from 'unimport/unplugin'
import { defineConfig } from 'vite'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  esbuild: {
    target: 'esnext',
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'date-fns'],
  },

  plugins: [
    unocss(),

    react(),

    // https://github.com/hannoeru/vite-plugin-pages#react-1
    pages({
      dirs: ['src/pages'],
      extensions: ['tsx'],
      exclude: ['**/components/**/*'],
    }),

    // https://github.com/unjs/unimport
    unimport.vite({
      dts: './shims/unimport.d.ts',
      dirs: ['./src/hooks/**/*'],
      presets: ['react'],
      // imports: [
      //   { name: 'useRoute', from: 'vue-router/auto' }
      // ]
    }),
  ],
})
