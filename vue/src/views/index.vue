<script lang="ts" setup>
defineOptions({
  name: 'Counter'
})
</script>

<template>
  <div class="h-full flex-col-center">
    <Computer />

    <router-link to="/about" class="mt-4 text-14px">
      <i class="i-carbon-arrow-right text-$cp" />
      Jump to Detail
    </router-link>
  </div>
</template>
