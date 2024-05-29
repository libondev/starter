// import { getUrlObj } from '@/utils/index.js'

// 获取当前路由信息, 但需要注意的是，这个方法只能在页面中使用，因为 getCurrentPages() 只能在页面中使用
export const useRoute = () => getCurrentPages().at(-1)?.$page

// 获取当前路由的 query 参数
// export const useRouteQuery = () => getUrlObj(useRoute().fullPath)
export const useRouteQuery = () => useRoute().options
