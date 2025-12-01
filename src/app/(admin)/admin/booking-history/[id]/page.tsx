'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { useGetBookingByIdQuery } from '@/redux/services/admin/booking.api'
import BookingDetails from '../_component/BookingDetails'

export default function BookingPage() {
  const params = useParams()
  const idParam = params?.id
  const id = Number(idParam)
  const skip = !idParam || Number.isNaN(id)

  const { data, isFetching, isError } = useGetBookingByIdQuery(id, { skip })

  return (
    <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />} errorMessage="Failed to load booking. Please try again.">
      {skip ? <div className="p-6 text-red-600">Invalid Booking ID</div> : data && <BookingDetails data={data} />}
    </RenderComponent>
  )
}
