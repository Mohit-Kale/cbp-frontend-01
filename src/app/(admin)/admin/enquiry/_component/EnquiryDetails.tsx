'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useUpdateEnquiryMutation, useDeleteEnquiryMutation } from '@/redux/services/admin/enquiry.api'
import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'
import { extractMainStatus } from '../../dashboard/_components/useUsersColumns.hook'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { paths } from '@/navigate/paths'
import { useRouter } from 'next/navigation'

interface Props {
  data: any
}

export default function EnquiryDetails({ data }: Props) {
  const [updateEnquiry, { isLoading: isUpdating }] = useUpdateEnquiryMutation()

  const handleComplete = async () => {
    try {
      await updateEnquiry({ id: data.id, status: 'COMPLETED' }).unwrap()
    } catch {
      toast.error('Failed to update enquiry')
    }
  }
  const router = useRouter()

  // Format status
  const formattedStatus = extractMainStatus(data.status)

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Enquiry Details</h1>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Detail label="ID" value={data.id} />
        <Detail label="Name" value={data.fullName} />
        <Detail label="Email" value={data.email} />
        <Detail label="Phone" value={data.phone || '—'} />
        <Detail label="Status" value={<StatusBadge value={formattedStatus} />} />
        <Detail label="Created At" value={`${new Date(data.createdAt).toLocaleDateString()} — ${new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} />
      </div>

      {/* Message */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">Message</h2>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-sm text-foreground whitespace-pre-wrap">{data.message}</div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleComplete} disabled={isUpdating || data.status === 'COMPLETED'} variant="default" className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Complete Enquiry
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark as completed</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
