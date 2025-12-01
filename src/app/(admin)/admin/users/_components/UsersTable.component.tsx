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

function UsersTable() {
  const { page, limit, setPage } = useTablePagination(pageSize)

  const { data, isFetching, isError } = useAdminUsersQuery({
    page: 1, // Always fetch all users per backend page 1 for client-side pagination
    limit: 1000, // Fetch enough users to cover all pages
  })

  const { columns } = useUsersColumns()

  // Filter out consultants
  const filteredList = React.useMemo(() => {
    return (data?.list || []).filter((user) => user.roles?.every((r) => r.name !== 'consultant'))
  }, [data?.list])

  // Calculate client-side pagination
  const paginatedData = React.useMemo(() => {
    const startIndex = (page - 1) * pageSize
    return filteredList.slice(startIndex, startIndex + pageSize)
  }, [filteredList, page])

  const totalPages = Math.ceil(filteredList.length / pageSize) || 1

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Users</h2>
      </div>

      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={paginatedData} page={page} setPage={setPage} totalPages={totalPages} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default UsersTable
