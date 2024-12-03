<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold">Users</h2>
    <div v-if="loading" class="text-gray-600">
      Loading users...
    </div>
    <div v-else-if="error" class="text-red-600 p-4 bg-red-50 rounded">
      {{ error }}
    </div>
    <TransitionGroup
      v-else
      name="list"
      tag="ul"
      class="space-y-2"
    >
      <li
        v-for="user in users"
        :key="user.id"
        class="p-4 bg-white rounded shadow transition-all duration-300"
      >
        <p class="font-medium">{{ user.name || 'Unnamed User' }}</p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
        <p class="text-xs text-gray-400">
          Added {{ new Date(user.createdAt).toLocaleDateString() }}
        </p>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

defineProps<{
  users: User[]
  loading: boolean
  error: string | null
}>()

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>