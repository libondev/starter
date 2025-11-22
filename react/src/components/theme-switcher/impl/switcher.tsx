import type { ThemeOption } from '../types'
import { Dropdown } from '@douyinfe/semi-ui-19'
import {
  DeviceAlternateIcon,
  MoonIcon,
  SunIcon,
} from '@gdsicon/react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeSwitcher() {
  const { currentTheme, changeTheme } = useTheme()

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: 'Light',
      icon: <SunIcon />,
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: <MoonIcon />,
    },
    {
      value: 'system',
      label: 'System',
      icon: <DeviceAlternateIcon />,
    },
  ]

  // 获取当前选中项
  const currentOption = themeOptions.find(option => option.value === currentTheme)

  return (
    <Dropdown
      trigger="click"
      clickToHide
      stopPropagation
      render={(
        <Dropdown.Menu>
          {themeOptions.map(option => (
            <Dropdown.Item
              key={option.value}
              onClick={() => changeTheme(option.value)}
              className="space-x-1"
            >
              {option.icon}
              <span className="hidden sm:inline">{option.label}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    >
      <button type="button" className="semi-button semi-button-primary semi-button-light" aria-label="Theme switcher">
        {currentOption?.icon}
        <span className="hidden sm:inline ml-1">{currentOption?.label}</span>
      </button>
    </Dropdown>
  )
}
