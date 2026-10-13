<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader title="Electron" />

  <main class="app-main">
    <RouterView />
  </main>
</template>
