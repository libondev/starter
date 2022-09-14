<template>
  <main>
    {{ data }}
    <hello-world msg="111" />
  </main>
</template>

<script lang="ts" setup>
import { getWords } from '@/apis/sdf';

const { data } = getWords();

console.log(data);
</script>
