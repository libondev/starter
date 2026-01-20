import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { useHeadTitle } from './guards/use-head-title.ts'
import { usePageLoading } from './guards/use-page-loading.ts'
// import { useUserAuth } from './guards/use-user-auth.ts'
import { useViewTransition } from './guards/use-view-transition.ts'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: setupLayouts(routes),
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

// useUserAuth(router)
useHeadTitle(router)
usePageLoading(router)
useViewTransition(router)

export default router
