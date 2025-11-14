'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useReduxSelector } from '@/hooks/redux.hook'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { useConsultantAvailabilityQuery, useConsultantsQuery } from '@/redux/services/consultant.api'
import SlotsComponent from './_componenets/Slots.component'
import moment from 'moment'
import BookingDialog from './_componenets/booking-dialog/BookingDialog.component'
import { toast } from 'sonner'
import ConsultantScheduleCalendar from './_componenets/ConsultantScheduleCalendar.component'
import { Loader2 } from 'lucide-react'

export default function ConsultantSlotsLayout() {
  const { id } = useParams<{ id: string }>()
  const consultantId = Number(id)

  const { isLoggedIn, role, id: userId } = useReduxSelector((state) => state.user)
  const { openAuthDialog } = useAuthDialog()

  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [events, setEvents] = useState<any[]>([])

  const [weekRange, setWeekRange] = useState({
    startDate: moment().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
    endDate: moment().endOf('week').add(1, 'day').format('YYYY-MM-DD'),
  })

  const { data: slotData } = useConsultantAvailabilityQuery({ id: consultantId, startDate: weekRange.startDate, endDate: weekRange.endDate }, { skip: !consultantId })

  const { data, isLoading } = useConsultantsQuery({ page: 1, limit: 50 })
  const consultant = data?.list.find((c) => c.id === consultantId)
  const [bookingSource, setBookingSource] = useState<{ fromCalendar: boolean }>({ fromCalendar: true })

  useEffect(() => {
    if (slotData?.availability) {
      const mapped = slotData.availability.map((slot: any) => ({
        id: slot.id,
        title: slot.type,
        start: slot.start,
        end: slot.end,
        type: slot.type,
        raw: slot,
      }))
      setEvents(mapped)
    }
  }, [slotData])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <span>Loading consultant details…</span>
      </div>
    )
  }
  if (!consultant) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Consultant not found</div>

  const handleBookSlot = ({ start, end, viewType }: any) => {
    const slot = events.find((e) => moment(e.start).isSame(start) && moment(e.end).isSame(end))
    if (!slot || slot.type !== 'available') {
      console.log('[ConsultantSlotsLayout] Slot not available')
      return
    }

    if (!isLoggedIn) {
      openAuthDialog('signin')
      return
    }
    console.log('nsdeofgnoifn', role)
    if (role !== 'user') {
      toast.error('Only users can book sessions.')
      return
    }

    if (userId === consultant.id) {
      toast.error('You cannot book your own sessions.')
      return
    }

    setSelectedSlot({
      slotId: slot.id,
      date: moment(start).format('YYYY-MM-DD'),
      day: moment(start).format('dddd'),
      time: `${moment(start).format('hh:mm A')} - ${moment(end).format('hh:mm A')}`,
      start,
      end,
      viewType,
    })
    setBookingSource({ fromCalendar: true }) // calendar click → read-only

    setShowBookingForm(true)
  }

  const handleClickBooking = () => {
    setBookingSource({ fromCalendar: false })
    setShowBookingForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
        <SlotsComponent id={consultant.id.toString()} onClickBooking={handleClickBooking} />

        <div className="bg-card p-4 rounded-lg">
          <ConsultantScheduleCalendar
            events={events}
            onRangeChange={({ start, end }) => {
              setWeekRange({ startDate: start, endDate: end })
              console.log('[ConsultantSlotsLayout] Calendar range changed:', start, end)
            }}
            onBook={handleBookSlot}
          />
        </div>
      </div>

      <BookingDialog
        showBookingForm={showBookingForm}
        source={bookingSource}
        setShowBookingForm={(val) => {
          setShowBookingForm(val)
          if (!val) {
            setSelectedSlot(null)
            setBookingSource({ fromCalendar: false }) // default mode
          }
        }}
        selectedSlot={selectedSlot}
        consultant={consultant}
        events={events}
      />
    </div>
  )
}
