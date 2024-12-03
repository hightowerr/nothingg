import { verifyAuthToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const publicPaths = ['/api/auth/login', '/api/auth/register']
  
  if (publicPaths.includes(event.path)) {
    return
  }

  const token = event.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'No authentication token provided'
    })
  }

  try {
    const decodedToken = await verifyAuthToken(token)
    event.context.auth = decodedToken
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid authentication token'
    })
  }
})