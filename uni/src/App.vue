<script setup>
import { useToast } from 'wot-design-uni'
import { setAppToken } from '@/app/auth.js'
import { registryGlobalMessage } from '@/utils/event.js'
import { useSpaceStore } from '@/stores/space.js'
import { useUserStore } from '@/stores/user.js'

registryGlobalMessage(useToast())
</script>

<template>
  <wd-toast />
</template>
