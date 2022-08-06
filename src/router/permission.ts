import { RouteRecordRaw } from 'vue-router'
// 递归本地路由配置及后端路由权限点，返回新的路由
export const filterAsyncRoutes = (routes: any[], roles: any[]) => {
  const arr: RouteRecordRaw[] = []
  routes.forEach((route: any) => {
    if (route.meta && route.meta.roles && roles.some((role: any[]) => route.meta.roles.include(role))) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles)
      }
      arr.push(route)
    }
  })
  return arr
}

