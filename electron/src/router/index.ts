import { useViewTransition } from 'pxd/composables'
import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

useViewTransition(router)

if (import.meta.hot) {
  handleHotUpdate(router)
}
