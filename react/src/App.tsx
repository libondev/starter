import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import Header from '@/components/Header'
import routes from '~react-pages'

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      {useRoutes(routes)}
    </Suspense>
  )
}
