<script setup lang="ts">
import { useUiLocalesAsync } from '@/composables/use-ui-locales-async.ts'

const locale = useUiLocalesAsync()
</script>

<template>
  <PConfigProvider :locale="locale">
    <RouterView />

    <PMessage />
    <PLoadingBar />
  </PConfigProvider>
</template>
