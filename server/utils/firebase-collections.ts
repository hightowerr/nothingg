import { collections } from './firebase-admin'
import type { Product } from '~/types/firebase'

export async function initializeCollections() {
  const batch = collections.adminDb.batch()

  // Initialize Products
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

  // Add products
  for (const product of products) {
    const ref = collections.products.doc(product.id)
    batch.set(ref, product)
  }

  // Create indexes collection for username uniqueness
  const usernameIndexRef = collections.adminDb.collection('indexes').doc('usernames')
  batch.set(usernameIndexRef, {
    lastUpdated: Date.now()
  })

  await batch.commit()
  
  return {
    products,
    collections: ['products', 'users', 'subscriptions', 'usernames', 'indexes']
  }
}