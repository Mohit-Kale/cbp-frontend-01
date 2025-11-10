'use client'
import React from 'react'
import DashboardCards from '../_components/DashboardCards.component'
import AdminDashboardSkeleton from '@/components/skeletons/dashboard/AdminDashboardSkeleton.component'
import { useGetDashboardDataQuery } from '@/redux/services/admin/dashboard.api'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'

export default function DashboardLayout() {
  // const { data, isFetching, isError } = useGetDashboardDataQuery()
  const data = {
    total_users: 20,
    active_users: 5,
    total_reports: 15,
    failed_reports: 2,
    users: [
      {
        id: 1,
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        gender: 'male',
        is_active: true,
        created_at: '2025-01-01T12:00:00Z',
        updated_at: '2025-02-01T12:00:00Z',
      },
      {
        id: 2,
        full_name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '1234567890',
        gender: 'female',
        is_active: false,
        created_at: '2025-01-01T12:00:00Z',
        updated_at: '2025-02-01T12:00:00Z',
      },
    ],
  }

  return (
    <div className="flex flex-col gap-6">
      <RenderComponent isLoading={false} isError={false} loader={<AdminDashboardSkeleton />}>
        <DashboardCards data={data} />
      </RenderComponent>
    </div>
  )
}
