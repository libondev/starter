import type { Router } from 'vue-router'

export function useHeadTitle(router: Router) {
  const websiteName = import.meta.env.VITE_WEBSITE_NAME

  router.beforeEach((to, _, next) => {
    let title = (to.meta.title as string) || ''

    title &&= `${title} - `

    document.title = title + websiteName
    next()
  })
}
