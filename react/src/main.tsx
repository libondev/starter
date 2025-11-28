import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { ThemeProvider } from '@/components/theme-switcher'
import { PageLoading } from '@/components/data-status/page-loading'

import { router } from './routes/index'

import './styles'

createRoot(document.getElementById('app') as HTMLElement).render(
  <Suspense fallback={<PageLoading />}>
    <ThemeProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </ThemeProvider>
  </Suspense>,
)
