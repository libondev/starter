import { createElement, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

export const basicRoutes: RouteObject[] = [
  {
    path: '/',
    element: createElement(lazy(() => import('@/pages/index'))),
  },
  {
    path: '/about',
    element: createElement(lazy(() => import('@/pages/about'))),
  },
]
