// import analyze from 'rollup-plugin-visualizer'
import unocss from '@unocss/vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // https://github.com/unocss/unocss
    unocss(),
    // https://github.com/gxmari007/vite-plugin-eslint
    eslint(),
    // https://github.com/btd/rollup-plugin-visualizer
    // analyze(),
    // https://github.com/hannoeru/vite-plugin-pages#react-1
    pages({
      dirs: ['src/pages'],
      extensions: ['tsx'],
      exclude: ['**/components/**/*']
    }),
    // https://github.com/antfu/unplugin-auto-import
    autoImport({
      include: [/\.[tj]sx?$/],
      dirs: ['./src/hooks/**/*'],
      dts: './shims/imports.d.ts',
      imports: [
        'react',
        {
          'use-immer': ['useImmer', 'useImmerReducer'],
        }
      ],
      // resolvers: [
      //   IconsResolver({
      //     componentPrefix: 'Icon',
      //   }),
      // ],
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  esbuild: {
    target: 'esnext'
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'date-fns']
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-router-dom', 'react-dom']
          // 'ui-vendor': ['antd'],
        }
      }
    }
  }
})
