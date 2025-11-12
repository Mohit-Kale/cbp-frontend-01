import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { MyBooking } from '@/redux/services/consultant.api'
import { Eye } from 'lucide-react'

interface UseBookingColumnsProps {
  onView: (row: MyBooking) => void
}

export default function useBookingsColumns({ onView }: UseBookingColumnsProps) {
  const columns: ColumnDef<MyBooking>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.consultant?.fullName,
        id: 'username',
        header: 'Consultant Name',
      },
      {
        accessorFn: (row) => row.consultant?.email,
        id: 'email',
        header: 'Consultant Email',
      },
      {
        accessorFn: (row) => row.consultant?.phone,
        id: 'phone',
        header: 'Consultant Phone',
        cell: ({ getValue }) => getValue() || '-', // fallback if undefined
      },
      {
        accessorKey: 'bookingDate',
        header: 'Booking Date',
        cell: ({ getValue }) => moment(getValue() as string).format('DD/MM/YYYY'),
      },
      {
        accessorFn: (row) => `${moment(row.startTime, 'HH:mm:ss').format('hh:mm A')} - ${moment(row.endTime, 'HH:mm:ss').format('hh:mm A')}`,
        id: 'slot',
        header: 'Slot',
      },

      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => getValue() as string,
      },
      // {
      //   id: 'actions',
      //   header: 'Actions',
      //   cell: ({ row }) => (
      //     <div className="flex gap-2">
      //       <button className="text-primary hover:underline flex items-center gap-1" onClick={() => onView(row.original)}>
      //         <Eye className="w-5 h-5" />
      //       </button>
      //     </div>
      //   ),
      // },
    ],
    [onView],
  )

  return { columns }
}
