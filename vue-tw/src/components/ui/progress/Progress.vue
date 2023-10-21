<script setup lang="ts">
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: string }>(),
  {
    class: '',
    modelValue: 0,
  },
)
</script>

<template>
  <ProgressRoot
    class="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
    v-bind="props"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
