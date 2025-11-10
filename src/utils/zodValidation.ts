import z, { ZodString } from 'zod'
import { charLimitMax_50, charLimitMin_1, messages } from './constantMessage.utils'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import moment from 'moment'
// password complexity validator
export const passwordComplexity = (messagePrefix = 'Password') => {
  return z
    .string()
    .trim()
    .min(charLimitMin_1)
    .max(charLimitMax_50)
    .refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\S]{8,}$/.test(val), {
      message: `${messagePrefix} must be at least 8 characters and include uppercase, lowercase, number, and special character with no spaces`,
    })
}
export const realisticDateValidator = ({ invalidMessage = messages?.invalidDateFormat, requiredMessage = messages?.required }: { invalidMessage?: string; requiredMessage?: string }) => {
  return z
    .string({
      invalid_type_error: invalidMessage,
    })
    .refine(
      (val) => {
        if (!val) return false // for required
        const parsed = moment(val, 'MM/DD/YYYY', true)
        return parsed.isValid()
      },
      {
        message: invalidMessage,
      },
    )
    .refine(
      (val) => {
        const parsed = moment(val, 'MM/DD/YYYY', true)
        return parsed.isSameOrAfter(moment('01/01/1950', 'MM/DD/YYYY')) && parsed.isSameOrBefore(moment())
      },
      {
        message: invalidMessage,
      },
    )
}
// australian phone validator
export const australianPhoneValidator = (invalidMessage = messages?.invalidPhoneNumber) =>
  z
    .string()
    .min(charLimitMin_1)
    .refine(
      (value) => {
        const phone = parsePhoneNumberFromString(value, 'IN')
        return phone?.isValid() ?? false
      },
      {
        message: invalidMessage,
      },
    )

// no spaces validator
export const noSpaces = () => {
  return (schema: ZodString) =>
    schema.refine((val) => !/\s/.test(val), {
      message: messages.invalidType,
    })
}
