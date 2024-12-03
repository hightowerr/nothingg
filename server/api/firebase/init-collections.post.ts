import { initializeCollections } from '../../utils/firebase-collections'

export default defineEventHandler(async (event) => {
  try {
    const result = await initializeCollections()
    
    return {
      success: true,
      message: 'Firebase collections initialized successfully',
      ...result
    }
  } catch (error) {
    console.error('Error initializing collections:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Failed to initialize collections'
    })
  }
})