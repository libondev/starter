import { createBrowserRouter } from 'react-router'

import { coreRoutes } from './modules/_core'
import { basicRoutes } from './modules/basic'

export const router = createBrowserRouter([...basicRoutes, ...coreRoutes])
