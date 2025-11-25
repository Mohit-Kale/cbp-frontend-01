import { realisticDateValidator } from '@/utils'
import { phoneSchema } from '@/utils/phoneValidator'
import { z } from 'zod'

export const UserProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(100, 'Full name is too long'),
  email: z.string().email('Invalid email address'),
  phone: phoneSchema,

  street: z.string().min(2, 'Street is required').max(100, 'Street is too long'),
  city: z.string().min(2, 'City is required').max(100, 'City is too long'),
  state: z.string().min(2, 'State is required').max(100, 'State is too long'),
  zipcode: z.string().min(2, 'Zipcode is required').max(100, 'Zipcode is too long'),
})

export type TUserProfile = z.infer<typeof UserProfileSchema>
