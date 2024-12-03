import { ref } from 'vue'
import type { Product } from '~/types/firebase'

export function useProducts() {
  const { getDocuments } = useFirestore()
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      products.value = await getDocuments<Product>('products')
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
      console.error('Error fetching products:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  }
}