import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import router from 'unplugin-vue-router/vite'
import autoImport from 'unplugin-auto-import/vite'
import pageLayouts from 'vite-plugin-vue-layouts'
import components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',

  build: {
    cssMinify: 'lightningcss',
    // 是否输出 gzip 压缩大小的报告，设置 false 可以提高构建速度
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vueuse: ['@vueuse/core'],
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
    include: ['vue', 'pinia', 'vue-router', 'axios', 'radix-vue', 'ts-pattern'],
  },

  plugins: [
    router({
      extensions: ['.vue', '.tsx'],
      routeBlockLang: 'yaml',
      routesFolder: 'src/views',
      dts: './shims/typed-router.d.ts',
      exclude: [
        '**/*/components/**/*',
        '**/*/composables/**/*',
        '**/*/styles/**/*',
        '**/*/utils/**/*',
      ],

    }),

    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),

    vueJsx(),

    components({
      extensions: ['vue', 'tsx'],
      dts: './shims/components.d.ts',
      // globs: ['src/components/**/index.{vue,tsx,ts}']
    }),

    pageLayouts({
      extensions: ['vue', 'tsx'],
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),

    autoImport({
      dts: './shims/auto-imports.d.ts',
      dirs: [
        './src/composables/**',
      ],
      imports: [
        'vue',

        {
          // 'unplugin-vue-router/runtime': [['_definePage', 'definePage']],
          'vue-router/auto': ['useLink', 'useRoute', 'useRouter', 'defineLoader', 'onBeforeRouteUpdate', 'onBeforeRouteLeave'],
        },
      ],
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