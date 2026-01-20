<script setup lang="ts">
import { useUiLocalesAsync } from '@/composables/use-ui-locales-async.ts';

const locale = useUiLocalesAsync()
</script>

<template>
  <PConfigProvider class="h-full" :locale="locale">
    <RouterView />
  </PConfigProvider>
</template>
