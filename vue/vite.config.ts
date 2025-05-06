import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'

import {
  buildConfig,
  cssConfig,
  optimizeDepsConfig,
  pluginsConfig,
  resolveConfig,
  // serverConfig,
} from './configs/index.ts'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const {
    VITE_BASE_PATH,
  } = loadEnv(mode, process.cwd())

  return {
    base: VITE_BASE_PATH,

    build: buildConfig,

    css: cssConfig,

    esbuild: {
      target: 'esnext',
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    optimizeDeps: optimizeDepsConfig,

    plugins: pluginsConfig(command),

    resolve: resolveConfig,

    // server: serverConfig,
  }
})
