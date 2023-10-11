<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'radix-vue'

defineProps<SelectLabelProps>()
</script>

<template>
  <SelectLabel class="py-1.5 pl-8 pr-2 text-sm font-medium">
    <slot />
  </SelectLabel>
</template>
