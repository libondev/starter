import axios from 'axios'
import { UniAdapter } from 'uniapp-axios-adapter'
import { getAccessToken, getRefreshToken } from './auth.js'
import { onResponseResolve } from '@/utils/interceptors/request.js'

const service = axios.create({
  adapter: UniAdapter,
  baseURL: import.meta.env.VITE_BASE_SERVICE_GATEWAY,
  timeout: 1000 * 60 * 2,
  headers: {
    'Content-Type': 'application/json',
    'P-Langid': 'zh_CN',
    'P-AppId': import.meta.env.VITE_APP_ID,
    'P-Auth': getAccessToken(),
    'P-Rtoken': getRefreshToken(),
  },
})

service.interceptors.response.use(onResponseResolve)

/**
 * GET 请求
 * 适用于普通查询, 如果有其他参数需要传递则可以使用 service 自行处理
 * @param url 后台地址
 * @param query 请求query参数
 * @returns {Promise<unknown>} data
 */
export const httpGet = (url, query, config) => service.get(url, { params: query, ...config })

/**
 * POST 请求
 * 适用范围同上
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns {Promise<unknown>} data
 */
export const httpPost = (url, data, query, config) => service.post(url, data, { params: query, ...config })

export default service
