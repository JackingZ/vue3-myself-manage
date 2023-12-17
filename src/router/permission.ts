import { Router } from 'vue-router'
import { userStore } from '@/store/user'
// import { i18n } from '@/i18n'

// 路由权限配置
export function setPermission(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log('router.getRoutes()', router.getRoutes())
    // if (to.meta.title) {
    //   document.title = i18n.global.t(to.meta.title as string)
    // }
    if (!to.meta.noAuth) {
      const store = userStore()
      if (store.token) {
        if (!store.userInfo) {
          await store.getUserInfo()
          next(to.fullPath)
          return
        }
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    } else {
      next()
    }
  })
}

