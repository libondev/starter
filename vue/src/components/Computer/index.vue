<script lang="ts" setup>
const { accretion, count, reduction } = useComputer()
</script>

<template>
  <div class="text-center">
    <div>
      <p class="text-3xl font-tabular">
        {{ count }}
      </p>

      <button class="px-6 py-1.5 rounded b-0 bg-$cp text-white cursor-pointer active:invert-20%" @click="accretion">
        Plus
      </button>
      <button class="px-6 py-1.5 rounded b-0 bg-#e9e9e9 cursor-pointer ml-2 active:invert-20%" @click="reduction">
        Minus
      </button>
    </div>
  </div>
</template>
