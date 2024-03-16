<script setup lang="ts">
import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useEmitAsProps } from 'radix-vue'

const props = defineProps<RadioGroupRootProps>()
const emits = defineEmits<RadioGroupRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <RadioGroupRoot class="grid gap-2" v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </RadioGroupRoot>
</template>
