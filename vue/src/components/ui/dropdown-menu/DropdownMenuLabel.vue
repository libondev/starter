<script setup lang="ts">
import { DropdownMenuLabel, type DropdownMenuLabelProps } from 'radix-vue'

const props = defineProps<DropdownMenuLabelProps & {
  inset?: boolean
  class?: string
}>()
</script>

<template>
  <DropdownMenuLabel
    v-bind="props"
    class="px-2 py-1.5 text-sm font-medium"
    :class="[inset && 'pl-8', props.class]"
  >
    <slot />
  </DropdownMenuLabel>
</template>
