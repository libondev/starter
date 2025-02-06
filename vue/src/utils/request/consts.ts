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
