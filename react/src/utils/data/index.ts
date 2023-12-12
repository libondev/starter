/**
 * 去除链接中的 query 和 hash
 * @param fullUrl 需要解析的完整的 url 链接
 * @returns url without query and hash
 * @example
 * ```js
 * getBaseURL('http://url.com/page?name=Adam&surname=Smith')
 * // -> 'http://url.com/page'
 * ```
 */
export function getBaseUrl(fullUrl: string) {
  return fullUrl.replace(/[?#].*$/, '')
}

/**
 * 生成一个随机的 UUID
 * @example
 * ```js
 * getUUID()
 * // -> '7982fcfe-5721-4632-bede-6000885be57d'
 * ```
 */
export function getUUID() {
  return (`${1e7}${-1e3}${-4e3}${-8e3}${-1e11}`).replace(/[018]/g, (c) => {
    return (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(16)
  })
}

/**
 * 判断是否为绝对路径
 */
export const isAbsoluteURL = (url: string) => /^[a-z][a-z0-9+.-]*:/.test(url)

/**
 * 解析目标 url 的参数为对象
 * @example
 * ```js
 * getURLParameters('http://url.com/page?name=Adam&surname=Smith')
 * // -> {name: 'Adam', surname: 'Smith'}
 * ```
 */

// 浏览器版本比较旧用这个
// export const getURLParameters = (url: string) =>
//   (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
//     (a, v) => (
//       (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
//     ),
//     {} as Record<string, string>
//   )

// 浏览器版本比较新用这个
export function getURLParameters(url: string) {
  const entries = new URL(url).searchParams.entries()

  return Array.from(entries).reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as Record<string, string>)
}

/**
 * 获取当前选中的文本
 * @example
 * ```js
 * getSelectedText() // 'Lorem ipsum'
 * ```
 */
export const getSelectedText = () => window.getSelection()?.toString()

/**
 * 复制文本到剪贴板
 */
export function copyToClipboard(string: string) {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(string)

  return Promise.reject(new Error('The Clipboard API is not available.'))
}

/**
 * 切换指定元素或是 body 为全屏
 */
export function toggleFullscreen(open = true, element = document.body) {
  open ? element.requestFullscreen() : document.exitFullscreen()
}

/**
 * 判断是否为有效的日期
 * @example
 * ```js
 * isDateValid('December 17, 1995 03:24:00') // true
 * isDateValid('1995-12-17T03:24:00') // true
 * isDateValid('1995-12-17 T03:24:00') // false
 * isDateValid('Duck') // false
 * isDateValid(1995, 11, 17) // true
 * isDateValid(1995, 11, 17, 'Duck') // false
 * isDateValid({}) // false
 * ```
 */
export const isDateValid = (...val: Array<string | number>) => !Number.isNaN(new Date(...val as []).valueOf())

/**
 * 获取指定时间的 24 小时制时间
 * @example
 * ```js
 * getColonTimeFromDate(new Date()) // '08:38:00'
 * ```
 */
export const getDateTimeFromDate = (date: Date = new Date()) => date.toTimeString().slice(0, 8)

/**
 * 获取用户的系统是否为暗黑模式
 * @example
 * ```js
 * prefersDarkColorScheme() // true
 * ```
 */
export const prefersDarkColorScheme = () => window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

/**
 * 判断是否为移动端设备
 * TIP: 只有移动端才有 ontouchstart 属性
 */
export const isMobileDevice = () => window && 'ontouchstart' in window

/**
 * 是否为空对象
 * @param object 要检测的对象
 */
export const isEmptyObject = (object: object) => Reflect.ownKeys(object).length === 0
