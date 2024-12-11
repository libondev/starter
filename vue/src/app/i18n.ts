import type { App } from 'vue'
import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

const DEFAULT_LANGUAGE_KEY = 'fe.system.intl'

// 后面加上 ! 可以避免从 zh-CN 回退到 zh, 或是 en-US -> en
const DEFAULT_LANGUAGE = `${localStorage.getItem(DEFAULT_LANGUAGE_KEY) || 'en'}`

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
  // 忽略控制台提示: `Not found 'button.toggle' key in 'en' locale messages.`
  missingWarn: false,
  // 忽略控制台提示: `Fall back to translate 'xxx' with root locale.`
  fallbackWarn: false,
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yaml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yaml/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

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

// 切换到指定语言, 或者是轮换语言
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
