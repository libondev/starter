import type { UserConfig } from 'vite'

export const buildConfig: UserConfig['build'] = {
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

        if (id.includes('@arco-design')) {
          return 'ui'
        }

        if (id.includes('node_modules/')) {
          return 'vendors'
        }

        return 'chunk'
      },
    },
  },
}
