import type { UserConfig } from 'vite'

export const serverConfig: UserConfig['server'] = {
  open: true,
  proxy: {
    '/api': {
      changeOrigin: true,
      target: 'http://localhost:3000',
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
  },
}
