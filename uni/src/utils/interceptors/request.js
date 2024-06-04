import { setAppToken } from '@/app/auth.js'
import requestService from '@/app/request.js'
import { REFRESH_TOKEN_URL, getTokenByRefreshToken } from '@/api/user.js'
import { useGlobalMessage } from '@/utils/event.js'

const CODE = {
  OK: '200',
  TOKEN_INVALID: '2002', // Token 无效的情况
  TOKEN_EXPIRED: '30003', // token 已过期
  TOKEN_EMPTY: '30004', // token 为空
  REFRESH_TOKEN_EXPIRED: '30008', // Refresh Token已过期
  ERROR_TOKEN: '30009', // Token 错误
}

let isRefreshing = false
const refreshSubscribers = []

export async function onResponseResolve(result) {
  const { config, data, statusCode } = result

  // 如果接口正在刷新并且当前接口不是刷新接口则把请求放到队列中
  // TIP: 如果不判断是否是刷新接口会出现请求了刷新的接口但是一直得不到响应的问题
  if (isRefreshing && !config.url.includes(REFRESH_TOKEN_URL)) {
    return new Promise(resolve => refreshSubscribers.push({ config, resolve }))
  }

  // 如果过期了并且不是刷新 token 的接口
  if (data.code === CODE.TOKEN_EXPIRED) {
    isRefreshing = true

    return getTokenByRefreshToken()
      .then(({ code, data }) => {
        // 因为 finally 会在 then 之后执行，这会导致还没执行 finally 队列就被清空了
        // 所以状态不能放到 finally 中, 而是放在这里手动设置状态
        isRefreshing = false
        // 如果状态不正确则不继续处理
        if (code !== '200') {
          reAuthentication()
          return
        }

        setAppToken(data.rtoken, data.utoken)

        // 修改当前请求的 token
        config.headers['P-Auth'] = data.rtoken
        config.headers['P-Rtoken'] = data.utoken

        refreshSubscribers.forEach(({ config, resolve }) => {
          // 同时更新队列中的请求 token
          config.headers['P-Auth'] = data.rtoken
          config.headers['P-Rtoken'] = data.utoken

          resolve(requestService(config))
        })

        refreshSubscribers.length = 0

        // 重新请求当前请求
        return requestService(config)
      })
      .catch(() => {
        isRefreshing = false
        reAuthentication()
      })
  }

  // http请求失败的请求单独处理
  if (statusCode >= 300) {
    responseReject(data.error, config)
    return Promise.reject(data)
  }

  // 后端处理请求的时候出错了
  if (data.code !== '200' || ('success' in data && !data.success)) {
    responseReject(data?.message, config)
    return Promise.reject(data)
  }

  // 正常返回数据
  return data
}

function responseReject(reason, { silent = false } = {}) {
  // 如果是字符串则表示是手动抛出的错误
  // 如果设置了 silent 则在出现错误时不会弹出提示
  if (typeof reason === 'string') {
    !silent && useGlobalMessage({
      position: 'bottom',
      type: 'warning',
      msg: reason,
    })

    return
  }

  // 否则可能是某些代码执行时抛出的错误
  throw new Error(reason)
}

// 重新鉴权
function reAuthentication() {
  // TODO: 跳转到登录页或者其他重新授权的操作
  useGlobalMessage('用户信息过期, 需要重新登录')
}
