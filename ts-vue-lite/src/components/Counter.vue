<template>
  <div>
    {{ count }}

    <button @click="count++">+</button>
  </div>
</template>

<script lang="ts" setup>
const count = ref(0)
</script>
