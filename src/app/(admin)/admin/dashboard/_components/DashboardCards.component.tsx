'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface DashboardCardsProps {
  data: {
    totalUsers: number
    consultants: number
    endUsers: number
  }
}

export default function DashboardCards({ data }: DashboardCardsProps) {
  const [stats, setStats] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!data) return

    setStats([
      {
        key: 'totalUsers',
        title: 'Total Users',
        value: data.totalUsers,
        bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
      },
      {
        key: 'consultants',
        title: 'Consultants',
        value: data.consultants,
        bg: 'bg-gradient-to-r from-green-200 to-green-100',
      },
      {
        key: 'endUsers',
        title: 'End Users',
        value: data.endUsers,
        bg: 'bg-gradient-to-r from-orange-200 to-orange-100',
      },
    ])
  }, [data])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.key} className={`${stat.bg} shadow-md rounded-xl`}>
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
