import process from 'node:process'
import { defineConfig, type Options } from 'tsup'

import { version } from './package.json'

const DEFAULT_OPTIONS: Options = {
  entry: [],
  clean: true,
  outDir: './dist',
  splitting: false,
  sourcemap: false,
  format: [],
  target: 'esnext',
  platform: 'browser',
  treeshake: true,
  dts: true,
  minify: false,
  env: {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    VERSION: version,
  },
  external: [],
}

export default defineConfig([
  {
    ...DEFAULT_OPTIONS,
    format: ['esm', 'cjs'],
    entry: ['./src/index.ts'],
  },
  {
    ...DEFAULT_OPTIONS,
    format: ['iife'],
    outDir: './dist',
    minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
    globalName: 'MyLib',
    entry: ['./src/index.ts'],
  },
])
