'use client'

import React, { useEffect } from 'react'
import { Clock, Clock10, Clock12Icon, MessageSquare } from 'lucide-react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'

import { useTablePagination } from '@/hooks/useTablePagination'
import { pageSize } from '@/utils'
import { useShowAdminBookingsQuery } from '@/redux/services/admin/booking.api'
import useBookingTable from './useBookingTable'

function BookingTable() {
  const { page, limit, setPage } = useTablePagination(pageSize)

  // Fetch paginated bookings
  const { data: listData, isLoading, isError } = useShowAdminBookingsQuery({ page, limit })
  const { columns } = useBookingTable()

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-medium text-gray-700">Booking history</h2>
        </div>
      </div>

      {/* Table */}
      <RenderComponent isLoading={isLoading} isError={isError} loader={<TableSkeleton />} errorMessage="Something went wrong. Please try again.">
        <DataTable columns={columns} data={listData?.list || []} page={page} setPage={setPage} totalPages={listData?.totalPages || 1} isPaginationEnabled={true} />
      </RenderComponent>
    </div>
  )
}

export default BookingTable
