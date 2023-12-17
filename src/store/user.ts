import { defineStore } from 'pinia'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { asyncRouter } from '@/router/asyncRouter'

export interface MenuInfo {
  id: number
  name: string // 菜单名称
  code: string
  parentId: number // 父级菜单id
  sortOrder: number // 排序
  route: string // 前端路由
  children: MenuInfo[] // 子菜单
  icon?: string
  selected?: boolean
  expand?: boolean
}

export interface MenuState {
  token: string
  userInfo: any | null
  isCollapseMenu: boolean // 竖直菜单是否收起
  activeRoutePath: string
  isShowHorizontalMenu: boolean // 是否展示水平菜单
  isShowDrawerMenu: boolean // 是否展示小窗抽屉式菜单
  isDrawerMenuMode: boolean // 是否小窗抽屉式菜单模式
  menuList: MenuInfo[]
}

export const userStore = defineStore('user', {
  state: (): MenuState => ({
    token: localStorage.getItem('_accessToken') || '',
    isCollapseMenu: false,
    isShowDrawerMenu: false,
    isDrawerMenuMode: false,
    isShowHorizontalMenu: false,
    activeRoutePath: '',
    userInfo: null,
    menuList: [],
  }),
  getters: {},
  actions: {
    setActiveRoutePath(path: string) {
      this.activeRoutePath = path
    },
    setIsShowDrawerMenu(isShowDrawerMenu: boolean) {
      this.isShowDrawerMenu = isShowDrawerMenu
    },
    setFullMode(isFullMode: boolean) {
      this.isCollapseMenu = isFullMode
    },
    setDrawerMenuMode(isDrawerMenuMode: boolean) {
      this.isDrawerMenuMode = isDrawerMenuMode
    },
    // 不使用箭头函数
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any | null) {
      this.userInfo = userInfo
    },
    setMenuList(menuList: any[]) {
      const routeMap = asyncRouter.reduce(
        (map: { [key: string]: RouteRecordRaw }, item) => {
          map[item.path] = item
          return map
        },
        {}
      )
      // 递归 menuList list 转 tree
      const listToTree = (menuList: any[], parentId: any) => {
        const tree: MenuInfo[] = []
        for (let i = 0; i < menuList.length; i++) {
          const node = menuList[i]
          // 隐藏菜单不添加
          if (
            routeMap[node.route] &&
            routeMap[node.route].meta &&
            routeMap[node.route].meta?.hidden
          ) {
            continue
          }
          if (node.parentId === parentId) {
            const children = listToTree(menuList, node.id)
            tree.push({
              ...node,
              children,
              selected: false,
              expand: false,
            })
          }
        }
        return tree
      }

      this.menuList = menuList
        .filter((item) => !item.parentId)
        .map((item) => {
          return {
            ...item,
            icon: '',
            children: listToTree(menuList, item.id),
            selected: false,
            expand: false,
          }
        })
    },
    async getUserInfo() {
      const userInfo = {
        menuList: []
      }
      if (userInfo) {
        console.log('userInfo', userInfo)
        this.setUserInfo(userInfo)
        this.setMenuList(userInfo.menuList)
        this.addRoute(userInfo.menuList)
      }
    },
    // 添加接口路由数据
    addRoute(menuList: any[]) {
      menuList
        .filter((item) => item.route)
        .forEach((item) => {
          const routeItem = asyncRouter.find((temp) => temp.path === item.route)
          if (routeItem) {
            router.addRoute('MainLayout', routeItem)
          }
        })
    },
    // 退出
    logout() {
      asyncRouter.forEach((item) => {
        if (item) router.removeRoute(item.name as string)
      })
      this.setToken('')
      this.setUserInfo(null)
      localStorage.removeItem('_accessToken')
    },
    // 登录
    async login(username: string, password: string) {
      const user = {
        username: 'xxx',
        password: '123456',
        accessToken: 'qwertyuiop'
      }
      this.setToken(user.accessToken)
      localStorage.setItem('_accessToken', user.accessToken)
      await this.getUserInfo()
    },
  }
})
