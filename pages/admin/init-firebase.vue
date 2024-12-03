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
      
      <div v-else-if="result" class="space-y-4">
        <div class="text-green-600 bg-green-50 p-4 rounded">
          Collections initialized successfully!
        </div>
        
        <div class="mt-4">
          <h2 class="text-xl font-semibold mb-2">Initialized Collections:</h2>
          <ul class="list-disc list-inside">
            <li v-for="collection in result.collections" :key="collection">
              {{ collection }}
            </li>
          </ul>
        </div>

        <div class="mt-4">
          <h2 class="text-xl font-semibold mb-2">Created Products:</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="product in result.products" :key="product.id"
                 class="border rounded p-4">
              <h3 class="font-bold">{{ product.name }}</h3>
              <p class="text-gray-600">{{ product.description }}</p>
              <p class="font-semibold mt-2">${{ product.price }}</p>
              <ul class="list-disc list-inside mt-2">
                <li v-for="feature in product.features" :key="feature"
                    class="text-sm text-gray-600">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <button
        @click="initializeFirebase"
        :disabled="loading"
        class="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {{ loading ? 'Initializing...' : 'Initialize Firebase' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref<string | null>(null)
const result = ref<any>(null)

const initializeFirebase = async () => {
  loading.value = true
  error.value = null
  result.value = null
  
  try {
    const response = await $fetch('/api/firebase/init-collections', {
      method: 'POST'
    })
    result.value = response
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initialize Firebase'
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
}
</script>