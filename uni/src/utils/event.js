// 封装一层, 方便将来替换

export const eventOn = uni.$on
export const eventOff = uni.$off
export const eventEmit = uni.$emit
export const eventOnce = uni.$once

const GLOBAL_MESSAGE_KEY = 'global-message'

export function useGlobalMessage(...args) {
  eventEmit(GLOBAL_MESSAGE_KEY, ...args)
}

// 用于注册全局toast消息
export function registryGlobalMessage(provider) {
  const _callback = (optionsOrMsg) => {
    if (typeof optionsOrMsg === 'string') {
      provider.show(optionsOrMsg)
      return
    }

    const { type = 'show', ...options } = optionsOrMsg

    provider[type](options)
  }

  onShow(() => {
    eventOn(GLOBAL_MESSAGE_KEY, _callback)
  })

  onHide(() => {
    eventOff(GLOBAL_MESSAGE_KEY, _callback)
  })
}
