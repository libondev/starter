interface Options {
  /**
   * 默认值, 初始情况下是否渲染
   */
  defaultValue?: boolean

  /**
   * 延迟时间, 单位毫秒, 在设置为隐藏后, 多少毫秒后才真正隐藏
   */
  delay?: number
}

interface ReturnValue {
  /**
   * 用于 v-if, 控制元素是否渲染
   */
  render: Ref<boolean>

  /**
   * 用于 v-show, 控制元素是否可见
   */
  visible: Ref<boolean>

  /**
   * 渲染元素
   */
  open: () => void

  /**
   * 先隐藏元素, 在延迟结束后销毁元素(组件)
   */
  close: () => void
}

export function useLazyShow({
  defaultValue = false,
  delay = 1500,
}: Options = {}): ReturnValue {
  const render = shallowRef(defaultValue)
  const visible = shallowRef(defaultValue)

  let delayTimeoutId = -1

  const open = () => {
    clearTimeout(delayTimeoutId)

    render.value = true

    Promise.resolve().then(() => {
      visible.value = true
    })
  }

  const close = () => {
    visible.value = false

    delayTimeoutId = window.setTimeout(() => {
      render.value = false
    }, delay)
  }

  return {
    open,
    close,
    render,
    visible,
  }
}
