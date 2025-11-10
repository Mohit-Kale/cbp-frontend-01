import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { UserDTO } from '@/dto'
import Link from 'next/link'
import { paths } from '@/navigate/paths'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'
import { Eye } from 'lucide-react'
export default function useUsersColumns() {
  const [columns, setColumns] = React.useState<ColumnDef<UserDTO>[]>([
    {
      accessorKey: 'fullName',
      header: 'Full Name',
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
      cell: ({ getValue }) => <div className="font-medium">{getValue() as string}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone Number',
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge value={(getValue() as string) === 'PENDING_VERIFICATION' ? 'pending' : (getValue() as string)} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Link href={paths.adminUserDetail(row.original.id)} className=" hover:text-blue-900   text-black px-2 py-1 rounded-md text-sm ">
          <Eye />
        </Link>
      ),
    },
  ])

  return { columns }
}
