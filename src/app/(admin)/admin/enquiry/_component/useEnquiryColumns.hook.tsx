'use client'

import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import { Eye, Trash2 } from 'lucide-react'
import { useDeleteEnquiryMutation } from '@/redux/services/admin/enquiry.api'
import { extractMainStatus } from '../../dashboard/_components/useUsersColumns.hook'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'
import { useRouter } from 'next/navigation'
import { paths } from '@/navigate/paths'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

function truncate(text: string, max = 40) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '...' : text
}

export default function useEnquiryColumns() {
  const [deleteEnquiry] = useDeleteEnquiryMutation()

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this enquiry?')
    if (!confirmDelete) return

    try {
      await deleteEnquiry(id).unwrap()
    } catch {
      toast.error('Failed to delete enquiry')
    }
  }
  const router = useRouter()
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'fullName',
      header: 'Name',
      cell: ({ row }) => <span>{row.original.fullName}</span>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <span className="text-blue-600 underline">{row.original.email}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <span>{row.original.phone || '-'}</span>,
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
              <div className="text-blue-600 hover:text-blue-900 cursor-pointer ml-3" onClick={() => router.push(paths.adminEnquiryDetail(item.id))}>
                <Eye className="w-5 h-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to view enquiry</TooltipContent>
          </Tooltip>
        )
      },
    },
    // ❌ DELETE COLUMN
    {
      id: 'delete',
      header: 'Delete',
      cell: ({ row }) => {
        const item = row.original
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-red-600 hover:text-red-900 cursor-pointer ml-3" onClick={() => handleDelete(item.id)}>
                <Trash2 className="w-5 h-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to delete enquiry</TooltipContent>
          </Tooltip>
        )
      },
    },
  ]

  return { columns }
}
