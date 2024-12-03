import { verifyAuthToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token } = body

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  try {
    const decodedToken = await verifyAuthToken(token)
    return {
      valid: true,
      user: decodedToken
    }
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid token'
    }
  }
})