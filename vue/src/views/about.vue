<script setup lang="ts">

const route = useRoute('/about')
</script>

<template>
  <div class="about mx-auto flex min-h-screen w-50 items-center justify-center">
    <h1>This is an about page: {{ route.query.name }}</h1>
  </div>
</template>

<route>
  meta:
    title: About page
</route>
