import unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import routerPages from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vueuse: ['vueuse'],
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  },

  css: {
    devSourcemap: true
  },

  esbuild: {
    target: 'esnext',
    drop: ['console', 'debugger']
  },

  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router', 'date-fns']
  },

  plugins: [
    unocss(),
    vueJsx(),
    // https://github.com/posva/unplugin-vue-router#named-routes
    routerPages({
      extensions: ['.vue'],
      routeBlockLang: 'yaml',
      routesFolder: 'src/views',
      dts: './shims/routes.d.ts',
      exclude: ['**/components/**/*']
    }),

    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    components({
      dts: './shims/components.d.ts'
      // globs: ['src/components/**/index.{vue,tsx,ts}']
    }),
    autoImport({
      dts: './shims/autoImports.d.ts',
      dirs: ['./src/composables/**/*'],
      imports: [
        'vue',
        'pinia',
        '@vueuse/core',
        VueRouterAutoImports,
        // { 'vue-router/auto': ['useLink'] },
      ]
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
  // }
})
