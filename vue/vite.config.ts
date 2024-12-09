import { fileURLToPath, URL } from 'node:url'

import TW from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import JSX from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
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
    include: ['vue', 'pinia', 'vue-router', 'lodash-es', 'nprogress', 'date-fns', 'axios', '@vueuse/core'],
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
      resolvers: [
        // 图标自动导入(依赖或者本地)
        IconsResolver({
          // 如果图标组比较长可以设置得简短点
          alias: {},
          customCollections: ['local'],
        }),
      ],
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

    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        local: FileSystemIconLoader('./src/icons'),
      },
      // 仅修改自定义svg图标
      // transform(svg, _collection, _icon) {
      //   return svg
      // },
      // 修改所有修改图标的属性
      iconCustomizer(_collection, _icon, props) {
        props.class ??= 'svg-icon'
      },
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
