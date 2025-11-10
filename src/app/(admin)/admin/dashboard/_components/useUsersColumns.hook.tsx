'use client'

import React from 'react'
import { UserDTO } from '@/dto'
import { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'

// Utility: Extract first word from SNAKE_CASE or CONSTANT_CASE and convert to CamelCase
function extractMainStatus(value: string) {
  if (!value) return ''
  const main = value.split('_')[0] // "PENDING_VERIFICATION" → "PENDING"
  return main.charAt(0).toUpperCase() + main.slice(1).toLowerCase() // → "Pending"
}

export default function useUsersColumns() {
  const columns = React.useMemo<ColumnDef<UserDTO>[]>(
    () => [
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
        cell: ({ getValue }) => {
          const rawValue = getValue() as string
          const formatted = extractMainStatus(rawValue)
          return <StatusBadge value={formatted} />
        },
      },
    ],
    [],
  )

  return { columns }
}
