'use client'

import React, { useState } from 'react'
import { CalendarDays, Star } from 'lucide-react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { skipToken } from '@reduxjs/toolkit/query'

import { useShowMyBookingsQuery, MyBooking, useCreateMeetingAndStatusMutation } from '@/redux/services/consultant.api'
import { useGetBookingRatingQuery } from '@/redux/services/user.stripe.api'

import useBookingsColumns from './useBookingSchedules'
import { useTablePagination } from '@/hooks/useTablePagination'

/* ===========================================
   ZOD VALIDATION
=========================================== */
const meetingSchema = z.object({
  meetingLink: z.string().url('Enter a valid Google Meet link').min(10, 'Link is required'),
})

type MeetingFormValues = z.infer<typeof meetingSchema>

export default function MyBookingsTable() {
  const { page, limit, setPage } = useTablePagination(10)

  const { data, isLoading, isError } = useShowMyBookingsQuery({
    page,
    limit,
  })

  /* ===========================================
     Dialog + Mode + Selected Booking
  ============================================ */
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null)

  // Rating dialog state
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [viewingRatingBooking, setViewingRatingBooking] = useState<MyBooking | null>(null)

  const [updateMeetingOrStatus] = useCreateMeetingAndStatusMutation()

  // ========= GET RATING FOR VIEWING ========= //
  const { data: ratingData, isLoading: isRatingLoading } = useGetBookingRatingQuery(viewingRatingBooking ? { bookingId: viewingRatingBooking.id } : skipToken)

  /* ===========================================
     Form Initialize
  ============================================ */
  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      meetingLink: '',
    },
  })

  /* ===========================================
     Open Dialog
  ============================================ */
  const openLinkDialog = (booking: MyBooking, mode: 'add' | 'edit') => {
    setDialogMode(mode)
    setSelectedBooking(booking)

    form.reset({
      meetingLink: mode === 'edit' ? booking.meetingLink || '' : '',
    })

    setIsLinkDialogOpen(true)
  }

  const closeLinkDialog = () => {
    setIsLinkDialogOpen(false)
    setSelectedBooking(null)
    form.reset({ meetingLink: '' })
  }

  /* ===========================================
     Save Handler (Add/Edit Meeting Link)
     → Only send meetingLink
  ============================================ */
  const handleSubmit = async (values: MeetingFormValues) => {
    if (!selectedBooking) return

    await updateMeetingOrStatus({
      bookingId: selectedBooking.id,
      meetingLink: values.meetingLink,
    })

    closeLinkDialog()
  }

  /* ===========================================
     Mark Complete Handler
     → Only send status
  ============================================ */
  const handleMarkComplete = async (row: MyBooking) => {
    await updateMeetingOrStatus({
      bookingId: row.id,
      status: 'COMPLETED',
    })
  }

  /* ===========================================
     View Rating Handler
  ============================================ */
  const handleViewRating = (booking: MyBooking) => {
    setViewingRatingBooking(booking)
    setIsRatingDialogOpen(true)
  }

  const closeRatingDialog = () => {
    setIsRatingDialogOpen(false)
    setViewingRatingBooking(null)
  }

  /* ===========================================
     Inject to Columns
  ============================================ */
  const { columns } = useBookingsColumns({
    onManageLink: openLinkDialog,
    onMarkComplete: handleMarkComplete,
    onViewRating: handleViewRating,
  })

  const bookings = data?.list || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3 border-b pb-2">
        <CalendarDays className="w-6 h-6 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">My Bookings</h2>
      </div>

      <RenderComponent isLoading={isLoading} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={bookings} page={page} setPage={setPage} totalPages={totalPages} isPaginationEnabled />
      </RenderComponent>

      {/* ===========================================
          Dialog (Shadcn Form for Meeting Link)
      ============================================ */}
      <Dialog open={isLinkDialogOpen} onOpenChange={closeLinkDialog}>
        <DialogContent className="max-w-md w-full">
          <DialogTitle className="text-lg font-semibold">{dialogMode === 'add' ? 'Add Meeting Link' : 'Edit Meeting Link'}</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4 space-y-6">
              <FormField
                control={form.control}
                name="meetingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Meet Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Paste Google Meet link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={closeLinkDialog}>
                  Cancel
                </Button>
                <Button type="submit">{dialogMode === 'add' ? 'Save' : 'Update'}</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ===========================================
          Rating Dialog (View Only)
      ============================================ */}
      <Dialog open={isRatingDialogOpen} onOpenChange={closeRatingDialog}>
        <DialogTitle className="sr-only">View Rating</DialogTitle>

        <DialogContent className="max-w-md w-full rounded-xl shadow-lg p-6 bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 text-center">Customer Rating</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Review provided by the customer</p>
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (ratingData?.rating || 0) >= star
              return <Star key={star} className={cn('w-12 h-12 transition-all duration-300', active ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-300')} />
            })}
          </div>

          {/* Customer Feedback */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Feedback</label>
            <Textarea
              placeholder={isRatingLoading ? 'Loading feedback...' : 'No feedback provided'}
              value={ratingData?.note || ''}
              disabled
              rows={4}
              className="resize-none border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
          </div>

          {/* Close Button */}
          <Button
            size="lg"
            onClick={closeRatingDialog}
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
