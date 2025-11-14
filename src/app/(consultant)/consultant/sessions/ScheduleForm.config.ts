import moment from 'moment'
import { z } from 'zod'

const scheduleSchema = z
  .object({
    startDate: z.string().min(1, 'Start date is required'),
    until: z.string().min(1, 'End date is required'),

    // ✅ require at least one selected hour
    byHour: z.array(z.number()).min(1, 'At least one hour is required'),

    // ✅ require at least one selected weekday
    byWeekday: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).min(1, 'At least one weekday is required'),
  })
  .refine(
    (data) => {
      const start = moment(data.startDate)
      const end = moment(data.until)
      if (!start.isValid() || !end.isValid()) return false
      return end.isSameOrAfter(start, 'day')
    },
    { message: 'End date must be same or after start date', path: ['until'] },
  )
