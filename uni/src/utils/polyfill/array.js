/* eslint-disable no-extend-native */

// 解决低版本手机不识别 array.at() 导致运行报错的问题
export function atPolyfill() {
  if (typeof Array.prototype.at === 'function')
    return

  Array.prototype.at = function (index) {
    if (index < 0)
      return this[this.length + index]
    if (index >= this.length)
      return undefined
    return this[index]
  }
}
