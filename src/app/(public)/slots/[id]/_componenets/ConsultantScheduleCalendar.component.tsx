'use client'

import React, { useEffect, useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import '@/styles/fullcalendar.css'
import moment from 'moment'
import { CheckCircle2, XCircle } from 'lucide-react'

export type TOnBookPayload = { start: Date; end: Date; title?: string; viewType?: string }

interface ConsultantScheduleCalendarProps {
  events: any[]
  onBook?: (payload: TOnBookPayload) => void
  onRangeChange?: (range: { start: string; end: string }) => void
}

export default function ConsultantScheduleCalendar({ events, onBook, onRangeChange }: ConsultantScheduleCalendarProps) {
  const calendarRef = useRef<FullCalendar | null>(null)
  const [viewType, setViewType] = useState('timeGridWeek')
  const [userTimeZone, setUserTimeZone] = useState<string>('local')

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz) setUserTimeZone(tz)
    } catch {
      console.warn('Could not detect timezone, falling back to local')
    }
  }, [])

  useEffect(() => {
    const api = (calendarRef.current as any)?.getApi?.()
    if (!api) return
    Promise.resolve().then(() => {
      try {
        api.removeAllEventSources()
        api.addEventSource(events || [])
        api.refetchEvents && api.refetchEvents()
      } catch (err) {
        console.warn('Failed to refresh calendar events', err)
      }
    })
  }, [events])

  return (
    <div className="bg-card sm:p-6 rounded-lg">
      <FullCalendar
        timeZone={userTimeZone}
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'multiMonthMonth,timeGridWeek,timeGridDay',
        }}
        views={{
          multiMonthMonth: {
            type: 'multiMonth',
            duration: { months: 1 },
            dayMaxEventRows: 1, // show single summary row
          },
        }}
        selectable={false}
        selectMirror={true}
        slotDuration="01:00:00"
        slotLabelInterval="01:00"
        allDaySlot={false}
        events={events}
        eventClassNames={(arg) => {
          const title = arg.event.title?.toLowerCase()
          if (title === 'available') return ['fc-event-available', 'cursor-pointer']
          if (title === 'booked') return ['fc-event-booked']
          if (title === 'expired') return ['fc-event-expired']
          return []
        }}
        eventContent={(arg) => {
          // Custom rendering in multi-month view
          if (arg.view.type === 'multiMonthMonth') {
            const title = arg.event.title?.toLowerCase()
            const label = title === 'available' ? 'Slot Available' : title === 'booked' ? 'Booked' : title

            return {
              html: `
        <div class="flex flex-col">
          <div class="flex items-center border-b border-gray-600">
            <span class="text-xs font-medium ">${label}</span>
          </div>
          <span class="text-xs text-gray-600 font-medium">${moment(arg.event.start).utc().format('HH:mm')}</span>
          <span class="text-xs text-gray-600 font-medium">${moment(arg.event.end).utc().format('HH:mm')}</span>
        </div>`,
            }
          }

          // TimeGrid or DayGrid view rendering
          const title = arg.event.title?.toLowerCase()
          const isAvailable = title === 'available'
          const isExpired = title === 'expired'
          const color = isAvailable ? '#16a34a' : title === 'booked' ? '#9ca3af' : '#9ca3af'
          const Icon = isAvailable ? CheckCircle2 : XCircle
          const label = isAvailable ? 'Slot Available' : title === 'booked' ? 'Booked' : title

          return (
            <div className="flex items-center gap-1.5">
              <Icon className="w-4 h-4" style={{ color }} />
              <span className={`text-[16px] font-normal hidden sm:inline ${isExpired ? 'line-through opacity-60' : ''}`} style={{ color }}>
                {label}
              </span>
            </div>
          )
        }}
        eventClick={(info) => {
          if (info.event.extendedProps.type === 'available' && onBook) {
            onBook({
              start: info.event.start!,
              end: info.event.end || info.event.start!,
              title: info.event.title,
              viewType,
            })
          }
        }}
        datesSet={(arg) => {
          setViewType(arg.view.type)
          if (onRangeChange) {
            onRangeChange({
              start: moment(arg.start).format('YYYY-MM-DD'),
              end: moment(arg.end).format('YYYY-MM-DD'),
            })
          }
        }}
        eventDidMount={(arg) => {
          // Modify the default popover for multimonth
          if (arg.view.type === 'multiMonthMonth') {
            const title = arg.event.title
            const start = moment(arg.event.start).utc().format('HH:mm')
            const end = moment(arg.event.end).utc().format('HH:mm')
            const el = arg.el as HTMLElement

            // Tooltip-like popover on hover (optional)
            el.setAttribute('title', `${title}\n${start} - ${end}`)
          }
        }}
      />

      {/* Legend */}
      <div className={`calendar-legend flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 border-t border-border ${viewType === 'multiMonthMonth' ? 'pt-24' : 'pt-12'}`}>
        <div className="flex items-center gap-2 pr-3 sm:pr-0">
          <div className="w-4 h-4 rounded bg-[#16a34a]"></div>
          <span className="text-sm font-medium text-[#16a34a]">Available slots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-400"></div>
          <span className="text-sm font-medium text-gray-600">Booked sessions</span>
        </div>
      </div>
    </div>
  )
}
