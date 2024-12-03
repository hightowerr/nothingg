<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-8">Firebase Initialization</h1>
      
      <div v-if="loading" class="text-gray-600">
        Initializing Firebase collections...
      </div>
      
      <div v-else-if="error" class="text-red-600 bg-red-50 p-4 rounded mb-4">
        {{ error }}
      </div>
      
      <div v-else-if="success" class="text-green-600 bg-green-50 p-4 rounded mb-4">
        Collections initialized successfully!
      </div>
      
      <button
        @click="initializeCollections"
        :disabled="loading"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {{ loading ? 'Initializing...' : 'Initialize Collections' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const initializeCollections = async () => {
  loading.value = true
  error.value = null
  success.value = false
  
  try {
    const response = await $fetch('/api/firebase/init-collections', {
      method: 'POST'
    })
    success.value = true
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initialize collections'
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
}
</script>