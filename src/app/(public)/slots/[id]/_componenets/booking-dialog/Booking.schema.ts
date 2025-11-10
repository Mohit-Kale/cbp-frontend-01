import z from 'zod'

const bookingSchema = z.object({
  date: z.date(),
  time: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
})

export type BookingSchema = z.infer<typeof bookingSchema>
