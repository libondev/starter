<script setup lang="ts">
import { switchLanguage } from '@/app/i18n.ts'
import ColorMode from '@/layouts/components/ColorMode.vue'

// 如果是 SFC 文件中设置的局部国际化文件, 则必须使用 useI18n() 返回的 t 来调用翻译
// 因为只有 useI18n 才能拿到当前文件的上下文, 而如果是全局的翻译, 那么 t 或者 $t 都可以使用
const { t } = useI18n()
const router = useRouter()

function onEnter() {
  router.push('/about')
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full h-full justify-center items-center">
    <div class="flex items-center text-2xl font-medium">
      <IGdsLogoVue class="mx-2" width="1em" height="1em" />
      Vue App
    </div>

    <div class="flex items-center gap-2">
      <ColorMode />

      <AButton class="w-36" @click="switchLanguage()">
        {{ $t('button.toggle') }}{{ t('sfc.language') }}
      </AButton>
    </div>

    <div class="flex items-center gap-2">
      <AInput :placeholder="$t('input.placeholder')" @keydown.enter="onEnter">
        <template #prefix>
          <IGdsMagnifyingGlass />
        </template>
      </AInput>

      <AButton type="primary" class="w-20" @click="onEnter">
        {{ t('button.enter') }}
      </AButton>
    </div>
  </div>
</template>

<route>
  meta:
    title: Index
</route>

<i18n>
en:
  sfc:
    language: ' Language'
  button:
    enter: Enter

zh-CN:
  sfc:
    language: 语言
  button:
    enter: 确定
</i18n>
