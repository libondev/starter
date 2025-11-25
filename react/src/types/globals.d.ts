/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/react" />

export { }

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  export type { FC, FormEvent } from 'react'
}
