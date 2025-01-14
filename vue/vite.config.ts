import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import TW from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import JSX from '@vitejs/plugin-vue-jsx'
import GdsiResolver from 'gdsi/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
// z-lazy-show/v-show.lazy
import { transformLazyShow } from 'v-lazy-show'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const extensions = ['vue', 'tsx']

const autoImportIcons = {
  'local-heart': FileSystemIconLoader('./src/icons/heart'),
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_PATH,

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

            if (
              id.includes('~icons') ||
              id.includes('node_modules/gdsi')
            ) {
              return 'icons'
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
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    optimizeDeps: {
      include: ['vue', 'pinia', 'vue-router', 'lodash-es', 'nprogress', 'date-fns', 'axios', '@vueuse/core'],
      exclude: ['vue-demi'],
    },

    plugins: [
      // 路由插件必须在 Vue 前面
      VueRouter({
        routesFolder: [
          {
            path: '',
            src: 'src/views',
          },
        ],
        routeBlockLang: 'yaml',
        dts: 'src/types/typed-router.d.ts',
        extensions: extensions.map(ext => `.${ext}`),
        exclude: [
          '**/*/apis/**/*',
          '**/*/components/**/*',
          '**/*/composables/**/*',
          '**/*/styles/**/*',
          '**/*/utils/**/*',
        ],
        pathParser: {
          // `users.[id]` -> `users/:id`
          dotNesting: true,
        },
      }),

      TW(),

      JSX(),

      Vue({
        template: {
          compilerOptions: {
            nodeTransforms: [
              transformLazyShow,
            ],
          },
        },
      }),

      Layouts({
        defaultLayout: 'default',
        extensions,
        layoutsDirs: 'src/layouts',
      }),

      AutoImport({
        dirs: [
          './src/composables/**',
        ],
        imports: [
          'vue',
          'vue-i18n',
          VueRouterAutoImports,
        ],
        // resolvers: [],
        dts: './src/types/auto-imports.d.ts',
        // include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      }),

      Components({
        dts: './src/types/components.d.ts',
        extensions,
        resolvers: [
          // 图标自动导入(依赖或者本地)
          IconsResolver({
            // 如果图标组比较长可以设置得简短点
            alias: {},
            customCollections: Object.keys(autoImportIcons),
          }),
          GdsiResolver({ type: 'vue', prefix: 'IGds' }),
        ],
        // globs: ['src/components/**/index.{vue,tsx,ts}']
      }),

      Icons({
        scale: 1,
        compiler: 'vue3',
        autoInstall: true,
        defaultClass: 'inline-block svg-icon',
        // defaultStyle: '',
        customCollections: autoImportIcons,
        // 仅修改自定义svg图标
        // transform(svg, _collection, _icon) {
        //   return svg
        // },
      }),

      VueI18n({
        runtimeOnly: true,
        fullInstall: false,
        compositionOnly: true,
        defaultSFCLang: 'yaml',
        include: [resolve(__dirname, 'locales/*.yaml')],
      }),

      vitePluginForArco({
        style: 'css',
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
  }
})
