import { fileURLToPath, URL } from 'node:url'
import React from '@vitejs/plugin-react'
import GdsiResolver from 'gdsi/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

const ReactCompilerConfig = {
  target: '18',
  runtimeModule: 'react-compiler-runtime',
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',

  build: {
    // 是否输出 gzip 压缩大小的报告，设置 false 可以提高构建速度
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['antd'],
          react: ['react', 'react-dom', 'react-router-dom'],
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
    include: ['react', 'react-dom', 'react-router-dom', 'react-dom/client', 'use-immer', 'gdsi/react'],
  },

  plugins: [
    React({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', ReactCompilerConfig],
        ],
      },
    }),

    Pages({
      dirs: ['src/pages'],
      extensions: ['tsx'],
      exclude: ['**/components/**/*'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [/\.[tj]sx?$/],
      dirs: ['./src/hooks/**/*'],
      dts: './shims/imports.d.ts',
      imports: [
        'react',
        'react-router-dom',
        {
          'clsx': [['default', 'cls']],
          // react: ['createContext'],
          'use-immer': ['useImmer', 'useImmerReducer'],
        },
      ],
      resolvers: [
        IconsResolver({
          alias: {},
          extension: 'jsx',
          customCollections: ['local'],
        }),
        GdsiResolver({ type: 'react', prefix: 'IGds' }),
      ],
    }),

    Icons({
      scale: 1,
      jsx: 'react',
      compiler: 'jsx',
      autoInstall: true,
      defaultClass: 'inline-block svg-icon',
      // defaultStyle: '',
      customCollections: {
        local: FileSystemIconLoader('./src/icons'),
      },
      // 仅修改自定义svg图标
      // transform(svg, _collection, _icon) {
      //   return svg
      // },
      // 修改所有修改图标的属性
      // iconCustomizer(_collection, _icon, props) {
      //   props.width ??= '1em'
      //   props.height ??= '1em'
      // },
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
  // },
}))
