import { ref } from 'vue'
import type { User, CreateUserInput } from '~/types/user'

export function useUsers() {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useFetch<User[]>('/api/users')
      users.value = data.value || []
    } catch (err) {
      error.value = 'Failed to fetch users'
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  const createUser = async (input: CreateUserInput) => {
    loading.value = true
    error.value = null
    try {
      await useFetch('/api/users', {
        method: 'POST',
        body: input
      })
      await fetchUsers()
    } catch (err) {
      error.value = 'Failed to create user'
      console.error('Error creating user:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser
  }
}