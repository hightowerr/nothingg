import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  type QueryConstraint
} from 'firebase/firestore'
import type { UserProfile } from '~/types/firebase'

export function useFirestore() {
  const { $firebase } = useNuxtApp()
  const error = ref<string | null>(null)

  const getDocument = async <T>(collectionName: string, id: string): Promise<T | null> => {
    try {
      error.value = null
      const docRef = doc($firebase.firestore, collectionName, id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() as T : null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to get document'
      throw e
    }
  }

  const getDocuments = async <T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> => {
    try {
      error.value = null
      const collectionRef = collection($firebase.firestore, collectionName)
      const q = query(collectionRef, ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to get documents'
      throw e
    }
  }

  const setDocument = async <T extends object>(
    collectionName: string,
    id: string,
    data: T
  ): Promise<void> => {
    try {
      error.value = null
      const docRef = doc($firebase.firestore, collectionName, id)
      await setDoc(docRef, data)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to set document'
      throw e
    }
  }

  return {
    error,
    getDocument,
    getDocuments,
    setDocument
  }
}