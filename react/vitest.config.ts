import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolveAlias } from './vite.config'

export default defineConfig({
  plugins: [react() as any],
  test: {
    globals: true,
    fileParallelism: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.ts',
    dir: './tests',
    pool: 'vmThreads',
    isolate: false,
    sequence: {
      shuffle: false,
    },
    deps: {
      optimizer: {
        web: {
          enabled: false,
        },
      },
    },
  },
  resolve: {
    alias: resolveAlias,
  },
})
