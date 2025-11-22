import type { ThemeMode } from '../utils'
import { useEffect, useState } from 'react'
import * as theme from '../utils'

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('system')
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList | null>(null)

  // 初始化主题
  useEffect(() => {
    try {
      // 获取存储的主题或使用系统主题
      const storedTheme = theme.getStoredTheme()
      setCurrentTheme(storedTheme)
      theme.applyTheme(storedTheme)

      // 如果是系统主题，设置监听器
      if (storedTheme === 'system') {
        const query = window.matchMedia('(prefers-color-scheme: dark)')
        setMediaQuery(query)
      }
    } catch (error) {
      console.error('Theme initialization failed:', error)
    }
  }, [])

  // 处理系统主题变化
  useEffect(() => {
    if (!mediaQuery) {
      return
    }

    const handleChange = () => {
      if (currentTheme === 'system') {
        theme.applyTheme('system')
      }
    }

    // 添加监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    } else {
      // 兼容旧浏览器
      mediaQuery.addListener(handleChange)
      return () => {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [mediaQuery, currentTheme])

  // 切换主题
  const changeTheme = (newTheme: ThemeMode) => {
    setCurrentTheme(newTheme)
    theme.storeTheme(newTheme)
    theme.applyTheme(newTheme)

    // 如果是系统主题，添加监听器
    if (newTheme === 'system' && !mediaQuery) {
      const query = window.matchMedia('(prefers-color-scheme: dark)')
      setMediaQuery(query)
    } else if (newTheme !== 'system' && mediaQuery) {
    // 如果不是系统主题，移除监听器
      setMediaQuery(null)
    }
  }

  return {
    currentTheme,
    changeTheme,
  }
}
