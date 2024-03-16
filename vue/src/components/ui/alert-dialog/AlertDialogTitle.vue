<script setup lang="ts">
import { AlertDialogTitle, type AlertDialogTitleProps } from 'radix-vue'

const props = defineProps<AlertDialogTitleProps>()
</script>

<template>
  <AlertDialogTitle
    :as-child="props.asChild"
    class="text-lg text-foreground font-medium"
  >
    <slot />
  </AlertDialogTitle>
</template>
