<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <input
    v-model="modelValue"
    type="text"
    :name="$attrs.name as string"
    class="inline-flex h-8 w-full rounded-md border border-input disabled:bg-secondary focus:border-primary bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  >
</template>
