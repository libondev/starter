import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import routerPages from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import pageLayouts from 'vite-plugin-vue-layouts'

// 代码体积分析
// import { visualizer } from 'rollup-plugin-visualizer'

// import tailwindcss from 'tailwindcss'
// import autoprefixer from 'autoprefixer'

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
          vueuse: ['vueuse'],
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  },

  css: {
    devSourcemap: true,
    transformer: 'lightningcss'
    // https://main.vitejs.dev/config/shared-options.html#css-lightningcss
    // https://github.com/parcel-bundler/lightningcss/blob/master/node/index.d.ts
    // lightningcss: {},

    // postcss: {
    //   plugins: [tailwindcss, autoprefixer]
    // },

    // 预处理器选项, scss/less/stylus...
    // preprocessorOptions: {
    //   less: {
    //     additionalData: '@import "./src/styles/variables.less";',
    //     javascriptEnabled: true
    //   }
    // }
  },

  esbuild: {
    target: 'esnext',
    drop: ['console', 'debugger']
  },

  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router']
  },

  plugins: [
    unocss(),
    vueJsx(),

    pageLayouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),

    // visualizer(),
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
        VueRouterAutoImports
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
