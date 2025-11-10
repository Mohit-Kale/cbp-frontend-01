'use client'

import { useEffect, useState } from 'react'
import moment from 'moment'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
  form: any
  name: string
  label?: string
  placeholder?: string
  format?: string
  disablePast?: boolean
  disableFuture?: boolean
  readOnly?: boolean
}

export default function DatePickerInput({ form, name, label, placeholder = 'Select date', format = 'MM/DD/YYYY', disablePast = false, disableFuture = false, readOnly = false }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [month, setMonth] = useState<Date>(moment().toDate())

  const fieldValue = form.watch(name)

  // ✅ Sync displayed input when form value changes
  useEffect(() => {
    if (!fieldValue) {
      setInputValue('')
      return
    }
    const parsed = moment(fieldValue)
    setInputValue(parsed.isValid() ? parsed.format(format) : fieldValue)
  }, [fieldValue, format])

  const today = moment()
  const currentYear = today.year()
  const fromYear = disablePast ? currentYear : 1900
  const toYear = disableFuture ? currentYear : currentYear + 20

  const isDateDisabled = (date: Date) => {
    const m = moment(date)
    if (disablePast && m.isBefore(today, 'day')) return true
    if (disableFuture && m.isAfter(today, 'day')) return true
    return false
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel className="text-sm font-medium">
              {label}
              <span className="text-destructive"> *</span>
            </FormLabel>
          )}

          {!readOnly ? (
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="relative w-full">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />

                    <Input
                      className="pl-10 h-10 text-sm"
                      placeholder={placeholder}
                      value={inputValue}
                      onChange={(e) => {
                        const val = e.target.value
                        setInputValue(val)
                        const parsed = moment(val, format, true)
                        if (parsed.isValid()) {
                          field.onChange(parsed.format(format))
                          setMonth(parsed.toDate())
                        } else {
                          field.onChange(val)
                        }
                      }}
                    />
                  </div>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-auto shadow-md border rounded-md" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={fieldValue && moment(fieldValue).isValid() ? moment(fieldValue).toDate() : undefined}
                  onSelect={(date) => {
                    const formatted = date ? moment(date).format(format) : ''
                    field.onChange(formatted)
                    setInputValue(formatted)
                    setMonth(date || moment().toDate())
                  }}
                  disabled={isDateDisabled}
                  month={month}
                  onMonthChange={setMonth}
                  fromYear={fromYear}
                  toYear={toYear}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <FormControl>
              <Input className="pl-10 h-10 text-sm bg-gray-100 cursor-not-allowed" placeholder={placeholder} value={inputValue} readOnly />
            </FormControl>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
