import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

// import { useUserAuth } from './plugins/user-auth'
import { useViewTransition } from './guards/use-view-transition'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
})

// useUserAuth(router)
useViewTransition(router)

export default router
