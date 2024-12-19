<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { DeviceAlternateIcon, MoonIcon, SunIcon } from 'gdsi/vue'

const colorModes = {
  auto: {
    render: DeviceAlternateIcon,
    transition: 'dark',
  },
  dark: {
    render: MoonIcon,
    transition: 'light',
  },
  light: {
    render: SunIcon,
    transition: 'auto',
  },
} as const

type ColorMode = keyof typeof colorModes

const isPrefersDark = useMediaQuery('(prefers-color-scheme: dark)')

const colorMode = customRef<ColorMode>((track, trigger) => {
  const root = document.documentElement
  const storageKey = 'fe.system.color-mode'
  let curMode = localStorage.getItem(storageKey) as ColorMode || 'auto'

  return {
    get() {
      track()
      return curMode
    },
    set(newMode) {
      if (newMode === curMode)
        return

      const newAppliedMode = getAppliedMode(newMode, isPrefersDark.value)

      root.classList.remove(curMode)
      root.classList.add(newAppliedMode)

      localStorage.setItem(storageKey, newMode)
      curMode = newMode

      trigger()
    },
  }
})

function getAppliedMode(mode: ColorMode, isDark: boolean) {
  return mode === 'auto' ? (isDark ? 'dark' : 'light') : mode
}

function toggleColorMode() {
  colorMode.value = colorModes[colorMode.value].transition
}
</script>

<template>
  <PButton variant="outline" @click="toggleColorMode()">
    <Component :is="colorModes[colorMode].render" />
  </PButton>
</template>
