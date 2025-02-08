import type { UserConfig } from 'vite'

const i18nPathRegex = /locales\/.*\.yaml/

export const buildConfig: UserConfig['build'] = {
  cssMinify: 'lightningcss',
  reportCompressedSize: false,
  rollupOptions: {
    output: {
      manualChunks(id: string) {
        if (
          id.includes('node_modules/lodash')
        ) {
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

        if (
          id.includes('@arco-design')
        ) {
          return 'ui'
        }

        if (
          id.includes('node_modules/')
        ) {
          return 'vendors'
        }

        if (i18nPathRegex.test(id)) {
          return 'intl'
        }

        return 'chunk'
      },
    },
  },
}
