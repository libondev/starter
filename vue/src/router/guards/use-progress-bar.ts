import type { Router } from 'vue-router'
import ProgressBar from 'nprogress'
import '@/styles/progress.css'

export function useProgressBar(router: Router) {
  router.beforeEach((_, __, next) => {
    ProgressBar.start()
    next()
  })

  router.afterEach(() => {
    ProgressBar.done()
  })
}
