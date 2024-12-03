import { collections } from '../../utils/firebase-admin'
import type { Product } from '~/types/firebase'

export default defineEventHandler(async (event) => {
  try {
    const products: Product[] = [
      {
        id: 'free-tier',
        name: 'Free Tier',
        description: 'Basic access to Nothingg platform',
        type: 'free',
        price: 0,
        features: [
          'Basic access',
          'Limited storage (5GB)',
          'Community support'
        ],
        isActive: true
      },
      {
        id: 'pro-tier',
        name: 'Pro Tier',
        description: 'Premium access with advanced features',
        type: 'pro',
        price: 9.99,
        features: [
          'Unlimited access',
          'Advanced features',
          'Priority support',
          'Unlimited storage',
          'Custom domain'
        ],
        isActive: true
      }
    ]

    const batch = collections.adminDb.batch()

    for (const product of products) {
      const ref = collections.products.doc(product.id)
      batch.set(ref, product)
    }

    await batch.commit()
    
    return { success: true, message: 'Products initialized successfully' }
  } catch (error) {
    console.error('Error initializing products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to initialize products'
    })
  }
})