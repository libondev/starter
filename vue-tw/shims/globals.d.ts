/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare global {
  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      finished: Promise<void>
      updateCallbackDone: Promise<void>
      ready: Promise<void>
    }
  }
}
