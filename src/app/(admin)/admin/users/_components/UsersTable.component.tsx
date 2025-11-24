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
    page,
    limit,
  })

  const { columns } = useUsersColumns()

  // Filter without breaking pagination
  const filteredList = React.useMemo(() => {
    const list = data?.list || []
    return list.filter((user) => user.roles?.some((r) => r.name !== 'consultant'))
  }, [data])

  // Calculate total pages based on filtered results
  const effectiveTotalPages = Math.ceil(filteredList.length / pageSize) || 1

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Users</h2>
      </div>

      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={filteredList} page={page} setPage={setPage} totalPages={effectiveTotalPages} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default UsersTable
