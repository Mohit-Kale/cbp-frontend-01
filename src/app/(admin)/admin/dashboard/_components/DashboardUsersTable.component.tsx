'use client'

import * as React from 'react'
import { Users } from 'lucide-react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import useUsersColumns from './useUsersColumns.hook'

export default function DashboardUsersTable({ data }: { data: any }) {
  const { columns } = useUsersColumns()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Users />
        <h2 className="text-xl font-medium text-gray-700">Last 20 Users</h2>
      </div>
      <div className="h-[calc(100vh-21rem)] overflow-auto">
        <DataTable columns={columns} data={data || []} isPaginationEnabled={false} />
      </div>
    </div>
  )
}
