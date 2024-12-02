import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHashHistory } from 'vue-router'

import { useHeadTitle } from './guards/use-head-title.ts'
// import { useUserAuth } from './guards/user-auth.ts'
import { useProgressBar } from './guards/use-progress-bar.ts'
import { useViewTransition } from './guards/use-view-transition.ts'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
})

// useUserAuth(router)
useHeadTitle(router)
useProgressBar(router)
useViewTransition(router)

export default router
