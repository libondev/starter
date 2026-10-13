<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

defineProps<{ title: string }>()

const controls = window.electronAPI
const canvas = document.createElement('canvas').getContext('2d')

const toHex = (cssColor: string) => {
  if (!canvas) {
    return cssColor
  }

  canvas.fillStyle = cssColor
  return canvas.fillStyle as string
}

const syncTitleBarOverlay = () => {
  const tokens = getComputedStyle(document.documentElement)
  controls.setTitleBarOverlay({
    color: toHex(tokens.getPropertyValue('--color-background-200')),
    symbolColor: toHex(tokens.getPropertyValue('--color-foreground')),
  })
}

let observer: MutationObserver | undefined

onMounted(() => {
  syncTitleBarOverlay()

  observer = new MutationObserver(syncTitleBarOverlay)
  observer.observe(document.documentElement, { attributeFilter: ['class'] })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <header class="app-header flex items-center ps-3 gap-2 select-none bg-background-200">
    <span class="text-sm font-medium truncate flex-1 text-foreground">{{ title }}</span>

    <div class="app-header--actions flex h-full items-stretch">
      <PThemeSwitcher shape="square" variant="ghost" />
    </div>
  </header>
</template>

<style>
.app-header {
  margin-inline-start: env(titlebar-area-x, 5rem);
  inline-size: env(titlebar-area-width, calc(100% - 5rem));
  block-size: env(titlebar-area-height, 2.5rem);
  -webkit-app-region: drag;
}

.app-header--actions {
  -webkit-app-region: no-drag;
}
</style>
