import { z } from 'zod'

export const scheduleSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  until: z.string().min(1, 'Until date is required'),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
  weekStart: z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']),
  byWeekday: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(),
  byHour: z.array(z.number()).optional(),
})

export type ScheduleFormValues = z.infer<typeof scheduleSchema>
