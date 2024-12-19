import { ThemeProvider } from '@/components/layout/theme-provider'
import { Suspense } from 'react'

import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider>
        { useRoutes(routes) }
      </ThemeProvider>
    </Suspense>
  )
}
