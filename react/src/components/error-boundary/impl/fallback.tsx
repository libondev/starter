import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'

interface ErrorFallbackProps {
  error: Error
  showReset?: boolean
  resetError: () => void
}

export default function ErrorFallback({ error, showReset = true, resetError }: ErrorFallbackProps) {
  return (
    <main className="h-full space-y-4 p-4">
      <h2 className="text-2xl font-bold">Whoops! Something went wrong.</h2>
      <p>We're sorry but an unexpected error occurred. Please try again later.</p>

      {import.meta.env.DEV && (
        <details className="mt-4 w-full max-w-2xl text-left">
          <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            Error Details
          </summary>
          <pre className="mt-2 overflow-auto rounded-md bg-gray-100 p-4 text-xs dark:bg-gray-800">
            <code>{error.message}</code>
            {error.stack && (
              <>
                {'\n\n'}
                <code>{error.stack}</code>
              </>
            )}
          </pre>
        </details>
      )}

      <div className="mt-4 flex items-center gap-2">
        {showReset && (
          <Button intent="primary" onClick={resetError}>
            重试
          </Button>
        )}

        <Link href="/">返回首页</Link>
      </div>
    </main>
  )
}
