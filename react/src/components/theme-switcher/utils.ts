// 类型定义已移动到 components/theme-switcher/types.ts
// 定义主题模式类型
export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'fe.system.color-mode'
const THEME_ATTRIBUTE = 'theme-mode'

// 获取系统主题
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// 获取实际应用的主题（考虑 system 模式）
export function getAppliedTheme(theme?: ThemeMode): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme()
  }

  return theme || 'light'
}

// 应用主题到 body
export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') {
    return
  }

  const appliedTheme = getAppliedTheme(theme)
  document.body.setAttribute(THEME_ATTRIBUTE, appliedTheme)
}

// 从 localStorage 获取存储的主题模式
export function getStoredTheme(): ThemeMode {
  if (typeof localStorage === 'undefined') {
    return 'system'
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode
    return ['light', 'dark', 'system'].includes(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

// 保存主题模式到 localStorage
export function storeTheme(theme: ThemeMode): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // 忽略错误
  }
}

// 初始化主题（应用存储的主题或系统主题）
export function initializeTheme(): ThemeMode {
  const storedTheme = getStoredTheme()
  applyTheme(storedTheme)
  return storedTheme
}
