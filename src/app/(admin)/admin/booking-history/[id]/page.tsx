'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { useGetBookingByIdQuery } from '@/redux/services/admin/booking.api'
import { Button } from '@/components/ui/button'
import BookingDetails from '../_component/BookingDetails'

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const idParam = params?.id

  // Guard against missing ID
  if (!idParam) {
    return <div className="p-6 text-red-600">Invalid Booking ID</div>
  }

  // Convert to number if your API expects a number
  const id = Number(idParam)

  const { data, isFetching, isError } = useGetBookingByIdQuery(id)

  return (
    <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />} errorMessage="Failed to load booking. Please try again.">
      {data && <BookingDetails data={data} />}
    </RenderComponent>
  )
}
