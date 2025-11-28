import { ThemeProviderContext, type ThemeProviderState } from '../impl/provider'
import { useContext } from 'react'

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
