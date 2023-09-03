/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

export { }

interface ModeSwitcher<T> {
  readonly value: T
  toggle: () => void
}

declare global {
  interface Window {
    colorMode: ModeSwitcher<'system' | 'light' | 'dark'>
  }

  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      finished: Promise<void>
      updateCallbackDone: Promise<void>
      ready: Promise<void>
    }
  }
}
