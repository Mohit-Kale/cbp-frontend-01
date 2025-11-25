import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'

export const phoneSchema = z
  .string()
  .nonempty('Phone number is required')
  .refine(
    (val) => {
      // Don't remove spaces for validation, as react-phone-number-input expects them
      const cleaned = val.trim()
      return isValidPhoneNumber(cleaned)
    },
    {
      message: 'Invalid phone number',
    },
  )
