import type { Router } from 'vue-router'
import { useLoadingBar } from 'pxd'

export function usePageLoading(router: Router) {
  router.beforeEach((_, __, next) => {
    useLoadingBar.start()
    next()
  })

  router.afterEach(() => {
    useLoadingBar.finish()
  })
}
