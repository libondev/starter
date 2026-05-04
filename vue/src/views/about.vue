<script setup lang="ts">
import { useCounterStore } from '../stores/counter.ts'

const route = useRoute('/about')

const counterStore = useCounterStore()
</script>

<template>
  <div class="about mx-auto flex gap-4 flex-col min-h-screen w-50 items-center justify-center">
    <h1>This is an about page: {{ route.query.name }}</h1>

    <p class="text-lg">
      {{ counterStore.count }}
    </p>

    <PButton @click="counterStore.increment">Increment</PButton>
  </div>
</template>

<route>
{
  "meta": {
    "title": "About page"
  }
}
</route>
