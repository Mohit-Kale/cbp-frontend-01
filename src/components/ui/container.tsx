import * as React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  maxWidth?: string // optional override
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, children, maxWidth = 'max-w-screen-2xl', ...props }, ref) => {
  return (
    <div ref={ref} className={cn('w-full mx-auto md:px-4', maxWidth, className)} {...props}>
      {children}
    </div>
  )
})
Container.displayName = 'Container'
