import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { ref, computed } from 'vue'

export function useAuth() {
  const { $firebase } = useNuxtApp()
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  onAuthStateChanged($firebase.auth, (newUser) => {
    user.value = newUser
    loading.value = false
  })

  const signIn = async (email: string, password: string) => {
    try {
      error.value = null
      const userCredential = await signInWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      )
      return userCredential.user
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to sign in'
      throw e
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      )
      return userCredential.user
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to sign up'
      throw e
    }
  }

  const logout = async () => {
    try {
      error.value = null
      await signOut($firebase.auth)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to sign out'
      throw e
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    signUp,
    logout
  }
}