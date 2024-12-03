<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-8">Firebase Connection Status</h1>
      
      <div v-if="loading" class="text-gray-600">
        Verifying Firebase connection...
      </div>
      
      <div v-else-if="error" class="text-red-600 bg-red-50 p-4 rounded mb-4">
        {{ error }}
      </div>
      
      <div v-else-if="status" class="space-y-6">
        <div class="text-green-600 bg-green-50 p-4 rounded">
          Firebase connection status: {{ status.status }}
        </div>
        
        <div class="grid gap-4 md:grid-cols-2">
          <div class="border rounded p-4">
            <h2 class="text-xl font-semibold mb-4">Collection Statistics</h2>
            <dl class="space-y-2">
              <template v-for="(count, name) in status.collections" :key="name">
                <dt class="font-medium capitalize">{{ name }}</dt>
                <dd class="text-gray-600 ml-4">{{ count }} documents</dd>
              </template>
            </dl>
          </div>
          
          <div class="border rounded p-4">
            <h2 class="text-xl font-semibold mb-4">Products</h2>
            <ul class="space-y-4">
              <li v-for="product in status.products" :key="product.id"
                  class="border-b pb-2 last:border-b-0">
                <p class="font-medium">{{ product.name }}</p>
                <p class="text-sm text-gray-600">{{ product.description }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <button
        @click="verifyConnection"
        :disabled="loading"
        class="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {{ loading ? 'Verifying...' : 'Verify Connection' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref<string | null>(null)
const status = ref<any>(null)

const verifyConnection = async () => {
  loading.value = true
  error.value = null
  status.value = null
  
  try {
    const response = await $fetch('/api/firebase/verify-connection')
    status.value = response
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to verify Firebase connection'
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
}

// Verify connection on page load
onMounted(() => {
  verifyConnection()
})
</script>