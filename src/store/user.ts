import { defineStore } from 'pinia'

type role = string[]

export const userStore = defineStore('user', {
  state: () => ({
    token: '',
    roles: <role>[]
  }),
  getters: {
    roles: (state) => state.roles
  },
  actions: {
    async login() {
      try {
        this.token = '1234567890qwertyuiop'
      } catch (error) {
        return error
      }
    },
    async getUserInfo() {
      try {
        this.roles = ['organzier', 'role', 'user', 'company']
      } catch (error) {
        return error
      }
    }
  }
})