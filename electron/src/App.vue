<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader title="Pilot" />

  <main class="app-main border-t">
    <RouterView />
  </main>
</template>
