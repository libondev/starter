<script lang="ts" setup>
import MoonIcon from 'gdsi/vue/moon'
import SunIcon from 'gdsi/vue/sun'
import { customRef } from 'vue'

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
  const storageKey = 'fe.system.color-mode'
  const { documentElement: root, body } = document
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
      <Transition name="fade" mode="out-in">
        <Component :is="colorModes[colorMode].render" />
      </Transition>
    </template>
  </AButton>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: rotate(45deg) scale(0.68);
}
</style>
