<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Users</h2>
    <div v-if="userStore.loading" class="text-gray-600">
      Loading users...
    </div>
    <div v-else-if="userStore.error" class="text-red-600">
      {{ userStore.error }}
    </div>
    <ul v-else class="space-y-2">
      <li v-for="user in userStore.users" :key="user.id" 
          class="p-3 bg-white rounded shadow">
        <p class="font-medium">{{ user.name || 'Unnamed User' }}</p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>