import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import routes from '~react-pages'

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider>
        {useRoutes(routes)}
      </ThemeProvider>
    </Suspense>
  )
}
