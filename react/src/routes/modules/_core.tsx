import type { RouteObject } from 'react-router-dom'
import { NotFound } from '@/components/data-status/not-found'

export const coreRoutes: RouteObject[] = [
  {
    path: '*',
    element: <NotFound />,
  }
]
