import '@/lib/zod'
import { passwordComplexity } from '@/utils'
import { z } from 'zod'
import { charLimitMax_50, charLimitMin_1 } from '@/utils/constantMessage.utils'

export const signInSchema = z.object({
  email: z.string().trim().min(charLimitMin_1).max(charLimitMax_50).email(),
  password: passwordComplexity(),
})

export type SignInFormData = z.infer<typeof signInSchema>
