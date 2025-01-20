/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-meta-layouts/client" />

export { }

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      finished: Promise<void>
      updateCallbackDone: Promise<void>
      ready: Promise<void>
    }
  }

  interface MatcherResult<Value, Input = unknown> {
    input: Input
    state: {
      matched: boolean
      value: Value
    }
  }
}
