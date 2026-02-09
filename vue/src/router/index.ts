import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { useHeadTitle } from './guards/use-head-title.ts'
import { usePageLoading } from './guards/use-page-loading.ts'
import { useViewTransition } from './guards/use-view-transition.ts'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

useHeadTitle(router)
usePageLoading(router)
useViewTransition(router)
