export {}

declare global {
  interface Window {
    scheduler: {
      postTask: (
        callback: () => void,
        options?: {
          priority?: 'user-blocking' | 'user-visible' | 'background'
          delay?: number
          signal?: AbortSignal
        },
      ) => Promise<void>
    }
    requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  }

  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      finished: Promise<void>
      updateCallbackDone: Promise<void>
      ready: Promise<void>
    }
  }
}
