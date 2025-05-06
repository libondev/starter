import type { UserConfig } from 'vite'

export function serverConfig(): UserConfig['server'] {
  return {
    open: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3000',
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  }
}
