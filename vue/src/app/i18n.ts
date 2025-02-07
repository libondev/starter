import type { App } from 'vue'
import type { Locale } from 'vue-i18n'
import { getClientLang } from '@/utils/shared/index.ts'

import { createI18n } from 'vue-i18n'

const DEFAULT_LANGUAGE_KEY = 'fe.system.intl.lang'

// 优先获取本地已经保存好的语言选项，否则获取用户系统/浏览器界面中配置的语言选项
export const DEFAULT_LANGUAGE = `${localStorage.getItem(DEFAULT_LANGUAGE_KEY) || getClientLang()}`

export const LANGUAGES_NAME_MAP = {
  'zh-CN': '中文(简体)',
  'en-US': 'English(US)',
}

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
  // 忽略控制台提示: `Not found 'xxx' key in 'xxx' locale messages.`
  missingWarn: false,
  // 忽略控制台提示: `Fall back to translate 'xxx' with root locale.`
  fallbackWarn: false,
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yaml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yaml/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any

  if (typeof document !== 'undefined') {
    localStorage.setItem(DEFAULT_LANGUAGE_KEY, lang)
    document.documentElement.setAttribute('lang', lang)
  }

  return lang
}

async function loadLanguageAsync(lang: string): Promise<Locale> {
  // 如果语言并没有切换或者已经加载过
  if (
    i18n.global.locale.value === lang ||
    loadedLanguages.includes(lang)
  ) {
    return setI18nLanguage(lang)
  }

  // 如果还没加载这个语言
  const messages = await localesMap[lang]!()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)

  return setI18nLanguage(lang)
}

let curLangIdx = availableLocales.indexOf(DEFAULT_LANGUAGE)

// 切换到指定语言, 如果没有指定切换到什么语言则按名称顺序轮换语言
export function switchLanguage(lang?: string) {
  if (lang) {
    loadLanguageAsync(lang)
    return
  }

  curLangIdx++
  if (curLangIdx >= availableLocales.length) {
    curLangIdx = 0
  }

  const _lang = availableLocales[curLangIdx]!

  loadLanguageAsync(_lang)
}

export function setupI18n(app: App) {
  app.use(i18n)
  loadLanguageAsync(DEFAULT_LANGUAGE)
}

export default i18n
