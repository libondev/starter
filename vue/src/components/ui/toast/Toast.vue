<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = defineProps<ToasterProps>()

const TOAST_OPTIONS = {
  classes: {
    toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
    description: 'group-[.toast]:text-muted-foreground',
    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
  },
}
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="TOAST_OPTIONS"
  />
</template>
