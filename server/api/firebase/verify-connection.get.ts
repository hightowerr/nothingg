import { collections } from '../../utils/firebase-admin'

export default defineEventHandler(async () => {
  try {
    // Try to fetch products collection
    const productsSnapshot = await collections.products.get()
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Get collection statistics
    const stats = {
      products: productsSnapshot.size,
      users: (await collections.users.count().get()).data().count,
      subscriptions: (await collections.subscriptions.count().get()).data().count,
      usernames: (await collections.usernames.count().get()).data().count
    }

    return {
      status: 'connected',
      collections: stats,
      products
    }
  } catch (error) {
    console.error('Firebase connection error:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to verify Firebase connection'
    })
  }
})