import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
})

export const adminDb = getFirestore(app)
export const adminAuth = getAuth(app)

// Firestore collection references
export const collections = {
  users: adminDb.collection('users'),
  subscriptions: adminDb.collection('subscriptions'),
  products: adminDb.collection('products'),
  usernames: adminDb.collection('usernames')
} as const