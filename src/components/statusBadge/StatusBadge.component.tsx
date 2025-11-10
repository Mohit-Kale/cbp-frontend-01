// components/StatusBadge.tsx
import React from 'react'
import clsx from 'clsx'

type StatusType = 'ready' | 'failed' | 'active' | 'pending' | 'inactive' | string

interface StatusBadgeProps {
  value: StatusType
}

// Helper: normalize and simplify any backend status string
function normalizeStatus(value: string): string {
  return value.toLowerCase().replace(/_/g, '') // PENDING_VERIFICATION → pendingverification
}

const statusStyles: Record<string, string> = {
  ready: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-700',
  inactive: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-blue-100 text-blue-800',
  default: 'bg-slate-100 text-slate-800',
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value }) => {
  const normalized = normalizeStatus(value)
  const style = Object.keys(statusStyles).find((key) => normalized.startsWith(key)) // matches "pendingverification" → "pending"
    ? statusStyles[Object.keys(statusStyles).find((key) => normalized.startsWith(key)) as string]
    : statusStyles.default

  return <span className={clsx('px-2 py-1 rounded-xl font-medium text-sm capitalize', style)}>{value.toLowerCase()}</span>
}
