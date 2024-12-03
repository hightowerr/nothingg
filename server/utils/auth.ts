import { adminAuth } from './firebase-admin'
import type { DecodedIdToken } from 'firebase-admin/auth'

export async function verifyAuthToken(token: string): Promise<DecodedIdToken> {
  try {
    return await adminAuth.verifyIdToken(token)
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired authentication token'
    })
  }
}

export async function getUserById(uid: string) {
  try {
    return await adminAuth.getUser(uid)
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }
}

export async function createCustomToken(uid: string) {
  try {
    return await adminAuth.createCustomToken(uid)
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create custom token'
    })
  }
}