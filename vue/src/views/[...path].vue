<script lang="ts" setup>
const { params } = useRoute()
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center font-sans">
    <h1 class="p-6 text-[max(48px,min(5vw,76px))] font-medium tracking-tighter">
      404 Not Found
    </h1>

    <p class="text-[max(15px,min(2vw,20px))] leading-8 tracking-tight">
      The page you visited is: {{ params.path }}
    </p>
  </div>
</template>
