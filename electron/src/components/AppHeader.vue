<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{ title: string }>()

const controls = window.electronAPI
const maximized = ref(false)

let unmounted = false
let unsubscribe: (() => void) | undefined

onMounted(async () => {
  maximized.value = await controls.isMaximized()

  if (unmounted) {
    return
  }

  unsubscribe = controls.onMaximizedChange((value) => {
    maximized.value = value
  })
})

onBeforeUnmount(() => {
  unmounted = true
  unsubscribe?.()
})
</script>

<template>
  <header
    class="app-header h-10 flex items-center ps-3 gap-2 select-none bg-background-200 border-b"
    @dblclick="controls.toggleMaximize()"
  >
    <span class="text-sm font-medium truncate flex-1 text-foreground">{{ title }}</span>

    <div class="app-header--actions flex h-full items-stretch" @dblclick.stop>
      <PThemeSwitcher shape="square" variant="ghost" />

      <PButton
        icon
        shape="square"
        variant="ghost"
        aria-label="Minimize"
        @click="controls.minimize()"
      >
        <i-window-controls-minimize class="size-4" />
      </PButton>

      <PButton
        icon
        shape="square"
        variant="ghost"
        :aria-label="maximized ? 'Restore' : 'Maximize'"
        @click="controls.toggleMaximize()"
      >
        <i-window-controls-restore v-if="maximized" class="size-3.5" />
        <i-window-controls-maximize v-else class="size-3.5" />
      </PButton>

      <PButton
        icon
        shape="square"
        variant="ghost"
        class="hover:bg-red-700 hover:text-white"
        aria-label="Close"
        @click="controls.close()"
      >
        <i-window-controls-close class="size-4" />
      </PButton>
    </div>
  </header>
</template>

<style>
.app-header {
  -webkit-app-region: drag;
}

.app-header--actions {
  -webkit-app-region: no-drag;
}
</style>
