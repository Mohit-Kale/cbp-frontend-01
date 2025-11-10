'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function DashboardCards({ data }: { data: any }) {
  const [stats, setStats] = React.useState<any>([])

  React.useEffect(() => {
    setStats([
      {
        key: 'total_users',
        title: 'Total Bookings',
        value: data?.total_users,
        bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
      },
      {
        key: 'active_users',
        title: 'Success Bookings',
        value: data?.active_users,

        bg: 'bg-gradient-to-r from-green-200 to-green-100',
      },
      {
        key: 'total_reports',
        title: 'Pending Bookings',
        value: data?.total_reports,
        bg: 'bg-gradient-to-r from-orange-200 to-orange-100',
      },
    ])
  }, [data])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat: any, index: any) => (
        <Card key={index} className={`${stat.bg} shadow-md rounded-xl`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-gray-700">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
