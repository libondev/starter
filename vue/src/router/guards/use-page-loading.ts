import { useLoadingBar } from 'pxd'
import type { Router } from 'vue-router'

export function usePageLoading(router: Router) {
  router.beforeEach(() => {
    useLoadingBar.start()
  })

  router.afterEach(() => {
    useLoadingBar.finish()
  })
}
