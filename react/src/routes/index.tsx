import type { RouteObject } from 'react-router-dom'

import { coreRoutes } from './modules/_core'
import { basicRoutes } from './modules/basic'

export const routes: RouteObject[] = [
  ...basicRoutes,
  ...coreRoutes,
]
