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

  // Push parent events into FullCalendar whenever events change
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
  const [userTimeZone, setUserTimeZone] = useState<string>('local')

  // Detect browser timezone on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz) setUserTimeZone(tz)
    } catch (err) {
      console.warn('Could not detect timezone, falling back to local', err)
    }
  }, [])
  return (
    <div className="bg-card  sm:p-6 rounded-lg">
      <FullCalendar
        timeZone={userTimeZone} //browser se detect kl
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'multiMonthYear,timeGridWeek,timeGridDay',
        }}
        views={{
          multiMonthYear: { type: 'multiMonth', duration: { years: 1 } },
        }}
        selectable={false}
        selectMirror={true}
        slotDuration="01:00:00"
        slotLabelInterval="01:00"
        events={events}
        eventClassNames={(arg) => (arg.event.extendedProps.type === 'available' ? ['fc-event-available', 'cursor-pointer'] : ['fc-event-booked'])}
        eventContent={(arg) => {
          const isAvailable = arg.event.title?.toLowerCase() === 'available'
          const color = isAvailable ? '#16a34a' : '#6b7280'
          const Icon = isAvailable ? CheckCircle2 : XCircle
          return (
            <div className="flex items-center gap-1.5">
              <Icon className={`w-4 h-4`} style={{ color }} />
              <span className="text-[16px] font-normal hidden sm:inline" style={{ color }}>
                {arg.event.title}
              </span>
            </div>
          )
        }}
        // slotMinTime="06:00:00"
        // slotMaxTime="23:00:00"
        allDaySlot={false}
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
      />

      <div className="calendar-legend flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 pr-3 sm:pr-0">
          <div className="w-4 h-4 rounded bg-[#16a34a]"></div>
          <span className="text-sm font-medium text-[#16a34a] ">Available slots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-400"></div>
          <span className="text-sm font-medium text-gray-600">Booked sessions</span>
        </div>
      </div>
    </div>
  )
}
