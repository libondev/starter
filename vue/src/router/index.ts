import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHashHistory } from 'vue-router'

import { useHeadTitle } from './guards/use-head-title.ts'
import { useProgressBar } from './guards/use-progress-bar.ts'
// import { useUserAuth } from './guards/use-user-auth.ts'
import { useViewTransition } from './guards/use-view-transition.ts'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: setupLayouts(generatedRoutes),
})

// useUserAuth(router)
useHeadTitle(router)
useProgressBar(router)
useViewTransition(router)

export default router
