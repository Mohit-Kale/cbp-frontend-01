import { australianPhoneValidator, charLimitMax_50, charLimitMax_75, charLimitMin_1 } from '@/utils'
import { z } from 'zod'

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(charLimitMin_1, { message: `Name is required *` })
    .max(charLimitMax_75, { message: `Name must not exceed ${charLimitMax_75} characters` }),
  email: z
    .string()
    .trim()
    .min(charLimitMin_1, { message: `Email is required *` })
    .max(charLimitMax_50, { message: `Email must not exceed ${charLimitMax_50} characters` })
    .email({ message: `Please enter a valid email address` }),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(charLimitMin_1, { message: `Subject is required *` }).max(50, { message: `Subject must not exceed 50 characters` }),
  message: z.string().trim().min(charLimitMin_1, { message: `Message is required *` }).max(1000, { message: `Message must not exceed 1000 characters` }),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
