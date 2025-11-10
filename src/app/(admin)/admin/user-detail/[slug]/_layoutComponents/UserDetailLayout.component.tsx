'use client'

import React from 'react'
import { useUserDetailQuery } from '@/redux/services/admin/users.api'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import Details from '../_components/details/Details.component'
// import ReportsTable from '../_components/reportsTable/ReportsTable.component'
import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'

export default function UserDetailLayout({ slug }: { slug: string }) {
  const [page, setPage] = React.useState(1)
  const limit = 5

  const { data, isFetching, isError } = useUserDetailQuery({
    id: slug,
  })
  // console.log('dattttaaaaaa', data)
  // const reports = data?.list || []

  return (
    <div>
      <RenderComponent isLoading={isFetching} isError={isError}>
        {/* {/* <div className="flex flex-col gap-6"> */}
        <Details data={data || {}} />

        {/* <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-gray-700">Reports</h2>

          {reports.length > 0 ? (
            <ReportsTable data={reports} page={page} setPage={setPage} totalPages={data?.total_pages || 1} slug={slug} />
          ) : (
            <div className="border rounded-lg p-6 flex justify-center">
              <NoRecordsFound isCard={false} description="No reports found for this user." />
            </div>
          )}
        </div> */}
      </RenderComponent>
    </div>
  )
}
