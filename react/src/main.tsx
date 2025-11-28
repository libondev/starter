import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

import { ThemeProvider } from '@/components/theme-switcher'
import { router } from '@/routes/index'

import './styles'

createRoot(document.getElementById('app') as HTMLElement).render(
  <ThemeProvider>
    <StrictMode>
      <RouterProvider router={ router } />
    </StrictMode>
  </ThemeProvider>
)
