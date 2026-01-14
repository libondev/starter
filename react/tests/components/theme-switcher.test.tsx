import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'

import { ThemeProvider, ThemeSwitcher } from '../../src/components/theme-switcher'

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark', 'light')
  })

  it('should render the component correctly', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should support custom className', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher className="custom-class" />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('should switch theme when clicking the button', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    const initialTheme = localStorage.getItem('fe.system.color-mode') || 'auto'

    await user.click(button)

    const newTheme = localStorage.getItem('fe.system.color-mode')
    expect(newTheme).toBe(initialTheme === 'dark' ? 'light' : 'dark')
  })

  it('should save theme preference in localStorage', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    await user.click(button)

    const savedTheme = localStorage.getItem('fe.system.color-mode')
    expect(savedTheme).toBeTruthy()
    expect(['dark', 'light']).toContain(savedTheme)
  })

  it('should update document class based on theme', async () => {
    const user = userEvent.setup()

    localStorage.setItem('fe.system.color-mode', 'light')
    document.documentElement.classList.remove('dark', 'light')

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    await user.click(button)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('should read initial theme from localStorage', () => {
    localStorage.setItem('fe.system.color-mode', 'dark')

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    expect(localStorage.getItem('fe.system.color-mode')).toBe('dark')
  })

  it('should use default storageKey', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    await user.click(button)

    expect(localStorage.getItem('fe.system.color-mode')).toBeTruthy()
  })
})
