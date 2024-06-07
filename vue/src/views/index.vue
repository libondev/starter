<script setup lang="ts">
import { toast } from 'vue-sonner'

function onClick() {
  toast('Event has been created', {
    description: 'Sunday, December 03, 2023 at 9:00 AM',
    action: {
      label: 'Undo',
      onClick: () => {},
    },
  })
}
</script>

<template>
  <main class="h-[200vh] mx-auto">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>

    <Button variant="outline" @click="onClick">
      123123
    </Button>
  </main>
</template>
