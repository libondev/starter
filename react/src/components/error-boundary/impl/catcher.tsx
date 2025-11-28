import { Component, type ReactNode, type ErrorInfo } from 'react'
import ErrorFallback from './fallback'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, resetError: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showReset?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * React Error Boundary
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logErrorToService(error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    console.log(error, {
      componentStack: errorInfo.componentStack ?? undefined,
      errorInfo: JSON.stringify(errorInfo, null, 2),
    })
  }

  private resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError)
      }

      return (
        <ErrorFallback
          error={this.state.error}
          resetError={this.resetError}
          showReset={this.props.showReset}
        />
      )
    }

    return this.props.children
  }
}
