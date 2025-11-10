import { realisticDateValidator } from '@/utils'
import { z } from 'zod'

export const UserProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(100, 'Full name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),

  street: z.string().min(2, 'Street is required').max(100, 'Street is too long'),
  city: z.string().min(2, 'City is required').max(100, 'City is too long'),
  state: z.string().min(2, 'State is required').max(100, 'State is too long'),
  zipcode: z.string().min(2, 'Zipcode is required').max(100, 'Zipcode is too long'),
})

export type TUserProfile = z.infer<typeof UserProfileSchema>
