'use client'

import { useEffect, useState } from 'react'
import { ProgressProvider } from '@bprogress/next/app'

const BProgressProviders = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ProgressProvider height="4px" color={`hsl(var(--primary))`} options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  )
}

export default BProgressProviders
