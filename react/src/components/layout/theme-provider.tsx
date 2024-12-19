import { theme as antdTheme, ConfigProvider } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'auto'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (_theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'auto',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  storageKey = 'fe.system.color-mode',
  ...props
}: ThemeProviderProps) {
  const isPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || isPrefersDark ? 'dark' : 'light',
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('dark', 'light')

    if (theme === 'dark' || (theme === 'auto' && isPrefersDark)) {
      root.classList.add('dark')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const provideValue = useMemo(() => ({
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [theme])

  const algorithm = theme === 'dark' || (theme === 'auto' && isPrefersDark)
    ? antdTheme.darkAlgorithm
    : antdTheme.defaultAlgorithm

  return (
    <ThemeProviderContext.Provider {...props} value={provideValue}>
      <ConfigProvider theme={{ algorithm }}>
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
