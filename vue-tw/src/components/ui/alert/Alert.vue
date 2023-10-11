<script setup lang="ts">
interface Props {
  variant?: keyof typeof VARIANTS
}

withDefaults(
  defineProps<Props>(),
  {
    variant: 'default',
  },
)

const VARIANTS = {
  default: 'bg-background text-foreground',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
}
</script>

<template>
  <div
    class="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground"
    :class="VARIANTS[variant]"
  >
    <slot />
  </div>
</template>
