import React from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type RenderComponentProps = {
  isLoading: boolean
  isError?: boolean
  errorMessage?: string
  onRetry?: () => void
  children: React.ReactNode
  loader?: React.ReactNode
}

export const RenderComponent: React.FC<RenderComponentProps> = ({ isLoading, isError, errorMessage, onRetry, children, loader }) => {
  if (isLoading) {
    return (
      loader || (
        <div className="flex justify-center items-center py-10 w-full h-30">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-gray-500">Loading...</span>
        </div>
      )
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-6 w-full">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4 text-center w-full">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{errorMessage || 'Something went wrong. Please try again.'}</p>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
            Retry
          </Button>
        )}
      </div>
    )
  }

  return <>{children}</>
}
