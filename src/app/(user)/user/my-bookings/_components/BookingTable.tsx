'use client'

import React, { useState, useEffect } from 'react'
import { DataTable } from '@/components/dataTable/DataTable.component'
import { CalendarDays, Star } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import useBookingsColumns from './useBookingSchedules'
import { useShowMyBookingsQuery, MyBooking } from '@/redux/services/consultant.api'
import { useTablePagination } from '@/hooks/useTablePagination'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRateBookingMutation, useGetBookingRatingQuery } from '@/redux/services/user.stripe.api'

export default function MyBookingsTable() {
  const { page, limit, setPage } = useTablePagination(10)

  const [viewingBooking, setViewingBooking] = useState<MyBooking | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useShowMyBookingsQuery({ page, limit })
  const bookings: MyBooking[] = data?.list || []

  const { columns } = useBookingsColumns({
    onView: (booking) => {
      setViewingBooking(booking)
      setIsViewDialogOpen(true)
    },
    onRate: (booking) => {
      setViewingBooking(booking)
      setIsViewDialogOpen(true)
    },
  })

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const [rateBooking, { isLoading: isSubmitting }] = useRateBookingMutation()

  // ========= GET EXISTING RATING ========= //
  const { data: ratingData, isLoading: isRatingLoading } = useGetBookingRatingQuery(viewingBooking ? { bookingId: viewingBooking.id } : skipToken)

  const isReadOnly = Boolean(ratingData?.rating)

  // Prefill when ratingData arrives
  useEffect(() => {
    if (ratingData) {
      setRating(ratingData.rating || 0)
      setFeedback(ratingData.note || '')
    } else {
      setRating(0)
      setFeedback('')
    }
  }, [ratingData])

  const handleSubmit = async () => {
    if (!viewingBooking || rating === 0) return

    try {
      await rateBooking({
        bookingId: viewingBooking.id,
        consultantId: viewingBooking.consultantId,
        rating,
        note: feedback,
      }).unwrap()

      setIsViewDialogOpen(false)
      setViewingBooking(null)

      refetch()
    } catch (err) {
      console.error('Rating failed:', err)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-2">
        <CalendarDays className="w-6 h-6 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">My Bookings</h2>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto mt-2">
        <RenderComponent isLoading={isLoading} isError={isError} loader={<TableSkeleton />}>
          <DataTable columns={columns} data={bookings} page={page} setPage={setPage} totalPages={data?.totalPages || 1} isPaginationEnabled />
        </RenderComponent>
      </div>

      {/* Rating Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogTitle className="hidden">Rate Your Consultation</DialogTitle>

        <DialogContent className="max-w-md w-full">
          <h2 className="text-xl font-semibold">{isReadOnly ? 'Your Rating' : 'Rate Your Consultation'}</h2>

          <div className="flex flex-col gap-6">
            {/* Rating Stars */}
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = hoverRating >= star || rating >= star

                return (
                  <Star
                    key={star}
                    onMouseEnter={() => !isReadOnly && setHoverRating(star)}
                    onMouseLeave={() => !isReadOnly && setHoverRating(0)}
                    onClick={() => !isReadOnly && setRating(star)}
                    className={cn('w-10 h-10 transition-all', isReadOnly ? 'cursor-default' : 'cursor-pointer', active ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')}
                  />
                )
              })}
            </div>

            {/* Feedback */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">{isReadOnly ? 'Your Feedback' : 'Share your feedback (optional)'}</label>

              <Textarea
                placeholder={isRatingLoading ? 'Loading previous feedback...' : isReadOnly ? 'Your submitted feedback' : 'How was your consultation?'}
                value={feedback}
                disabled={isReadOnly}
                onChange={(e) => !isReadOnly && setFeedback(e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit Button - Hidden when read-only */}
            {!isReadOnly && (
              <Button size="lg" disabled={isSubmitting || rating === 0} onClick={handleSubmit} className="w-full">
                {isSubmitting ? 'Submitting…' : ratingData?.rating ? 'Update Rating' : 'Submit Rating'}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
