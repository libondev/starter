// @ts-expect-error import json file
import { pages, subPackages, tabBar } from '@/pages.json'

/** 判断当前页面是否是tabbar页  */
export function getIsTabbar() {
  if (!tabBar) {
    return false
  }

  if (!tabBar.list.length) {
    // 通常有tabBar的话，list不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currPath = lastPage.route
  return !!tabBar.list.find(e => e.pagePath === currPath)
}

function ensureDecodeURIComponent(url) {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }

  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export function getUrlObj(url) {
  const [path, queryStr] = url.split('?')

  const query = {}

  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的pages，如果传递了 key, 则表示通过 key 过滤
 */
export function getAllPages(key = 'needLogin') {
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter(page => !key || page[key])
      .map(page => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter(page => !key || page[key])
      .forEach((page) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]

  return result
}

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = () => getAllPages('needLogin').map(page => page.path)

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages = getAllPages('needLogin').map(page => page.path)
