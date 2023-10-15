import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

import { useUserAuth } from './plugins/user-auth'
import { useViewTransition } from './plugins/view-transition'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

useUserAuth(router)
useViewTransition(router)

export default router
