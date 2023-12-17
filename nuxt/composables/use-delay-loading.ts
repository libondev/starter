import { shallowRef } from 'vue'

export function useDelayLoading({ delay = 300, defaultValue = false } = {}) {
  let timeoutId: number

  const loading = shallowRef(defaultValue)

  function startLoading() {
    timeoutId = window.setTimeout(() => {
      loading.value = true
    }, delay)
  }

  function cancelLoading() {
    clearTimeout(timeoutId)
  }

  return {
    loading,
    startLoading,
    cancelLoading,
  }
}
