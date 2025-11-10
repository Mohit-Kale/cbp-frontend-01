import { z } from 'zod'

export const ReferenceSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  email: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val))
    .optional()
    .or(z.literal('')),
  phone: z.string().trim().optional(),
})

export const ProfileSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email().optional(),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),

  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  // References
  references: z.array(ReferenceSchema).optional(),
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
