<script setup lang="ts">
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
} from 'radix-vue'

const props = defineProps<RadioGroupItemProps>()
</script>

<template>
  <RadioGroupItem
    v-bind="props"
    class="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  >
    <RadioGroupIndicator class="flex items-center justify-center i-carbon-check text-3.5" />
  </RadioGroupItem>
</template>
