/**
 * 路由拦截，通常也是登录拦截
 * 可以设置路由白名单，或者黑名单
 */
import { useUserStore } from '@/stores/user.js'
import { needLoginPages as _needLoginPages, getNeedLoginPages } from '@/utils/index.js'

const loginRoute = '/pages/login/index'

function isLoggedIn() {
  const userStore = useUserStore()
  return userStore.isLoggedIn
}

const isDev = import.meta.env.DEV

// 黑名单登录拦截器 - （适用于大部分页面不需要登录，少部分页面需要登录）
const navigateToInterceptor = {
  invoke({ url }) {
    // console.log(url) // /pages/route-interceptor/index?name=feige&age=30
    const path = url.split('?')[0]
    let needLoginPages = []
    // 为了防止开发时出现BUG，这里每次都获取一下。生产环境可以移到函数外，性能更好
    if (isDev) {
      needLoginPages = getNeedLoginPages()
    } else {
      needLoginPages = _needLoginPages
    }

    const isNeedLogin = needLoginPages.includes(path)
    if (!isNeedLogin) {
      return true
    }

    const hasLogin = isLoggedIn()
    if (hasLogin) {
      return true
    }

    const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(url)}`
    uni.navigateTo({ url: redirectRoute })
    return false
  },
}

export function routeInterceptor() {
  uni.addInterceptor('reLaunch', navigateToInterceptor)
  uni.addInterceptor('navigateTo', navigateToInterceptor)
  uni.addInterceptor('redirectTo', navigateToInterceptor)
}
