<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'radix-vue'

const props = defineProps<DialogTitleProps>()
</script>

<template>
  <DialogTitle
    v-bind="props"
    class="text-lg text-foreground font-medium leading-none tracking-tight"
  >
    <slot />
  </DialogTitle>
</template>
