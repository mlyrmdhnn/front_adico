// stores/auth.ts
import { defineStore } from 'pinia'
import { api } from '@/lib/http'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | {
      id: number
      role: string
      name: string
    },
    loaded: false,
  }),

  actions: {
    async fetchUser() {
      if (this.loaded) return
      try {
        const res = await api.get('/me')
        this.user = res.data
      } catch {
        this.user = null
      } finally {
        this.loaded = true
      }
    },
  },
})
