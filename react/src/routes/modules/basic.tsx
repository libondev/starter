import type { RouteObject } from 'react-router'

import { lazy } from 'react'

export const basicRoutes: RouteObject[] = [
  {
    Component: lazy(() => import('@/layouts/default')),
    children: [
      {
        Component: lazy(() => import('@/pages/index')),
        index: true,
      },
      {
        Component: lazy(() => import('@/pages/about')),
        path: 'about',
      },
    ],
    path: '/',
  },
]
