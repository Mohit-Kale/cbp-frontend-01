import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ConsultantSchedule } from '@/redux/services/consultant.api'
import { Eye } from 'lucide-react'
import moment from 'moment'

interface UseColumnsProps {
  onEdit: (row: ConsultantSchedule) => void
  onView: (row: ConsultantSchedule) => void
}

export default function useConsultantSchedulesColumns({ onEdit, onView }: UseColumnsProps) {
  const columns: ColumnDef<ConsultantSchedule>[] = React.useMemo(
    () => [
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ getValue }) => moment(getValue() as string).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        cell: ({ getValue }) => moment(getValue() as string).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'availableDays',
        header: 'Available Days',
        cell: ({ getValue }) => {
          const days = getValue() as string[] | undefined
          return days?.join(', ') || '-'
        },
      },
      {
        accessorKey: 'availableHours',
        header: 'Available Hours',
        cell: ({ getValue }) => {
          const hours = getValue() as number[] | undefined

          if (!hours || hours.length === 0) return '-'

          const displayed = hours
            .slice(0, 3)
            .map((h) => `${h}:00`)
            .join(', ')
          const more = hours.length > 3 ? ', ...' : ''

          return displayed + more
        },
      },

      // ✅ Actions Column: Edit + View
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            {/* <button className="text-blue-600 hover:underline" onClick={() => onEdit(row.original)}>
              Edit
            </button> */}
            <button className="text-primary hover:underline" onClick={() => onView(row.original)}>
              <Eye className="w-6 h-6" />
            </button>
          </div>
        ),
      },
    ],
    [onView],
  )

  return { columns }
}
