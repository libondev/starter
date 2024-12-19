import { MoonIcon, SunIcon } from 'gdsi/react'

import { Button, Dropdown } from 'antd'

import { useTheme } from '@/components/layout/theme-provider'

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  const items = [
    {
      key: 'auto',
      label: 'System',
      onClick: () => setTheme('auto'),
    },
    {
      key: 'dark',
      label: 'Dark',
      onClick: () => setTheme('dark'),
    },
    {
      key: 'light',
      label: 'Light',
      onClick: () => setTheme('light'),
    },
  ]

  return (
    <Dropdown menu={ { items: items } }>
      <Button
        className={ className }
        icon={
          <>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </>
        }
      />
    </Dropdown>

  )
}
