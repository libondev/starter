import { Button } from 'antd'

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

      { import.meta.env.DEV && (
        <details className="mt-4 max-w-2xl w-full text-left">
          <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            Error Details
          </summary>
          <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto text-xs">
            <code>{ error.message }</code>
            { error.stack && (
              <>
                { '\n\n' }
                <code>{ error.stack }</code>
              </>
            ) }
          </pre>
        </details>
      ) }

      <div className="flex items-center gap-2 mt-4">
        { showReset && (
          <Button type="primary" onClick={ resetError }>
            重试
          </Button>
        ) }

        <Button type="link" href="/">
          返回首页
        </Button>
      </div>
    </main>
  )
}
