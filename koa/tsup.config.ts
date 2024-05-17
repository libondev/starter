import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  target: 'esnext',
  entry: ['./src/main.ts'],
})
