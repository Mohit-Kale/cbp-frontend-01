import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { MyBooking } from '@/redux/services/consultant.api'
import { Clock, ExternalLink, Eye, EyeClosed, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import clsx from 'clsx'

interface UseBookingColumnsProps {
  onView: (row: MyBooking) => void
  onRate: (row: MyBooking) => void
}

export default function useBookingsColumns({ onView, onRate }: UseBookingColumnsProps) {
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
        header: 'Booked On',
        cell: ({ getValue }) => moment(getValue() as string).format('YYYY/MM/DD'),
      },
      {
        accessorKey: 'scheduleDate',
        header: 'Scheduled On',
        cell: ({ getValue }) => moment(getValue() as string).format('YYYY/MM/DD'),
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
        cell: ({ getValue }) => {
          const value = (getValue() as string) || ''
          const lower = value.toLowerCase()
          const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

          const variant = lower === 'confirmed' ? 'default' : lower === 'pending' ? 'secondary' : lower === 'completed' ? 'outline' : 'destructive'

          return (
            <Badge variant={variant} className={clsx({ 'bg-green-600 text-white': variant === 'outline' })}>
              {formatted}
            </Badge>
          )
        },
      },
      {
        id: 'meetingLink',
        header: 'Meeting Link',
        accessorKey: 'meetingLink',
        cell: ({ row }) => {
          const status = row.original.status as 'CONFIRMED' | 'COMPLETED' | string
          const value = row.original.meetingLink

          // NOT CONFIRMED
          if (status !== 'CONFIRMED' && status !== 'COMPLETED') {
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <EyeClosed className="w-5 h-5 ml-6 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>This booking is not confirmed yet</TooltipContent>
              </Tooltip>
            )
          }

          // COMPLETED
          if (status === 'COMPLETED') {
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <EyeClosed className="w-5 h-5 ml-6 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>This booking is completed</TooltipContent>
              </Tooltip>
            )
          }

          // CONFIRMED BUT NO LINK
          if (status === 'CONFIRMED' && !value) {
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Clock className="w-5 h-5 ml-6 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>Consultant has not added the meeting link yet</TooltipContent>
              </Tooltip>
            )
          }

          // CONFIRMED + LINK AVAILABLE
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={value || ''} target="_blank" rel="noopener noreferrer" className="flex items-center ml-6">
                  <ExternalLink className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Click to open the meeting link</TooltipContent>
            </Tooltip>
          )
        },
      },
      {
        id: 'rating',
        header: 'Rating',
        cell: ({ row }) => {
          const status = row.original.status as 'COMPLETED' | string

          if (status === 'COMPLETED') {
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Star className="w-5 h-5 ml-6 text-yellow-400 cursor-pointer" onClick={() => onRate(row.original)} />
                </TooltipTrigger>
                <TooltipContent>Rate this consultation</TooltipContent>
              </Tooltip>
            )
          }

          return <span className="text-gray-400 ml-6">—</span>
        },
      },
    ],
    [onView, onRate],
  )

  return { columns }
}
