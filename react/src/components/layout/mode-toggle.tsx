import { useTheme } from '@/components/layout/theme-provider'

import { Button } from 'antd'

import { MoonIcon, SunIcon } from 'gdsi/react'

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      className={className}
      icon={(
        <>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />

  )
}
