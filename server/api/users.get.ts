import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return users
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching users'
    })
  }
})