import { httpPost } from '@/app/request.js'

// 获取空间列表接口
export const getTestData = data => httpPost(`/testData`, data)
