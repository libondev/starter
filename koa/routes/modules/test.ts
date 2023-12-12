import type Router from 'koa-router'

export function useTestRouter(this: Router) {
  this.get('/network', (ctx) => {
    ctx.body = {
      code: 200,
      data: Date.now(),
    }
  })
}
