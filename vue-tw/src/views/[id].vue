<script lang="ts" setup>
const { params } = useRoute('/[id]')
</script>

<template>
  <div>{{ params.id }}</div>
</template>
