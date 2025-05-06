
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
export default defineConfig((configEnv) => {
  const {
    VITE_BASE_PATH,
  } = loadEnv(configEnv.mode, process.cwd())

  return {
    base: VITE_BASE_PATH,

    build: buildConfig(),

    css: cssConfig(),

    esbuild: {
      target: 'esnext',
      drop: configEnv.mode === 'production' ? ['console', 'debugger'] : [],
    },

    optimizeDeps: optimizeDepsConfig(),

    plugins: pluginsConfig(configEnv),

    resolve: resolveConfig(),

    // server: serverConfig(),
  }
})
