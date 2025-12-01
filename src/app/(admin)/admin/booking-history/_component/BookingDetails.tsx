'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'
import { useRouter } from 'next/navigation'
import { AdminBookingItem } from '@/redux/services/admin/booking.api'
import { useCurrenciesQuery } from '@/redux/services/consultant.api'
import { Star, User2, UserCircle2 } from 'lucide-react'

interface Props {
  data: AdminBookingItem
}

export default function BookingDetails({ data }: Props) {
  const router = useRouter()
  const { data: currencies } = useCurrenciesQuery()

  const currencySymbol = currencies?.find((c) => c.id === data.currencyId)?.symbol || '$'

  return (
    <div className="min-h-screen  p-3 sm:p-4 md:p-6 lg:p-10">
      <Button onClick={() => router.back()} className="mb-4">
        Back
      </Button>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ">Booking #{data.id}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">View and manage booking details</p>
          </div>
        </div>

        {/* Booking Info */}
        <section className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-5 md:mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Booking Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Detail label="Status" value={<StatusBadge value={data.status} />} />

            <Detail label="Booking Date" value={formatDateDisplay(data.bookingDate)} />

            <Detail label="Time" value={formatTimeRangeWithTZ(data.bookingDate, data.startTime, data.endTime)} />

            <Detail label="Scheduled Date" value={data.scheduleDate || '—'} />

            <Detail label="Amount" value={`${currencySymbol}${data.amount}`} />

            {/* Meeting Link */}
            <Detail
              label="Meeting Link"
              value={
                data.meetingLink ? (
                  <a href={data.meetingLink} target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-700 hover:underline break-all text-sm transition-colors inline-flex items-center gap-1 group">
                    <span className="line-clamp-2">{data.meetingLink}</span>
                    <svg className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">Not provided</span>
                )
              }
            />
          </div>

          {/* Info note */}
          {!data.meetingLink && (
            <div className="mt-5 flex items-start gap-3 text-xs sm:text-sm text-amber-800 bg-amber-50 px-4 py-3 rounded-lg border border-amber-200">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Meeting link not added yet. You may want to verify if the consultant has shared it.</span>
            </div>
          )}
        </section>

        {/* Consultant + Customer */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <InfoBlock title="Consultant" info={data.consultant} icon={<User2 className="w-10 h-10 text-primary" />} />
          <InfoBlock title="Customer" info={data.customer} icon={<UserCircle2 className="w-10 h-10 text-primary" />} />
        </section>

        {/* Payout */}
        {data.consultantPayout && (
          <section className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Payout Information For Consultant</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Detail label="Amount Consultant Got" value={`${data.consultantPayout.currency.symbol}${data.consultantPayout.amount}`} />
              <Detail label="Platform Fee" value={`${data.consultantPayout.currency.symbol}${data.consultantPayout.platformFee}`} />
              <Detail label="Status" value={<StatusBadge value={data.consultantPayout.status} />} />
            </div>

            {/* Extra condition */}
            {Number(data.consultantPayout.platformFee) <= 0 && (
              <div className="mt-5 flex items-start gap-3 text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-lg">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>This payout does not include a platform fee.</span>
              </div>
            )}
          </section>
        )}

        {/* Rating Section */}
        {data.rating && (
          <section className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Rating & Feedback</h2>
            </div>

            <div className="p-4 sm:p-5rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">{data.rating?.rating ?? 0}</span>

                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => {
                    const isFilled = i < (data.rating?.rating ?? 0)
                    return <Star key={i} className={`w-5 h-5 sm:w-6 sm:h-6 ${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 fill-slate-300'}`} fill={isFilled ? 'currentColor' : 'none'} />
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Feedback</span>
                <p className="text-sm text-slate-700 leading-relaxed">{data.rating?.note || 'No feedback provided'}</p>
              </div>
            </div>
          </section>
        )}

        {/* Additional Notes */}
        {data.notes && (
          <section className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Additional Notes</h2>
            </div>
            <div className="p-4 sm:p-5rounded-xl  text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words">{data.notes}</div>
          </section>
        )}
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-1.5 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">{label}</span>
      <div className="font-semibold text-slate-900 break-words text-sm sm:text-base">{value}</div>
    </div>
  )
}

function InfoBlock({ title, info, icon }: { title: string; info: AdminBookingItem['consultant'] | AdminBookingItem['customer']; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-5 md:mb-6">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
      </div>

      <div className="space-y-4">
        <Detail label="Name" value={info.fullName} />
        <Detail
          label="Email"
          value={
            <a href={`mailto:${info.email}`} className="text-blue-600 hover:text-blue-700 hover:underline transition-colors break-all">
              {info.email}
            </a>
          }
        />
        <Detail
          label="Phone"
          value={
            info.phone ? (
              <a href={`tel:${info.phone}`} className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                {info.phone}
              </a>
            ) : (
              <span className="text-muted-foreground italic">—</span>
            )
          }
        />
      </div>
    </div>
  )
}

// Helpers
function formatDateDisplay(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function formatTimeRangeWithTZ(bookingDate: string, startTime: string, endTime: string) {
  const tz = getLocalTimeZone()
  const start = toDate(bookingDate, startTime)
  const end = toDate(bookingDate, endTime)
  const fmt: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }
  const startStr = start ? new Intl.DateTimeFormat(undefined, fmt).format(start) : startTime
  const endStr = end ? new Intl.DateTimeFormat(undefined, fmt).format(end) : endTime
  return `${startStr} - ${endStr} (${tz})`
}

function toDate(dateStr: string, timeStr: string) {
  try {
    const iso = dateStr.includes('T') ? dateStr : `${dateStr}T${timeStr}`
    return new Date(iso)
  } catch {
    return null as unknown as Date
  }
}

function getLocalTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'Local'
  }
}
