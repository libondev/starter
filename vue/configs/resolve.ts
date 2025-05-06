import type { UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export function resolveConfig(): UserConfig['resolve'] {
  return {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    },
  }
}
