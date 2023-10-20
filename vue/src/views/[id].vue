<script lang="ts" setup>
const route = useRoute('/[id]')
</script>

<template>
  <div class="h-full flex-col-center">
    <h1 class="text-center">
      route.params.id: {{ route.params.id }}
    </h1>

    <router-link to="/" class="mt-4 text-14px">
      <i class="i-carbon-arrow-right text-$cp" />
      Back to Home
    </router-link>
  </div>
</template>
