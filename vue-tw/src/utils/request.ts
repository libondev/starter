import axios from 'axios'
import jsCookie from 'js-cookie'
import { USER_TOKEN_KEY } from '@/stores/user'

interface APIResponse<Data> {
  code: number

  // 成功
  data: Data

  // 失败
  detail: Data
  msg?: string
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: '/api',
})

const refreshing = false

const configsMap = new Map()

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${jsCookie.get(USER_TOKEN_KEY)}`

  // 如果正在刷新 token 则将后续的请求全部放入暂存区
  if (refreshing) {
    return new Promise((resolve) => {
      configsMap.set(config, resolve)
    })
  }

  // if (config.headers.token)
  //   refreshing = true

  // 刷新 token, 刷新后重新请求 configsMap 里的所有请求

  return config
})

instance.interceptors.response.use((response) => {
  if (response.data?.code === 200) {
    return Promise.resolve(response.data)
  }

  // token 过期跳转到登录页
  if (response.data?.code === 1026) {
    location.href = getRedirectLoginPage()
  }

  return Promise.reject(response.data)
})

export function getRedirectLoginPage() {
  const redirectPath = location.hash.slice(1).split('?')[0]

  return `/#/user/login?redirect=${redirectPath === '/user/login' ? '/' : redirectPath}`
}

export function useGet<Detail>(...args: Parameters<typeof instance['get']>) {
  return instance.get<unknown, APIResponse<Detail>>(...args)
}

export function usePost<Detail>(...args: Parameters<typeof instance['post']>) {
  return instance.post<unknown, APIResponse<Detail>>(...args)
}

export function usePut<Detail>(...args: Parameters<typeof instance['put']>) {
  return instance.put<unknown, APIResponse<Detail>>(...args)
}

export function useDelete<Detail>(...args: Parameters<typeof instance['delete']>) {
  return instance.delete<unknown, APIResponse<Detail>>(...args)
}

export default instance
