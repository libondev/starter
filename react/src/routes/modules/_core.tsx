import type { RouteObject } from 'react-router'

import { lazy } from 'react'

export const coreRoutes: RouteObject[] = [
  {
    Component: lazy(() => import('@/components/data-status/impl/not-found')),
    path: '*',
  },
]
