import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { setPermission } from "@/router/permission";

const routerHistory = createWebHistory()
export const syncRouter:Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: "/",
    name: "layout",
    meta: {
      title: "helloworld",
    },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        name: 'Dashboard'
      },
      {
        path: '/:pathMatch(.*)',
        name: 'not-found',
        component: () => import('@/pages/404/not-found.vue')
      }
    ]
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
setPermission(router)
export default router