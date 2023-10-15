<script lang="ts" setup>
defineProps({
  as: {
    type: String,
    default: 'div',
  },
})
</script>

<template>
  <component :is="as" class="grid-item">
    <slot />
  </component>
</template>

<style scoped>
.grid-item {
  --offset: 16px;
  flex: 1 0 200px;
  max-width: 100%;
}

@media (min-width: 560px) {
  .grid-item {
    max-width: calc(50% - var(--offset));
  }
}

@media (min-width: 768px) {
  .grid-item {
    max-width: calc(33.33333% - var(--offset));
  }
}

@media (min-width: 1024px) {
  .grid-item {
    max-width: calc(25% - var(--offset));
  }
}

@media (min-width: 1280px) {
  .grid-item {
    max-width: calc(20% - var(--offset));
  }
}
</style>
