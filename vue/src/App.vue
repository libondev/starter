<script setup lang="ts">
import { useArcoLocaleAsync } from '@/composables/use-arco-locale-async'

const locale = useArcoLocaleAsync()
</script>

<template>
  <AConfigProvider :locale="locale">
    <RouterView />
  </AConfigProvider>
</template>
