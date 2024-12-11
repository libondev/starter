<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

// 如果用户没有设置过主题选项(包含第一次进入系统)，那么就使用系统的明暗主题设置
const isDark = useDark({ storageKey: `fe.system.color-mode` })
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="outline" @click="toggleDark()">
    <ISolarSunBold v-if="isDark" />
    <ISolarMoonBold v-else />
  </Button>
</template>
