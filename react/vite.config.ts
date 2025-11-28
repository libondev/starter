import { fileURLToPath, URL } from 'node:url'
import GdsiResolver from '@gdsicon/react/resolver'
import TailwindCSS from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: './',

  build: {
    // 是否输出 gzip 压缩大小的报告，设置 false 可以提高构建速度
    reportCompressedSize: false,
  },

  css: {
    devSourcemap: true,
  },

  optimizeDeps: {
    include: ['react', 'react-router', 'react-dom/client', 'use-immer'],
  },

  plugins: [
    TailwindCSS(),

    React({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [/\.[tj]sx?$/],
      dirs: ['./src/hooks/**/*'],
      dts: './types/imports.d.ts',
      imports: [
        'react',
        {
          clsx: [['default', 'cls']],
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
        GdsiResolver({ prefix: 'IGds' }),
      ],
    }),

    Icons({
      scale: 1,
      jsx: 'react',
      compiler: 'jsx',
      autoInstall: true,
      defaultClass: 'block svg-icon',
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
