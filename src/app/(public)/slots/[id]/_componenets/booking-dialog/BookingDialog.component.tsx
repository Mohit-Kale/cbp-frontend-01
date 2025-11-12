'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { useReduxSelector } from '@/hooks/redux.hook'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DatePickerInput from '@/components/dateInputPicker/DateInputPicker.component'
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import { useCreateBookingMutation, BookingPayload } from '@/redux/services/consultant.api'
import { BookingSchema } from './Booking.schema'

type BookingDialogProps = {
  showBookingForm: boolean
  setShowBookingForm: (val: boolean) => void
  selectedSlot: any
  consultant: any
  events: any[]
  source: { fromCalendar: boolean }
  onDateChange?: (date: string) => void
}

export default function BookingDialog({ showBookingForm, setShowBookingForm, selectedSlot, consultant, events, source = { fromCalendar: true }, onDateChange }: BookingDialogProps) {
  const today = moment().format('YYYY-MM-DD')

  const formatSlotLabel = (start: string, end: string) => {
    console.log({ start, end })
    return `${moment(start).utc().format('HH:mm')} - ${moment(end).utc().format('HH:mm')}`
  }

  const [selectedDate, setSelectedDate] = useState(selectedSlot?.date || today)

  const form = useForm<BookingSchema>({
    defaultValues: {
      date: selectedSlot?.date ? moment(selectedSlot.date).toDate() : moment().toDate(),
      time: selectedSlot?.time ? formatSlotLabel(selectedSlot.start, selectedSlot.end) : '',
      notes: '',
    },
  })

  const [createBooking, { isLoading }] = useCreateBookingMutation()

  useEffect(() => {
    // If opening from calendar → keep prefilled date/time
    if (source?.fromCalendar) {
      form.reset({
        date: selectedSlot?.date ? moment(selectedSlot.date).toDate() : moment().toDate(),
        time: selectedSlot?.time ? formatSlotLabel(selectedSlot.start, selectedSlot.end) : '',
        notes: '',
      })
      setSelectedDate(selectedSlot?.date || today)
    }

    // If opening in editable mode → reset clean
    else {
      form.reset({
        date: undefined,
        time: '',
        notes: '',
      })
      setSelectedDate(undefined)
    }
  }, [selectedSlot, source?.fromCalendar])

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.date) {
        const formattedDate = moment(values.date).format('YYYY-MM-DD')
        setSelectedDate(formattedDate)
        if (source?.fromCalendar === false && onDateChange) {
          onDateChange(formattedDate)
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [form, onDateChange, source])

  const availableTimes = useMemo(() => {
    if (!selectedDate) return []

    return events
      .filter((e) => e.type === 'available' && moment(e.start).format('YYYY-MM-DD') === selectedDate)
      .map((e) => {
        console.log(e)
        return {
          slotId: e.id,
          label: formatSlotLabel(e.start, e.end),
          start: e.start,
          end: e.end,
        }
      })
  }, [events, selectedDate])

  const onSubmit = async (values: any) => {
    const chosenSlot = availableTimes.find((t) => t.label === values.time)
    if (!chosenSlot) {
      toast.error('Please select a valid time slot')
      return
    }

    const payload: BookingPayload = {
      consultantId: consultant.id,
      bookingDate: moment().format('YYYY-MM-DD'),
      scheduleDate: moment(selectedDate).format('YYYY-MM-DD'),
      startTime: moment(chosenSlot.start).utc().format('HH:mm'),
      endTime: moment(chosenSlot.end).utc().format('HH:mm'),

      notes: values.notes || '',
    }
    console.log('payload', payload)
    try {
      const res = await createBooking(payload).unwrap()
      setShowBookingForm(false)
      console.log('Booking Response:', res)
    } catch (err: any) {
      console.log('Booking failed', err)
    }
  }
  console.log({ availableTimes: availableTimes })

  return (
    <Dialog
      open={showBookingForm}
      onOpenChange={(open) => {
        setShowBookingForm(open)
        if (!open) {
          form.reset({
            date: undefined,
            time: '',
            notes: '',
          })
          setSelectedDate(undefined)
        }
      }}
    >
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted/50">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Book Session with {consultant.fullName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-4">
            <DatePickerInput form={form} name="date" label="Select Schedule Date" format="YYYY-MM-DD" disablePast placeholder="Pick a date" readOnly={source?.fromCalendar || false} />

            <div>
              <Label>Select Time</Label>
              <Select onValueChange={(val) => form.setValue('time', val)} value={form.watch('time')}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select Time Slot" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.length > 0 ? (
                    availableTimes.map((slot) => (
                      <SelectItem key={slot.slotId} value={slot.label}>
                        {slot.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-muted-foreground">{selectedDate ? 'No available times for this date' : 'Select a date first'}</div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Notes (optional)</Label>
              <Input {...form.register('notes')} placeholder="Any additional info..." />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setShowBookingForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
