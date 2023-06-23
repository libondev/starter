import { routes } from 'vue-router/auto/routes'
import { createRouter, createWebHistory } from 'vue-router/auto'

import { useViewTransition } from './view-transition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

useViewTransition(router)

export default router
