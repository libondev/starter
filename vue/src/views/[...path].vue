<script lang="ts" setup>
// 调用 useRoute 时传入 path 以获取类型提示
const { params } = useRoute('/[...path]')
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center font-sans">
    <h1 class="p-6 text-[max(48px,min(5vw,76px))] font-medium tracking-tighter">404 Not Found</h1>

    <p class="text-[max(15px,min(2vw,20px))] leading-8 tracking-tight">
      The page you visited is: {{ params.path }}
    </p>
  </div>
</template>
