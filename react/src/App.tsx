import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from './components/theme-switcher'
import { routes } from './routes'
import { PageLoading } from './components/data-status/page-loading'

export default function App() {
  const element = useRoutes(routes)

  return (
    <Suspense fallback={ <PageLoading /> }>
      <ThemeProvider>
        { element }
      </ThemeProvider>
    </Suspense>
  )
}
