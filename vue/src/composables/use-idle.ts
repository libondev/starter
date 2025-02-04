type Cleanup = () => void
type Callback = (...rest: any) => void

export const useIdle = (() => {
  if ('scheduler' in window) {
    return (fn: Callback): Cleanup => {
      const controller = new AbortController()
      window.scheduler.postTask(fn, {
        priority: 'background',
        signal: controller.signal,
      })

      return () => void controller.abort()
    }
  } else if ('requestIdleCallback' in window) {
    return (fn: Callback): Cleanup => {
      const cancelId = requestIdleCallback(fn)
      return () => cancelIdleCallback(cancelId)
    }
  }

  return (fn: Callback): Cleanup => {
    const timeoutId = setTimeout(fn, 0)
    return () => clearTimeout(timeoutId)
  }
})()
