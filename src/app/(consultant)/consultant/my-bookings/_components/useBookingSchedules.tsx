import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { ConsultantPayout, MyBooking } from '@/redux/services/consultant.api'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, PlusCircle, Pencil, CheckCircle2, Star } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import clsx from 'clsx'

interface UseBookingColumnsProps {
  onManageLink: (row: MyBooking, mode: 'add' | 'edit') => void
  onMarkComplete: (row: MyBooking) => void
  onViewRating: (row: MyBooking) => void
}

export default function useBookingsColumns({ onManageLink, onMarkComplete, onViewRating }: UseBookingColumnsProps) {
  const columns: ColumnDef<MyBooking>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.customer?.fullName,
        id: 'username',
        header: 'Username',
      },
      {
        accessorFn: (row) => row.customer?.email,
        id: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'consultantPayout',
        header: 'Payout',
        cell: ({ getValue }) => {
          const payout = getValue() as ConsultantPayout | undefined

          if (!payout) return '-'

          const { amount, currency } = payout
          const symbol = currency?.symbol || '$'

          return `${symbol}${amount.toLocaleString()}`
        },
      },
      {
        accessorKey: 'bookingDate',
        header: 'Booked on',
        cell: ({ getValue }) => moment(getValue() as string).format('YYYY/MM/DD'),
      },
      {
        accessorKey: 'scheduleDate',
        header: 'Scheduled on',
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
        cell: ({ row }) => {
          const b = row.original
          const status = b.status as 'CONFIRMED' | 'COMPLETED' | string

          return (
            <div className="flex items-center gap-3">
              {/* COMPLETED: show disabled view */}
              {status === 'COMPLETED' ? (
                b.meetingLink ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ExternalLink className="w-5 h-5 text-gray-400 cursor-not-allowed ml-7" />
                    </TooltipTrigger>
                    <TooltipContent>Meeting completed, cannot open/edit</TooltipContent>
                  </Tooltip>
                ) : (
                  <PlusCircle className="w-5 h-5 text-gray-400 cursor-not-allowed" />
                )
              ) : (
                <>
                  {/* CONFIRMED */}
                  {b.meetingLink ? (
                    <>
                      {/* View Link */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ExternalLink className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-800" onClick={() => window.open(b.meetingLink!, '_blank')} />
                        </TooltipTrigger>
                        <TooltipContent>Open meeting link</TooltipContent>
                      </Tooltip>

                      {/* Edit Link */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Pencil className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800" onClick={() => onManageLink(b, 'edit')} />
                        </TooltipTrigger>
                        <TooltipContent>Edit meeting link</TooltipContent>
                      </Tooltip>
                    </>
                  ) : (
                    // Add Link
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PlusCircle className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800 ml-7" onClick={() => onManageLink(b, 'add')} />
                      </TooltipTrigger>
                      <TooltipContent>Add meeting link</TooltipContent>
                    </Tooltip>
                  )}

                  {/* Mark Complete */}
                  {status === 'CONFIRMED' && b.meetingLink && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CheckCircle2 className="w-5 h-5 text-purple-600 cursor-pointer hover:text-purple-800" onClick={() => onMarkComplete(b)} />
                      </TooltipTrigger>
                      <TooltipContent>Mark Status as Completed</TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}
            </div>
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
                  <Star className="w-5 h-5 ml-6 text-yellow-400 cursor-pointer" onClick={() => onViewRating(row.original)} />
                </TooltipTrigger>
                <TooltipContent>View rating</TooltipContent>
              </Tooltip>
            )
          }

          return <span className="text-gray-400 ml-6">—</span>
        },
      },
    ],
    [onManageLink, onMarkComplete, onViewRating],
  )

  return { columns }
}
