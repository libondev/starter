<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from 'radix-vue'

const props = defineProps<TabsTriggerProps>()
</script>

<template>
  <TabsTrigger
    v-bind="props"
    class="inline-flex items-center justify-center whitespace-nowrap rounded-md select-none px-3 py-1 text-sm font-medium ring-offset-background hover:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
  >
    <slot />
  </TabsTrigger>
</template>
