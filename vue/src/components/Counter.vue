<template>
  <div class="h-full flex items-center justify-center text-center">
    <div>
      <p> {{ count }} </p>

      <button class="px-4 py-1 bg-#fff rounded b-1 cursor-pointer active:bg-#ccc" @click="accretion">Plus</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { accretion, count } = useCounter()
</script>
