import TailwindCSS from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export const resolveAlias = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
}

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

    Icons({
      autoInstall: true,
      compiler: 'jsx',
      customCollections: {
        local: FileSystemIconLoader('./src/icons'),
      },
      defaultClass: 'block svg-icon',
      // defaultStyle: '',
      jsx: 'react',
      // 修改所有修改图标的属性
      // iconCustomizer(_collection, _icon, props) {
      //   props.width ??= '1em'
      //   props.height ??= '1em'
      // },
      scale: 1,
      // 仅修改自定义svg图标
      // transform(svg, _collection, _icon) {
      //   return svg
      // },
    }),
  ],

  resolve: {
    alias: resolveAlias,
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
