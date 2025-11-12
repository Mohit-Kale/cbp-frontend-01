'use client'

import * as React from 'react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { Users } from 'lucide-react'
import { useAdminUsersQuery } from '@/redux/services/admin/users.api'
import useUsersColumns from './useUsersColumns.hook'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { pageSize } from '@/utils'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'

// 4. Main Table Component
// 4. Main Table Component
function UsersTable() {
  const [page, setPage] = React.useState(1)

  const { data, isFetching, isError } = useAdminUsersQuery({
    page,
    limit: pageSize,
  })
  const { columns } = useUsersColumns()

  const filteredList = React.useMemo(() => {
    return (
      data?.list?.filter((user) => {
        // If user has ANY role that isn't "user", show them
        return user.roles?.some((r) => r.name !== 'consultant')
      }) || []
    )
  }, [data])
  const effectiveTotalPages = Math.ceil(filteredList.length / pageSize) || 1

  console.log(filteredList)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Users</h2>
      </div>

      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={filteredList} page={data?.currentPage || page} setPage={setPage} totalPages={effectiveTotalPages} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default UsersTable
