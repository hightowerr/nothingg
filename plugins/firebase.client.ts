import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { firebaseConfig } from '~/config/firebase.config'

export default defineNuxtPlugin(async () => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  
  // Only initialize analytics if supported in current environment
  const analytics = await isSupported() ? getAnalytics(app) : null

  return {
    provide: {
      firebase: {
        app,
        auth,
        firestore,
        analytics
      }
    }
  }
})