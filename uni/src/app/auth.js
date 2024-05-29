import { useUniStorage } from '../hooks/useUniStorage.js'
// @ts-expect-error
import { name as appName } from '@/../package.json'

const USER_ID_KEY = `${appName}-user-id`
const ACCESS_TOKEN_KEY = `${appName}-token`
const REFRESH_TOKEN_KEY = `${appName}-refresh-token`

export const getAccessToken = () => useUniStorage(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => useUniStorage(REFRESH_TOKEN_KEY)

// export const getUserId = () => useUniStorage(USER_ID_KEY)

/**
 * 设置用户id, 传入 null 则表示清空
 * @param {string | null} userId
 */
export function setUserId(userId) {
  useUniStorage(USER_ID_KEY, userId)
}

/**
 * 设置应用权限, 传入 null 则表示清空
 * @param {string|null} token
 * @param {string|null} refreshToken
 */
export function setAppToken(token, refreshToken) {
  useUniStorage(ACCESS_TOKEN_KEY, token)
  useUniStorage(REFRESH_TOKEN_KEY, refreshToken)
}
