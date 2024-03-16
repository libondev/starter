<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue'

const props = defineProps<TabsListProps>()
</script>

<template>
  <TabsList
    v-bind="props"
    class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
  >
    <slot />
  </TabsList>
</template>
