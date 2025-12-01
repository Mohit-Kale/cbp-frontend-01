'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Eye, Trash2 } from 'lucide-react'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'
import { useRouter } from 'next/navigation'
import { paths } from '@/navigate/paths'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { extractMainStatus } from '../../dashboard/_components/useUsersColumns.hook'

export default function useBookingTable() {
  const router = useRouter()
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'Booking ID',
    },
    {
      accessorKey: 'consultant',
      header: 'Consultant name',
      cell: ({ row }) => <span>{row.original.consultant?.fullName}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer name',
      cell: ({ row }) => <span>{row.original.customer?.fullName}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt)
        return (
          <span className="text-gray-600">
            {date.toLocaleDateString()} — {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const rawValue = getValue() as string
        const formatted = extractMainStatus(rawValue)
        return <StatusBadge value={formatted} />
      },
    },
    {
      id: 'view',
      header: 'View',
      cell: ({ row }) => {
        const item = row.original
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-blue-600 hover:text-blue-900 cursor-pointer ml-3" onClick={() => router.push(paths.adminBookingDetail(item.id))}>
                <Eye className="w-5 h-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to view booking details</TooltipContent>
          </Tooltip>
        )
      },
    },
  ]

  return { columns }
}
