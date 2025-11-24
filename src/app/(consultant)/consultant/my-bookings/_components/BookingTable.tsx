'use client'

import React, { useState } from 'react'
import { CalendarDays } from 'lucide-react'

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

import { useShowMyBookingsQuery, MyBooking, useCreateMeetingAndStatusMutation } from '@/redux/services/consultant.api'

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

  const [updateMeetingOrStatus] = useCreateMeetingAndStatusMutation()

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
     Inject to Columns
  ============================================ */
  const { columns } = useBookingsColumns({
    onManageLink: openLinkDialog,
    onMarkComplete: handleMarkComplete,
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
    </div>
  )
}
