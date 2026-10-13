/// <reference types="vite/client" />

// Required by Vite+'s type checker (tsgolint): it has no .vue support of its own
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  // expose in the `electron/preload/index.ts`
  electronAPI: {
    setTitleBarOverlay: (palette: { color: string; symbolColor: string }) => void
    onMainProcessMessage: (callback: (message: string) => void) => () => void
  }
}
