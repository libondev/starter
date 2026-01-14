import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import { resolveAlias } from './vite.config'

export default defineConfig({
  plugins: [react() as any],
  resolve: {
    alias: resolveAlias,
  },
  test: {
    deps: {
      optimizer: {
        web: {
          enabled: false,
        },
      },
    },
    dir: './tests',
    environment: 'happy-dom',
    fileParallelism: true,
    globals: true,
    isolate: false,
    pool: 'vmThreads',
    sequence: {
      shuffle: false,
    },
    setupFiles: './tests/setup.ts',
  },
})
