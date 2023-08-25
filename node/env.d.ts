
export { }

declare global {
  export const __DEV__: boolean
  export type Nullable<T> = {
    [P in keyof T]: T[P] | null
  }
}
