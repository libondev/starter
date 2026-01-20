import type { UserConfig } from 'vite'

const include = ['pinia', 'vue-router', '@vueuse/core']

const exclude = ['vue-demi']

export function optimizeDepsConfig(): UserConfig['optimizeDeps'] {
  return {
    include,
    exclude,
  }
}
