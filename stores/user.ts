import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name: string | null
}

interface CreateUserInput {
  email: string
  name?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const { data } = await useFetch('/api/users')
        this.users = data.value as User[]
      } catch (err) {
        this.error = 'Failed to fetch users'
      } finally {
        this.loading = false
      }
    },

    async createUser(input: CreateUserInput) {
      this.loading = true
      try {
        await useFetch('/api/users', {
          method: 'POST',
          body: input
        })
        await this.fetchUsers()
      } catch (err) {
        this.error = 'Failed to create user'
      } finally {
        this.loading = false
      }
    }
  }
})