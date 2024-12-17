<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'radix-vue'
import { DashIcon } from 'gdsi/vue'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <DashIcon />
    </slot>
  </primitive>
</template>
