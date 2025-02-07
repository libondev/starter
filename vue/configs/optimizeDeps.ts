import type { UserConfig } from 'vite'

const include = [
  'vue',
  'pinia',
  'vue-router',
  'lodash-es',
  'nprogress',
  'date-fns',
  'axios',
  '@vueuse/core',
  '@arco-design/web-vue',
]

const exclude = [
  'vue-demi',
]

export const optimizeDepsConfig: UserConfig['optimizeDeps'] = {
  include,
  exclude,
}
