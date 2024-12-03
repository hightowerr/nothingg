export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return
  
  if (!isAuthenticated.value && !to.path.startsWith('/auth')) {
    return navigateTo('/auth/login')
  }
  
  if (isAuthenticated.value && to.path.startsWith('/auth')) {
    return navigateTo('/')
  }
})