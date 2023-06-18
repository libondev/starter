import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from '~react-pages'

import './styles/index'

export default function App () {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}
