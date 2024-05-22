<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'radix-vue'
import { Toggle, useEmitAsProps } from 'radix-vue'
import { computed } from 'vue'
import { SIZES, VARIANTS } from './index'

interface Props extends ToggleProps {
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
}
const props = withDefaults(
  defineProps<Props>(),
  {
    variant: 'default',
    size: 'default',
  },
)
const emits = defineEmits<ToggleEmits>()

const toggleProps = computed(() => {
  const { variant, size, ...otherProps } = props
  return otherProps
})
</script>

<template>
  <Toggle
    v-bind="{ ...toggleProps, ...useEmitAsProps(emits) }"
    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
    :class="[VARIANTS[variant], SIZES[size]]"
  >
    <slot />
  </Toggle>
</template>
