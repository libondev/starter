<script lang="ts" setup>
import { MoonIcon, SunIcon } from 'gdsi/vue'

const colorModes = {
  dark: {
    render: MoonIcon,
    transition: 'light',
  },
  light: {
    render: SunIcon,
    transition: 'dark',
  },
} as const

type ColorMode = keyof typeof colorModes

const colorMode = customRef<ColorMode>((track, trigger) => {
  const root = document.documentElement
  const body = document.body
  const storageKey = 'fe.system.color-mode'
  let curMode: ColorMode = root.classList.contains('dark') ? 'dark' : 'light'

  return {
    get() {
      track()
      return curMode
    },
    set(newMode) {
      if (newMode === curMode)
        return

      root.classList.remove(curMode)
      root.classList.add(newMode)

      if (newMode === 'dark') {
        body.setAttribute('arco-theme', 'dark')
      } else {
        body.removeAttribute('arco-theme')
      }

      localStorage.setItem(storageKey, newMode)
      curMode = newMode

      trigger()
    },
  }
})

function toggleColorMode() {
  colorMode.value = colorModes[colorMode.value].transition
}
</script>

<template>
  <AButton variant="outline" @click="toggleColorMode()">
    <template #icon>
      <Component :is="colorModes[colorMode].render" />
    </template>
  </AButton>
</template>
