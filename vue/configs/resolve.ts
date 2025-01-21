import type { UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export const resolveConfig: UserConfig['resolve'] = {
  alias: {
    '@': fileURLToPath(new URL('../src', import.meta.url)),
  },
}
