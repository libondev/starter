<script setup lang="ts">
import { Label, type LabelProps } from 'radix-vue'

const props = defineProps<LabelProps>()
</script>

<template>
  <Label
    v-bind="props"
    class="block text-sm tracking-tight font-medium text-foreground text-left"
  >
    <slot />
  </Label>
</template>
