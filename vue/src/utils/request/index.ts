import axios from 'axios'
import cookie from 'js-cookie'
import { downloadBlobFile } from '../parsers/file.ts'
import refreshAccessTokenHandler from './refresh.ts'
import { getRedirectLoginPage } from './utils.ts'
import { HEADER_TOKEN_KEYS, STORAGE_TOKEN_KEYS } from './consts.ts'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    [HEADER_TOKEN_KEYS.ACCESS]: cookie.get(STORAGE_TOKEN_KEYS.ACCESS),
    [HEADER_TOKEN_KEYS.REFRESH]: cookie.get(STORAGE_TOKEN_KEYS.REFRESH),
  },
})

instance.interceptors.request.use((config) => {
  // 如果是 FormData 自动覆写请求头类型
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }

  return config
})

instance.interceptors.response.use(({ data, headers }) => {
  return new Promise<any>((resolve, reject) => {
    // 如果是 blob 则当做文件下载
    if (data instanceof Blob) {
      const filename = headers['Content-disposition'].replace(/\w+;\s?filename=(.*)/, '$1')
      downloadBlobFile(data, decodeURIComponent(filename))
      return resolve({ code: 200, msg: 'Success' })
    }

    if (data?.code === 200) {
      return resolve(data)
    }

    // token 过期跳转到登录页
    if (data?.code === 1026) {
      location.href = getRedirectLoginPage()
      return reject(data)
    }

    return reject(data)
  })
}, refreshAccessTokenHandler)

export interface APIResponse<Data = any> {
  code: number
  data: Data // 成功时的数据
  detail?: Data // 失败时的数据
  msg?: string
}

type APIGetMethod<D = any, P = any> = <Data = D, Params = P>(
  ...args: Parameters<typeof instance.get<any, APIResponse<Data>, Params>>
) => Promise<APIResponse<Data>>

type APIPostMethod<D = any, B = any> = <Data = D, Body = B>(
  ...args: Parameters<typeof instance.post<any, APIResponse<Data>, Body>>
) => Promise<APIResponse<Data>>

export const $get = instance.get.bind(instance) as APIGetMethod
export const $post = instance.post.bind(instance) as APIPostMethod
export const $put = instance.put.bind(instance) as APIPostMethod
export const $delete = instance.delete.bind(instance) as APIGetMethod

export default instance
