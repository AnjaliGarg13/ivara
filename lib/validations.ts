import { z } from 'zod'

export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  language: z.enum(['en', 'hi']).default('en'),
  city: z.string().max(100).optional(),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>
