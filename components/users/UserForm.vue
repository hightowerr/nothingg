<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 mb-8">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        :disabled="loading"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
      />
    </div>
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        :disabled="loading"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
      />
    </div>
    <button
      type="submit"
      :disabled="loading"
      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
    >
      {{ loading ? 'Adding...' : 'Add User' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { CreateUserInput } from '~/types/user'

const emit = defineEmits<{
  (e: 'submit', data: CreateUserInput): void
}>()

const props = defineProps<{
  loading?: boolean
}>()

const form = reactive<CreateUserInput>({
  email: '',
  name: ''
})

const handleSubmit = () => {
  emit('submit', { ...form })
  form.email = ''
  form.name = ''
}
</script>