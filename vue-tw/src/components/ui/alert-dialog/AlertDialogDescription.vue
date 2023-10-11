<script setup lang="ts">
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'radix-vue'

const props = defineProps<AlertDialogDescriptionProps>()
</script>

<template>
  <AlertDialogDescription
    class="text-muted-foreground text-sm"
    :as-child="props.asChild"
  >
    <slot />
  </AlertDialogDescription>
</template>
