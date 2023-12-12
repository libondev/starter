import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'
import jsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import layouts from 'vite-plugin-vue-layouts'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
// z-lazy-show/v-show.lazy
import { transformLazyShow } from 'v-lazy-show'

// 代码体积分析
// import { visualizer } from 'rollup-plugin-visualizer'

// import tailwindcss from 'tailwindcss'
// import autoprefixer from 'autoprefixer'

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
    // 在生产环境下去掉 console/debugger
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },

  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router']
  },

  plugins: [
    unocss(),
    jsx(),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
      template: {
        compilerOptions: {
          nodeTransforms: [
            transformLazyShow
          ]
        }
      }
    }),

    // visualizer(),
    pages({
      dirs: 'src/views',
      routeBlockLang: 'yaml',
      extensions: ['vue', 'tsx'],
      exclude: [
        '**/*/components/**/*',
        '**/*/composables/**/*',
        '**/*/styles/**/*',
        '**/*/utils/**/*',
      ],
    }),

    layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
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
        'vue-router',
        '@vueuse/core',
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
}))
