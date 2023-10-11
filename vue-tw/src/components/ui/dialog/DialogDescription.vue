<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'

const props = defineProps<DialogDescriptionProps>()
</script>

<template>
  <DialogDescription
    v-bind="props"
    class="text-muted-foreground text-sm"
  >
    <slot />
  </DialogDescription>
</template>
