<script setup lang="ts">
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'
import { VARIANTS } from '../button/index'

const props = defineProps<AlertDialogActionProps>()
</script>

<template>
  <AlertDialogAction
    v-bind="props"
    class="inline-flex items-center justify-center rounded-md text-[0.875rem] font-medium select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    :class="VARIANTS.default"
  >
    <slot />
  </AlertDialogAction>
</template>
