import { MoonIcon, SunIcon } from '@gdsicon/react'
import useTheme from '../hooks/use-theme'

import { Button } from 'antd'

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      className={className}
      type="text"
      icon={
        <>
          <SunIcon className="absolute top-1/2 left-1/2 -translate-1/2 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute top-1/2 left-1/2 -translate-1/2 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </>
      }
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  )
}
