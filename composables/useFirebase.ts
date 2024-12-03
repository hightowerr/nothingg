import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore'
import type { UserProfile, Subscription } from '~/types/firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export function useFirebase() {
  const createUser = async (email: string, password: string, displayName: string | null = null) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      photoURL: null,
      username: null,
      isEmailVerified: user.emailVerified,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    await setDoc(doc(db, 'users', user.uid), userProfile)

    const subscription: Subscription = {
      uid: user.uid,
      plan: 'free',
      status: 'active',
      startDate: Date.now(),
      endDate: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 year from now
      features: ['basic_access', 'limited_storage'],
      autoRenew: false
    }

    await setDoc(doc(db, 'subscriptions', user.uid), subscription)

    return { user, profile: userProfile }
  }

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
    return { 
      user: userCredential.user, 
      profile: userDoc.data() as UserProfile 
    }
  }

  const signOut = () => firebaseSignOut(auth)

  return {
    auth,
    db,
    createUser,
    signIn,
    signOut
  }
}