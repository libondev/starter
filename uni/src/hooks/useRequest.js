/**
 * useRequest是一个定制化的请求钩子，用于处理异步请求和响应。
 * @param promise 一个执行异步请求的函数，返回一个包含响应数据的Promise。
 * @param {Options} options 包含请求选项的对象 {immediate, initialData}。
 * @param {boolean} options.shallow 是否深度转换数据的响应式，默认为true。
 * @param {boolean} options.immediate 是否立即执行请求，默认为true。
 * @param {unknown} options.initialData 初始化数据，默认为undefined。
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 */
export default function useRequest(promise, { shallow, immediate, initialData } = { shallow: true, immediate: true }) {
  const error = shallowRef(null)
  const loading = shallowRef(false)
  const data = (shallow ? shallowRef : ref)(initialData)

  const run = async () => {
    loading.value = true

    promise()
      .then((res) => {
        data.value = res.data
        error.value = null
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  onLoad(() => {
    immediate && run()
  })

  return { loading, error, data, run }
}
