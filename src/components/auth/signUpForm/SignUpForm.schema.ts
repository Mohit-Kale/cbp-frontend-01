import { z } from 'zod'
import { charLimitMax_50, charLimitMax_75, charLimitMin_1 } from '@/utils/constantMessage.utils'
import { passwordComplexity } from '@/utils'
import { phoneSchema } from '@/utils/phoneValidator'

export const signUpSchema = z
  .object({
    name: z.string().trim().min(charLimitMin_1).max(charLimitMax_75),
    email: z.string().trim().min(charLimitMin_1).max(charLimitMax_50).email(),
    phone: phoneSchema,
    password: passwordComplexity(),
    confirmPassword: passwordComplexity(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
