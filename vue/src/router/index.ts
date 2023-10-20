import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'

import { useViewTransition } from './view-transition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    return setupLayouts(routes)
  }
})

useViewTransition(router)

export default router
