import { defineStore } from 'pinia'
import { login, queryUser } from '@/api'
import defaultAvatar from '@/assets/userhead.png'
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: null, // 用户信息
    }
  },
  getters: {
    avatar() {
      return this.user?.avatar || defaultAvatar
    },
    nickName() {
      return this.user?.nickName
    },
    userName() {
      return this.user?.userName
    },
    phone() {
      return this.user?.phone
    }
  },
  actions: {
    async queryUserInfo() {
      let data = await queryUser()
      this.setUser(data?.user)
    },
    async login(data) {
      return new Promise(async resolve => {
        const { token, user } = await login(data)
        this.setUser(user)
        localStorage.setItem('token', token)
        resolve()
      })
    },
    setUser(data = {}) {
      this.user = data
    },
    resetUser() {
      this.user = null
    }
  }
})
