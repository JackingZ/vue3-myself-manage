import { RouteRecordRaw } from 'vue-router';

const organizer: Array<RouteRecordRaw> = [
  {
    path: '/organzier/role',
    name: 'role',
    meta: {
      title: 'role'
    },
    component: () => import('@/pages/organzier/role.vue')
  },
  {
    path: '/organzier/user',
    name: 'user',
    meta: {
      title: 'user'
    },
    component: () => import('@/pages/organzier/user.vue')
  },
  {
    path: '/organzier/company',
    name: 'company',
    meta: {
      title: 'company'
    },
    component: () => import('@/pages/organzier/company.vue')
  }
]

export default organizer