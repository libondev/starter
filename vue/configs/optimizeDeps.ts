import type { UserConfig } from 'vite'

const include = ['pinia', 'vue-router', 'nprogress', '@vueuse/core', '@arco-design/web-vue']

const exclude = ['vue-demi']

export function optimizeDepsConfig(): UserConfig['optimizeDeps'] {
  return {
    include,
    exclude,
  }
}
