
import {
  MoonIcon,
  SunIcon,
} from '@gdsicon/react'
import { useTheme } from '../hooks/use-theme'

import { Button } from 'antd'

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      className={className}
      icon={(
        <>
          <SunIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />

  )
}
