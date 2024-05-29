/**
 * 设置本地缓存, 如果传入了第二个值则设置，否则获取
 * 如果第二个参数设置为 null，则删除缓存
 * 避免与 vueuse/core 中的 useStorage 冲突，改为 useUniStorage
 * @param {string} key
 * @param {unknown?} value
 */
export function useUniStorage(key, value) {
  if (typeof value === 'undefined') {
    return uni.getStorageSync(key)
  }

  if (value === null) {
    uni.removeStorageSync(key)
    return
  }

  uni.setStorageSync(key, value)
}
