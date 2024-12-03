import type { ServiceAccount } from 'firebase-admin/app'

export const serviceAccount: ServiceAccount = {
  projectId: "nothing-app-89257",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
}