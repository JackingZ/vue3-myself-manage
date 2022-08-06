import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routerHistory = createWebHistory()
export const syncRouter:Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  }
]



const router = createRouter({
  history: routerHistory,
  routes: syncRouter,
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router