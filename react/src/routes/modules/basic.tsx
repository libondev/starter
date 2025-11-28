import type { RouteObject } from 'react-router'

import { lazy } from 'react'

export const basicRoutes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('@/layouts/default')),
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/index')),
      },
      {
        path: 'about',
        Component: lazy(() => import('@/pages/about')),
      },
    ],
  },
]
