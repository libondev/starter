import i18n from '@/app/i18n.ts'
import { shallowRef } from 'vue'

export function useArcoLocaleAsync() {
  const locale = shallowRef()

  const localeAlias = {
    'en': 'en-us',
    'zh-CN': 'zh-cn',
  }

  type AliasLocale = keyof typeof localeAlias

  const unwatch = watch(
    () => i18n.global.locale.value,
    async (newLocale) => {
      if (!newLocale)
        return

      const aliasedLocale = localeAlias[newLocale as AliasLocale] || newLocale
      const module = await import(`/node_modules/@arco-design/web-vue/es/locale/lang/${aliasedLocale}`)

      locale.value = module.default
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    unwatch()
  })

  return locale
}
