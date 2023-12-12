import Router from 'koa-router'
import fetch from 'node-fetch'

import { useTestRouter } from './modules/test'

export type RouterType = typeof router

const router = new Router()

const routes = [
  useTestRouter,
]

routes.forEach(route => route.call(router))

export default router
