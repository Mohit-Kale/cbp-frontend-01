import { messages } from '@/utils'
import { ZodErrorMap } from 'zod'

export const globalZodErrorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case 'too_small':
      return { message: messages.required }

    case 'invalid_type':
    case 'too_big':
    case 'invalid_union':
      return { message: messages.invalidType }
    case 'invalid_string':
      if (issue.validation === 'url') return { message: messages.invalidUrl }
      if (issue.validation === 'email') return { message: messages.invalidEmail }
      return { message: messages.invalidType }

    case 'custom':
      return { message: ctx.defaultError }

    default:
      return { message: ctx.defaultError }
  }
}
