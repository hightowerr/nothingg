import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { serviceAccount } from '../config/firebase.config'

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount)
})

// Initialize services
const adminDb = getFirestore(app)
const adminAuth = getAuth(app)

// Collection references
export const collections = {
  adminDb,
  users: adminDb.collection('users'),
  subscriptions: adminDb.collection('subscriptions'),
  products: adminDb.collection('products'),
  usernames: adminDb.collection('usernames')
} as const

// Export initialized services
export { adminDb, adminAuth }