'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { useGetEnquiryByIdQuery } from '@/redux/services/admin/enquiry.api'
import EnquiryDetails from '../_component/EnquiryDetails'
import { Button } from '@/components/ui/button'

export default function EnquiryPage() {
  const params = useParams()
  const router = useRouter()
  const idParam = params?.id

  // Guard against missing ID
  if (!idParam) {
    return <div className="p-6 text-red-600">Invalid Enquiry ID</div>
  }

  // Convert to number if your API expects a number
  const id = Number(idParam)

  const { data, isFetching, isError } = useGetEnquiryByIdQuery(id)

  return (
    <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
      <Button onClick={() => router.back()} className="mb-4">
        Back
      </Button>
      {data && <EnquiryDetails data={data} />}
    </RenderComponent>
  )
}
