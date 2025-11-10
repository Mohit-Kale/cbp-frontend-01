import React from 'react'
import { Button } from '@/components/ui/button'

type AlertErrorProps = {
  title: string
  description: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export default function AlertError({ title, description, actionLabel, onAction, icon }: AlertErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <div className="h-5 w-5 text-red-500 mt-1 flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-red-900 text-sm sm:text-base">{title}</h3>
          <div className="text-xs sm:text-sm text-red-700 mt-1">{description}</div>
          {actionLabel && onAction && (
            <Button className="bg-orange-500 text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium mt-2 sm:mt-3 hover:bg-orange-600 transition-colors w-full sm:w-auto" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
