'use client'

import React, { useState } from 'react'
import { DataTable } from '@/components/dataTable/DataTable.component'
import { CalendarDays } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import useBookingsColumns from './useBookingSchedules'
import { useShowMyBookingsQuery, MyBooking } from '@/redux/services/consultant.api'

export default function MyBookingsTable() {
  const [page, setPage] = useState(1)
  const limit = 10 // you can adjust or make dynamic
  const [viewingBooking, setViewingBooking] = useState<MyBooking | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // ✅ Fetch bookings from API
  const { data, isLoading, isError } = useShowMyBookingsQuery({
    page,
    limit,
    status: 'confirmed',
  })

  // Map API data to table rows
  const bookings: MyBooking[] = data?.list || []

  const { columns } = useBookingsColumns({
    onView: (booking) => {
      setViewingBooking(booking)
      setIsViewDialogOpen(true)
    },
  })

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
          <DataTable columns={columns} data={bookings} page={page} setPage={setPage} totalPages={data?.totalPages || 1} isPaginationEnabled={true} />
        </RenderComponent>
      </div>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogTitle>View Booking</DialogTitle>
          {viewingBooking && (
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <span className="font-medium">Username:</span> {viewingBooking.customer.fullName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {viewingBooking.customer.email}
              </div>
              {viewingBooking.customer.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {viewingBooking.customer.phone}
                </div>
              )}
              <div>
                <span className="font-medium">Booking Date:</span> {viewingBooking.bookingDate}
              </div>
              <div>
                <span className="font-medium">Slot:</span> {`${viewingBooking.startTime} - ${viewingBooking.endTime}`}
              </div>
              <div>
                <span className="font-medium">Status:</span> {viewingBooking.status}
              </div>
              {viewingBooking.notes && (
                <div>
                  <span className="font-medium">Notes:</span> {viewingBooking.notes}
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Button variant="default" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
