export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeOption {
  value: ThemeMode
  label: string
  icon: JSX.Element
}
