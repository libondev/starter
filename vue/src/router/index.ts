import routes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

import { useViewTransition } from './view-transition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

useViewTransition(router)

export default router
