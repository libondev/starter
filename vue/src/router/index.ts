// @ts-expect-error ignore not found declarations file.
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes: RouteRecordRaw[]) => routes
})

export default router
