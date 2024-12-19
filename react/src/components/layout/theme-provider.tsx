import { createContext, useContext, useEffect, useState } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'

type Theme = 'dark' | 'light' | 'auto'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'auto',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'auto',
  storageKey = 'fe.system.color-mode',
  ...props
}: ThemeProviderProps) {
  const isPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('auto', 'dark', 'light')

    if (theme === 'auto') {
      const systemTheme = isPrefersDark
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const provideValue = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  const algorithm = theme === 'dark' || (theme === 'auto' && isPrefersDark)
    ? antdTheme.darkAlgorithm
    : antdTheme.defaultAlgorithm

  return (
    <ThemeProviderContext.Provider { ...props } value={ provideValue }>
      <ConfigProvider theme={ { algorithm } }>
        { children }
      </ConfigProvider>
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
