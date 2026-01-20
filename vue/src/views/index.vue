<script setup lang="ts">
import { switchLanguage } from '@/app/i18n.ts'

// 如果是 SFC 文件中设置的局部国际化文件, 则必须使用 useI18n() 返回的 t 来调用翻译
// 因为只有 useI18n 才能拿到当前文件的上下文, 而如果是全局的翻译, 那么 t 或者 $t 都可以使用
const { t } = useI18n()
const router = useRouter()

const userName = ref('')

function onEnter() {
  router.push({
    path: '/about',
    query: {
      name: userName.value,
    },
  })
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-2">
    <div class="flex items-center text-2xl font-medium">
      <IGdsLogoVue class="mx-2" width="1em" height="1em" />
      Vue App
    </div>

    <div class="flex items-center gap-2">
      <PThemeSwitcher />

      <PButton class="w-36" @click="switchLanguage()">
        {{ $t('button.toggle') }}{{ t('sfc.language') }}
      </PButton>

      <PTimePicker />
    </div>

    <div class="flex items-center gap-2">
      <PInput v-model="userName" :placeholder="$t('input.placeholder')" @keydown.enter="onEnter">
        <template #prefix>
          <IGdsMagnifyingGlass />
        </template>
      </PInput>

      <PButton variant="primary" class="w-20" :disabled="!userName" @click="onEnter">
        {{ t('button.enter') }}
      </PButton>
    </div>
  </div>
</template>

<route>
  meta:
    title: Index
</route>

<i18n>
en-US:
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
