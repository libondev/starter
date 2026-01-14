import { Outlet } from 'react-router'

import { ErrorBoundary, ErrorFallback } from '@/components/error-boundary'

import LayoutHeader from './components/header'

export default function DefaultsLayout() {
  const fallbackRender = (error: Error, resetError: () => void) => {
    return <ErrorFallback error={error} resetError={resetError} />
  }

  return (
    <div className="defaults-layout h-full">
      <LayoutHeader />

      <ErrorBoundary fallback={fallbackRender}>
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}
