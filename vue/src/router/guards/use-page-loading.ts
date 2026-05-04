import { useLoadingBar } from 'pxd'
import type { Router } from 'vue-router'

export function usePageLoading(router: Router) {
  router.beforeEach((_, __, next) => {
    useLoadingBar.start()
    next()
  })

  router.afterEach(() => {
    useLoadingBar.finish()
  })
}
