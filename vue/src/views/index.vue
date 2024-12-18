<script setup lang="ts">
import { switchLanguage } from '@/app/i18n.ts'
import ColorMode from '@/layouts/components/ColorMode.vue'

// 如果是 SFC 文件中设置的局部国际化文件, 则必须使用 useI18n() 返回的 t 来调用翻译
// 因为只有 useI18n 才能拿到当前文件的上下文, 而如果是全局的翻译, 那么 t 或者 $t 都可以使用
const { t } = useI18n()
</script>

<template>
  <div class="flex gap-2 w-full h-full justify-center items-center">
    <ColorMode />

    <PButton variant="outline" @click="switchLanguage()">
      {{ $t('button.toggle') }} {{ t('sfc.language') }}
    </PButton>
  </div>
</template>

<route>
  meta:
    title: Index
</route>

<i18n>
en:
  sfc:
    language: Language

zh-CN:
  sfc:
    language: 语言
</i18n>
