<script lang="ts" setup>
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <div class="h-full">
    <RouterView />
  </div>

  <Toaster />
</template>
