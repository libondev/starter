import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import cookie from 'js-cookie'

/**
 * 请求头中的 token 的 key
 */
export const HEADER_TOKEN_KEYS = {
  ACCESS: 'Authorization',
  REFRESH: 'RefreshToken',
}

/**
 * 本地存储中使用的 token 的 key
 */
export const STORAGE_TOKEN_KEYS = {
  ACCESS: 'fe.user.token.access',
  REFRESH: 'fe.user.token.refresh',
}

/**
 * 刷新 token 的 api 路径, 用于判断在刷新 token 的时候发出的请求是否是刷新接口
 */
export const USER_REFRESH_API_PATH = '/refresh'

/**
 * 获取重定向到登录页的 url
 */
export function getRedirectLoginPage() {
  const redirectPath = location.hash.slice(1).split('?')[0]

  return `/#/user/login?redirect=${redirectPath === '/user/login' ? '/' : redirectPath}`
}

export function setRequestTokensToStorage(access: string, refresh: string) {
  const options = {
    secure: true,
    sameSite: 'strict',
  } as const

  cookie.set(STORAGE_TOKEN_KEYS.ACCESS, access, {
    ...options,
    expires: 7, // 7 days
  })

  cookie.set(STORAGE_TOKEN_KEYS.REFRESH, refresh, {
    ...options,
    expires: 30,
  })
}

/**
 * 设置请求头中的 token
 * @param configOrInstance 请求配置
 * @param token 令牌
 */
export function setRequestHeaderTokens(
  configOrInstance: InternalAxiosRequestConfig | AxiosInstance,
  token: string,
  refreshToken: string,
): void {
  // 如果有 defaults 属性，则设置全局请求头
  if ('defaults' in configOrInstance) {
    configOrInstance.defaults.headers.common[HEADER_TOKEN_KEYS.ACCESS] = `Bearer ${token}`
    configOrInstance.defaults.headers.common[HEADER_TOKEN_KEYS.REFRESH] = refreshToken
    return
  }

  // 否则设置单次请求头
  configOrInstance.headers[HEADER_TOKEN_KEYS.ACCESS] = `Bearer ${token}`
  configOrInstance.headers[HEADER_TOKEN_KEYS.REFRESH] = refreshToken
}
