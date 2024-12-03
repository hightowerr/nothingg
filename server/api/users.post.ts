import { prisma } from '../utils/prisma'
import { userSchema } from '../utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = userSchema.parse(body)
    
    const user = await prisma.user.create({
      data: validatedData
    })
    
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : 'Invalid user data'
    })
  }
})