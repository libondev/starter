<script setup lang="ts">
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
} from 'radix-vue'

const props = defineProps<DropdownMenuSubTriggerProps>()
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="props"
    class="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent"
  >
    <slot />
    <i class="i-carbon-chevron-right ml-auto text-4" />
  </DropdownMenuSubTrigger>
</template>
