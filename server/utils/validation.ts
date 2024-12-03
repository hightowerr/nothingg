import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional()
})

export type UserSchemaType = z.infer<typeof userSchema>