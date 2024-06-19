<script lang="ts" setup>
import MailList from './components/List.vue'
import { mails } from './utils/data'

const selectedMail = ref<string>('')
const isUnread = ref(false)

const filterMails = computed(() => {
  return isUnread.value
    ? mails.filter(item => !item.read)
    : mails
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center gap-x-2 p-4">
      <span>All</span>
      <Switch v-model:checked="isUnread" />
      <span>Unread</span>
    </div>

    <MailList v-model:selected-mail="selectedMail" :items="filterMails" />
  </div>
</template>
