'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RRule } from 'rrule'
import DatePickerInput from '@/components/dateInputPicker/DateInputPicker.component'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Form, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import moment from 'moment'
import { useSaveScheduleMutation, ConsultantSchedule } from '@/redux/services/consultant.api'

/* ---------------- SCHEMA ---------------- */
const scheduleSchema = z
  .object({
    startDate: z.string().min(1, 'Start date is required'),
    until: z.string().min(1, 'End date is required'),
    byHour: z.array(z.number()).optional(),
    byWeekday: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(),
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

type ScheduleFormValues = z.infer<typeof scheduleSchema>

const hours = Array.from({ length: 24 }, (_, i) => i)
const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] as const
const weekdayLabels = { MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday', TH: 'Thursday', FR: 'Friday', SA: 'Saturday', SU: 'Sunday' }
type Weekday = (typeof weekdays)[number]

interface ScheduleFormProps {
  id?: number
  defaultValues?: Partial<ConsultantSchedule> & { startDate?: string; until?: string; byHour?: number[]; byWeekday?: Weekday[] }
  onSaved?: () => void
  isReadOnly?: boolean // ✅ new prop
}

export default function ScheduleForm({ id, defaultValues, onSaved, isReadOnly = false }: ScheduleFormProps) {
  const [saveSchedule, { isLoading }] = useSaveScheduleMutation()
  const { toast } = useToast()

  const weekdayNameToCode: Record<string, Weekday> = {
    Monday: 'MO',
    Tuesday: 'TU',
    Wednesday: 'WE',
    Thursday: 'TH',
    Friday: 'FR',
    Saturday: 'SA',
    Sunday: 'SU',
  }

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      startDate: defaultValues?.startDate || '',
      until: defaultValues?.endDate || defaultValues?.until || defaultValues?.endDate || '',
      byHour: defaultValues?.availableHours || defaultValues?.byHour || [],
      byWeekday: defaultValues?.availableDays?.map((d) => weekdayNameToCode[d]) || defaultValues?.byWeekday || [],
    },
  })

  console.log('iufbnvi', defaultValues)
  const byHour = form.watch('byHour') ?? []
  const byWeekday = form.watch('byWeekday') ?? []
  const startDateValue = form.watch('startDate')
  const untilValue = form.watch('until')

  useEffect(() => {
    const until = form.getValues('until')
    if (!startDateValue || !until) return
    const start = moment(startDateValue)
    const end = moment(until)
    if (start.isValid() && end.isValid() && end.isBefore(start, 'day')) {
      form.setValue('until', '')
    }
  }, [startDateValue])

  /* ---------------- TOGGLE LOGIC ---------------- */
  const toggleHour = (h: number) => !isReadOnly && form.setValue(byHour.includes(h) ? 'byHour' : 'byHour', byHour.includes(h) ? byHour.filter((x) => x !== h) : [...byHour, h], { shouldValidate: true })

  const toggleWeekday = (d: Weekday) => !isReadOnly && form.setValue('byWeekday', byWeekday.includes(d) ? byWeekday.filter((x) => x !== d) : [...byWeekday, d], { shouldValidate: true })

  const selectBusinessHours = () =>
    !isReadOnly &&
    form.setValue(
      'byHour',
      hours.filter((h) => h >= 9 && h <= 17),
      { shouldValidate: true },
    )
  const selectAllHours = () => !isReadOnly && form.setValue('byHour', hours, { shouldValidate: true })
  const clearAllHours = () => !isReadOnly && form.setValue('byHour', [], { shouldValidate: true })
  const selectAllWeekdays = () => !isReadOnly && form.setValue('byWeekday', [...weekdays], { shouldValidate: true })
  const clearAllWeekdays = () => !isReadOnly && form.setValue('byWeekday', [], { shouldValidate: true })

  /* ---------------- SUMMARY ---------------- */
  const generateSummary = () => {
    if (!startDateValue || !untilValue) return null
    const startMoment = moment(startDateValue)
    const endMoment = moment(untilValue)
    if (!startMoment.isValid() || !endMoment.isValid()) return null

    let summary = byWeekday.length > 0 ? `Runs on ${byWeekday.map((d) => weekdayLabels[d]).join(', ')}` : 'Runs daily'
    if (byHour.length > 0) {
      const sortedHours = [...byHour].sort((a, b) => a - b)
      const hourStrings = sortedHours.map((h) => `${h.toString().padStart(2, '0')}:00`)
      summary += sortedHours.length <= 3 ? ` at ${hourStrings.join(', ')}` : ` at ${sortedHours.length} selected hours (${hourStrings[0]} - ${hourStrings[sortedHours.length - 1]})`
    }
    summary += ` from ${startMoment.format('MMM D, YYYY')} to ${endMoment.format('MMM D, YYYY')}`
    return summary
  }

  const summary = generateSummary()

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (values: ScheduleFormValues) => {
    if (isReadOnly) return
    try {
      let dtstart = moment(values.startDate).startOf('day').toDate()
      if (values.byHour && values.byHour.length > 0) {
        dtstart = moment(values.startDate)
          .hour(Math.min(...values.byHour))
          .minute(0)
          .second(0)
          .toDate()
      }

      const ruleConfig: any = { freq: RRule.DAILY, dtstart, until: moment(values.until).endOf('day').toDate() }
      if (values.byHour && values.byHour.length > 0) ruleConfig.byhour = values.byHour
      if (values.byWeekday && values.byWeekday.length > 0) ruleConfig.byweekday = values.byWeekday.map((d) => RRule[d])

      const rule = new RRule(ruleConfig)

      const payload = id ? { id, rrule: rule.toString() } : { rrule: rule.toString() }
      await saveSchedule(payload).unwrap()

      toast({ title: 'Success', description: 'Schedule saved successfully' })
      form.reset({
        startDate: defaultValues?.startDate || '',
        until: defaultValues?.endDate || defaultValues?.until || '',
        byHour: defaultValues?.availableHours || defaultValues?.byHour || [],
        byWeekday: defaultValues?.byWeekday || [],
      })

      onSaved?.()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to save schedule',
        variant: 'destructive',
      })
    }
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div className="space-y-6 pt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto border p-6 rounded-lg max-w-3xl bg-white shadow-sm">
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerInput form={form} name="startDate" label="Start Date" disablePast readOnly={isReadOnly} />
            <DatePickerInput form={form} name="until" label="End Date" disablePast readOnly={isReadOnly} />
          </div>

          {/* Weekdays */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>
                {isReadOnly ? 'Selected Days' : 'Select Days'} <span className="text-red-500">*</span>
              </Label>
              {!isReadOnly && (
                <div className="flex gap-2">
                  <Button type="button" size="sm" variant="default" className="px-4 hover:bg-primary/80" onClick={selectAllWeekdays}>
                    All
                  </Button>
                  <Button type="button" size="sm" variant="secondary" onClick={clearAllWeekdays}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-2">
              {weekdays.map((d) => (
                <Button key={d} type="button" variant={byWeekday.includes(d) ? 'default' : 'outline'} onClick={() => toggleWeekday(d)} disabled={isReadOnly}>
                  {weekdayLabels[d].slice(0, 3)}
                </Button>
              ))}
            </div>
            <FormMessage>{form.formState.errors.byWeekday?.message}</FormMessage>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>
                {isReadOnly ? 'Selected Hours' : 'Select Hours'} <span className="text-red-500">*</span>
              </Label>
              {!isReadOnly && (
                <div className="flex gap-2">
                  <Button type="button" size="sm" variant="default" className="px-4 hover:bg-primary/80" onClick={selectAllHours}>
                    All
                  </Button>
                  <Button type="button" size="sm" variant="secondary" onClick={clearAllHours}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-2">
              {hours.map((h) => (
                <Button key={h} type="button" variant={byHour.includes(h) ? 'default' : 'outline'} className="text-xs sm:text-sm" onClick={() => toggleHour(h)} disabled={isReadOnly}>
                  {h.toString().padStart(2, '0')}:00
                </Button>
              ))}
            </div>
            <FormMessage>{form.formState.errors.byHour?.message}</FormMessage>
          </div>

          {/* Actions */}
          {!isReadOnly && (
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  form.reset({
                    startDate: defaultValues?.startDate || '',
                    until: defaultValues?.endDate || defaultValues?.until || '',
                    byHour: defaultValues?.availableHours || defaultValues?.byHour || [],
                    byWeekday: defaultValues?.byWeekday || [],
                  })
                }
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Schedule'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
