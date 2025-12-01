'use client'

import * as React from 'react'
import { Users } from 'lucide-react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'

import { useAdminUsersQuery } from '@/redux/services/admin/users.api'
import useUsersColumns from './useUsersColumns.hook'
import { useTablePagination } from '@/hooks/useTablePagination'
import { pageSize } from '@/utils'

function ConsultantTable() {
  const { page, limit, setPage } = useTablePagination(pageSize)

  // Fetch all users with a high limit to cover all users
  const { data, isFetching, isError } = useAdminUsersQuery({
    page: 1,
    limit: 1000, // fetch all users
  })

  const { columns } = useUsersColumns()

  // Filter only consultants
  const consultants = React.useMemo(() => {
    return (data?.list || []).filter((user) => user.roles?.some((r) => r.name === 'consultant'))
  }, [data])

  // Client-side pagination
  const totalPages = Math.ceil(consultants.length / limit) || 1
  const paginatedConsultants = React.useMemo(() => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return consultants.slice(startIndex, endIndex)
  }, [consultants, page, limit])

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Consultants</h2>
      </div>

      {/* Table */}
      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={paginatedConsultants} page={page} setPage={setPage} totalPages={totalPages} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default ConsultantTable
