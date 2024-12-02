import type { Router } from 'vue-router'
import { name } from '@/../package.json'

export function useHeadTitle(router: Router) {
  router.beforeEach((to, _, next) => {
    let title = to.meta.title as string || ''

    title &&= `${title} - `

    document.title = title + name
    next()
  })
}
