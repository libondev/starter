import type { ConfigProvider } from 'pxd'

import { onScopeDispose, shallowRef, watch } from 'vue'

import i18n from '@/app/i18n.ts'

type UILocale = InstanceType<typeof ConfigProvider>['$props']['locale']

export function useUiLocalesAsync() {
  const locale = shallowRef<UILocale>()

  const localeAlias = {
    'en-US': 'en-us',
    'zh-CN': 'zh-cn',
  }

  type AliasLocale = keyof typeof localeAlias

  const unwatch = watch(
    () => i18n.global.locale.value,
    async (newLocale) => {
      if (!newLocale) { return }

      const aliasedLocale = localeAlias[newLocale as AliasLocale] || newLocale
      const module = await import(
        `@/../node_modules/pxd/dist/locales/${aliasedLocale}.js`
      )

      locale.value = module.default
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    unwatch()
  })

  return locale
}
