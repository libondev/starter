<script lang="ts" setup>
import { useToggle } from '@vueuse/core'

const isDark = customRef((track, trigger) => {
  let _dark = document.documentElement.classList.contains('dark')

  return {
    get() {
      track()
      return _dark
    },
    set(value) {
      _dark = value
      document.documentElement.classList.toggle('dark', value)
      localStorage.setItem('fe.system.color-mode', value ? 'dark' : 'auto')

      trigger()
    },
  }
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="outline" @click="toggleDark()">
    <ISolarSunBold v-if="isDark" />
    <ISolarMoonBold v-else />
  </Button>
</template>
