<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <PConfigProvider class="h-full">
    <AppHeader title="electron" />

    <main class="app-main border-t">
      <RouterView />
    </main>
  </PConfigProvider>
</template>
