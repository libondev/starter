<script setup lang="ts">
import { AlertDialogCancel, type AlertDialogCancelProps } from 'radix-vue'
import { VARIANTS } from '../button/index'

const props = defineProps<AlertDialogCancelProps>()
</script>

<template>
  <AlertDialogCancel
    v-bind="props"
    class="inline-flex items-center justify-center rounded-md text-[0.875rem] font-medium select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-2 sm:mt-0"
    :class="VARIANTS.outline"
  >
    <slot />
  </AlertDialogCancel>
</template>
