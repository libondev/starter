// import analyze from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  build: {
    cssMinify: 'lightningcss',
    // 是否输出 gzip 压缩大小的报告，设置 false 可以提高构建速度
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
          // 'ui-vendor': ['antd'],
        }
      }
    }
  },

  css: {
    devSourcemap: true,
    transformer: 'lightningcss'
    // https://main.vitejs.dev/config/shared-options.html#css-lightningcss
    // https://github.com/parcel-bundler/lightningcss/blob/master/node/index.d.ts
    // lightningcss: {}
  },

  esbuild: {
    target: 'esnext',
    drop: ['console', 'debugger']
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'use-immer']
  },

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
        'react-router-dom',
        {
          clsx: [['default', 'cls']],
          // react: ['createContext'],
          'use-immer': ['useImmer', 'useImmerReducer']
        }
      ]
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
  }

  // server: {
  //   open: true,
  //   proxy: {
  //     '/api': {
  //       changeOrigin: true,
  //       target: 'http://localhost:3000',
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
})
