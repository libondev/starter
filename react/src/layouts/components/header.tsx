import { LogoReactIcon } from '@gdsicon/react'

import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between p-2 text-2xl font-medium">
      <h1 className="flex items-center text-xl">
        <LogoReactIcon className="mr-2 text-lg" />

        <span>React Counter!</span>
      </h1>

      <ThemeSwitcher />
    </header>
  )
}
