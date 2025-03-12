import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import cookie from 'js-cookie'
import { STORAGE_TOKEN_KEYS, USER_REFRESH_API_PATH } from './consts.ts'
import instance, { type APIResponse } from './index.ts'
import { setRequestHeaderTokens, setRequestTokensToStorage } from './utils.ts'

interface TokenResponse {
  access: string
  refresh: string
}

interface PendingRequest {
  resolve: (value: any) => void
  reject: (error: Error) => void
  config: InternalAxiosRequestConfig
}

class TokenRefresher {
  private isRefreshing = false
  private failedQueue: PendingRequest[] = []
  private readonly maxRetries = 3
  private retryCount = 0

  // 刷新 token
  private async refreshToken(refreshToken: string) {
    return instance.post<unknown, APIResponse<TokenResponse>>(USER_REFRESH_API_PATH, {
      refresh_token: refreshToken,
    })
  }

  // 执行队列中的请求
  private processQueue(error: any = null) {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error)
      } else {
        resolve(instance(config))
      }
    })
    this.failedQueue = []
  }

  // 清除认证信息
  private clearAuth() {
    this.isRefreshing = false
    this.retryCount = 0
    this.failedQueue = []

    cookie.remove(STORAGE_TOKEN_KEYS.ACCESS)
    cookie.remove(STORAGE_TOKEN_KEYS.REFRESH)

    // 跳转到登录页
    location.replace('/login')
  }

  // 处理请求错误
  async handleRequestError(error: AxiosError<APIResponse>): Promise<void> {
    const { config, response } = error

    if (!config || !response || response.status !== 401) {
      return Promise.reject(error)
    }

    // 如果是刷新token的请求失败了，直接清除认证信息
    if (config.url?.includes(USER_REFRESH_API_PATH)) {
      this.clearAuth()
      return Promise.reject(error)
    }

    const refreshToken = cookie.get(STORAGE_TOKEN_KEYS.REFRESH)
    if (!refreshToken) {
      this.clearAuth()
      return Promise.reject(error)
    }

    // 如果已经在刷新中，将请求加入队列
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject, config })
      })
    }

    this.isRefreshing = true

    try {
      const { data } = await this.refreshToken(refreshToken)

      // 更新 token
      setRequestTokensToStorage(data.access, data.refresh)
      setRequestHeaderTokens(instance, data.access, data.refresh)

      // 重试队列中的请求
      this.processQueue()

      // 重试当前请求
      return instance(config)
    } catch (refreshError) {
      this.retryCount++

      if (this.retryCount >= this.maxRetries) {
        this.clearAuth()
        this.processQueue(refreshError)
        return Promise.reject(refreshError)
      }

      // 重试刷新
      return this.handleRequestError(error)
    } finally {
      this.isRefreshing = false
    }
  }
}

const tokenRefresher = new TokenRefresher()

export default (error: AxiosError<APIResponse>) => {
  return tokenRefresher.handleRequestError(error)
}
