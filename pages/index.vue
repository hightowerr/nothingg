<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-8">User Management</h1>
      <users-user-form
        :loading="loading"
        @submit="createUser"
      />
      <users-user-list
        :users="users"
        :loading="loading"
        :error="error"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { users, loading, error, fetchUsers, createUser } = useUsers()

onMounted(() => {
  fetchUsers()
})
</script>