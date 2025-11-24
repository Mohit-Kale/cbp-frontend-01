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

  const { data, isFetching, isError } = useAdminUsersQuery({
    page,
    limit,
  })

  const { columns } = useUsersColumns()

  // Filter to show only consultants (users with roles other than "user")
  const filteredList = React.useMemo(() => {
    const list = data?.list || []
    return list.filter((user) => {
      // If user has ANY role that isn't "user", show them
      return user.roles?.some((r) => r.name !== 'user')
    })
  }, [data])

  // We always rely on backend for this
  const totalPages = data?.totalPages || 1

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Consultants</h2>
      </div>

      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={filteredList} page={page} setPage={setPage} totalPages={totalPages} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default ConsultantTable
