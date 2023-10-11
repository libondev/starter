<script setup lang="ts">
import { SIZES, VARIANTS } from './index'

withDefaults(
  defineProps<{
    variant?: keyof typeof VARIANTS
    size?: keyof typeof SIZES
    loading?: boolean | number | string
    disabled?: boolean | number | string
  }>(),
  {
    variant: 'default',
    size: 'default',
    loading: false,
  },
)
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-md text-[0.875rem] font-medium select-none focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    :class="[VARIANTS[variant], SIZES[size]]"
    :disabled="Boolean(loading || disabled)"
  >
    <i v-if="loading" class="i-solar-refresh-broken animate-loading mr-1.5" />
    <slot />
  </button>
</template>

<style scoped>
@keyframes rotate-loading {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(-1turn)
  }
}

.animate-loading {
  font-size: 1.275em;
  animation: rotate-loading 1s infinite
}
</style>
