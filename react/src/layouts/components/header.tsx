import { LogoReactIcon } from '@gdsicon/react'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Header() {
  return (
    <header className="font-medium flex items-center justify-between w-full text-2xl py-2 px-2">
      <h1 className="flex items-center text-xl">
        <LogoReactIcon className="mr-2 text-lg" />

        <span>React Counter!</span>
      </h1>

      <ThemeSwitcher />
    </header>
  )
}
