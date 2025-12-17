import { MoonIcon, SunIcon } from '@gdsicon/react'

import { Button } from '@/components/ui/button'
import { useTheme } from './provider'

interface Props {
  appearance?: 'ghost' | 'outline'
}

export function ThemeSwitcher({ appearance = 'ghost' }: Props) {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant={appearance}
      size="icon"
      aria-label="Switch theme"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <SunIcon className="transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 h-[1.2rem] w-[1.2rem]" />
      <MoonIcon className="absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}
