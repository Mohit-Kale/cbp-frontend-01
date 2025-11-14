// import z from 'zod'

// const bookingSchema = z.object({
//   date: z.date(),
//   time: z.string().min(1, 'Please select a time slot'),
//   notes: z.string().optional(),
// })

// export type BookingSchema = z.infer<typeof bookingSchema>

// Booking.schema.ts
import z from 'zod'

export const bookingSchema = z.object({
  date: z.coerce.date({ required_error: 'Please select a date' }).refine(
    (d) => {
      // allow selecting today or future — compare by YYYY-MM-DD to avoid time-of-day issues
      const selected = new Date(d)
      const today = new Date()
      // zero out time portion for comparison
      selected.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      return selected >= today
    },
    {
      message: 'Please select a valid (today or future) date',
    },
  ),
  time: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
})

export type BookingSchema = z.infer<typeof bookingSchema>
