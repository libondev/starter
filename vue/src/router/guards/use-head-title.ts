import type { Router } from 'vue-router'

import { i18n } from '@/app/i18n'

export function useHeadTitle(router: Router) {
  const websiteName = import.meta.env.VITE_WEBSITE_NAME

  router.afterEach((to) => {
    let title = to.meta.title ? i18n.global.t(to.meta.title as string) : ''

    title &&= `${title} - `

    document.title = title + websiteName
  })
}
