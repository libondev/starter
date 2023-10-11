import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useViewTransition } from './plugins/view-transition'
import { useUserAuth } from './plugins/user-auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

useUserAuth(router)
useViewTransition(router)

export default router
