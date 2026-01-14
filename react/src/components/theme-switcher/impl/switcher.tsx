import { MoonIcon, SunIcon } from '@gdsicon/react'

import { Button } from '@/components/ui/button'

import { useTheme } from './provider'

interface Props {
  className?: string
  appearance?: 'ghost' | 'outline'
}

export function ThemeSwitcher({ className, appearance = 'ghost' }: Props) {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant={appearance}
      className={className}
      size="icon"
      aria-label="Switch theme"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <SunIcon className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
