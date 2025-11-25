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
        <DialogTitle className="sr-only">Rate Your Consultation</DialogTitle>

        <DialogContent className="max-w-md w-full rounded-xl shadow-lg p-6 bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 text-center">{isReadOnly ? 'Your Rating' : 'Rate Your Consultation'}</h2>
            {!isReadOnly && <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Share your feedback to help us improve</p>}
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = hoverRating >= star || rating >= star
              return (
                <Star
                  key={star}
                  onMouseEnter={() => !isReadOnly && setHoverRating(star)}
                  onMouseLeave={() => !isReadOnly && setHoverRating(0)}
                  onClick={() => !isReadOnly && setRating(star)}
                  className={cn('w-12 h-12 transition-all duration-300', isReadOnly ? 'cursor-default' : 'cursor-pointer', active ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-300')}
                />
              )
            })}
          </div>

          {/* Feedback */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{isReadOnly ? 'Your Feedback' : 'Share your feedback (optional)'}</label>
            <Textarea
              placeholder={isRatingLoading ? 'Loading previous feedback...' : isReadOnly ? 'Your submitted feedback' : 'How was your consultation?'}
              value={feedback}
              disabled={isReadOnly}
              onChange={(e) => !isReadOnly && setFeedback(e.target.value)}
              rows={4}
              className="resize-none border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
          </div>

          {/* Submit Button - Hidden when read-only */}
          {!isReadOnly && (
            <Button
              size="lg"
              disabled={isSubmitting || rating === 0}
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
            >
              {isSubmitting ? 'Submitting…' : ratingData?.rating ? 'Update Rating' : 'Submit Rating'}
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
