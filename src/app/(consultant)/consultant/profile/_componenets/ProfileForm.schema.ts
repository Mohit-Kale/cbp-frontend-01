import { phoneSchema } from '@/utils/phoneValidator'
import { z } from 'zod'

export const ReferenceSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  title: z.string().trim().min(1, 'Title is required'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
  phone: phoneSchema,
})

export const ProfileSchema = z.object({
  // Personal Information
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.string().email().optional(),
  phone: phoneSchema,
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipcode: z.string().min(1, 'Zipcode is required'),
  // References
  references: z.array(ReferenceSchema).min(2, 'Please add at least two reference'),
  specialties: z.array(z.number()).min(1, 'Please select at least one specialty'),
  currencyId: z.number({ invalid_type_error: 'Select a currency' }).refine((val) => val > 0, { message: 'Select a currency' }),
  hourlyRate: z
    .string()
    .min(1, 'Hourly rate is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Hourly rate must be a positive number',
    }),
  // Resume Upload (frontend-required but backend-ignored)
  resumeUrl: z.string().url('Resume file is required'), // ✅ make required now
})

export type TProfile = z.infer<typeof ProfileSchema>
