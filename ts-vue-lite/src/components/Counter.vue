<template>
  <div class="h-full flex items-center justify-center text-center">
    <div>
      <p> {{ count }} </p>

      <button @click="accretion">Plus</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { accretion, count } = useCounter()
</script>
