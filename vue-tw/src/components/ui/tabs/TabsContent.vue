<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'radix-vue'

const props = defineProps<TabsContentProps>()
</script>

<template>
  <TabsContent
    class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>
