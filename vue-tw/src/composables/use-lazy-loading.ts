import { shallowRef } from 'vue'

interface Options {
  default?: boolean
  delay?: number
}

interface ReturnType {
  loading: Ref<boolean>
  startLoading: () => void
  cancelLoading: () => void
}

export function useLazyLoading(valueOrOptions?: boolean): ReturnType
export function useLazyLoading(valueOrOptions?: Options): ReturnType
export function useLazyLoading(valueOrOptions: boolean | Options = {}): ReturnType {
  let timeoutId: number

  const {
    delay = 300,
    default: value = false,
  } = typeof valueOrOptions === 'boolean'
    ? { default: valueOrOptions, delay: 300 }
    : valueOrOptions

  const loading = shallowRef(value)

  function startLoading() {
    timeoutId = window.setTimeout(() => {
      loading.value = true
    }, delay)
  }

  function cancelLoading() {
    clearTimeout(timeoutId)
    loading.value = false
  }

  return {
    loading,
    startLoading,
    cancelLoading,
  }
}
