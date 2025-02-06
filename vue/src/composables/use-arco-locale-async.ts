import type { ConfigProvider } from '@arco-design/web-vue'
import i18n from '@/app/i18n.ts'
import { onScopeDispose, shallowRef, watch } from 'vue'

type ArcoLang = InstanceType<typeof ConfigProvider>['$props']['locale']

export function useArcoLocaleAsync() {
  const locale = shallowRef<ArcoLang>()

  const localeAlias = {
    'en-US': 'en-us',
    'zh-CN': 'zh-cn',
  }

  type AliasLocale = keyof typeof localeAlias

  const unwatch = watch(
    () => i18n.global.locale.value,
    async (newLocale) => {
      if (!newLocale)
        return

      const aliasedLocale = localeAlias[newLocale as AliasLocale] || newLocale
      const module = await import(`@/../node_modules/@arco-design/web-vue/es/locale/lang/${aliasedLocale}.js`)

      locale.value = module.default
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    unwatch()
  })

  return locale
}
