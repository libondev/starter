<template>
  <div class="about">
    <h1 class="text-center">route.params.id: {{ route.params.id }}</h1>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute('/[id]')
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
