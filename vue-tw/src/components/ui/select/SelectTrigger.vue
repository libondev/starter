<script setup lang="ts">
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'radix-vue'

const props = defineProps<SelectTriggerProps & { invalid?: boolean }>()
</script>

<template>
  <SelectTrigger
    v-bind="props"
    class="flex h-8 w-full items-center justify-between rounded-md border border-input focus:border-primary bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    :class="props.invalid && '!ring-destructive ring-2 placeholder:!text-destructive'"
  >
    <slot />
    <SelectIcon as-child>
      <i class="i-solar-alt-arrow-down-linear opacity-50 ml-1.5" />
    </SelectIcon>
  </SelectTrigger>
</template>
