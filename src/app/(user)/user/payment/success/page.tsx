'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import BackToDashboard from '@/components/backToDashboard/BackToDashboard.component'

export default function PaymentSuccessPage() {
  return (
    <div className="max-w-lg mx-auto p-6 flex flex-col items-center text-center gap-6">
      <CheckCircle2 className="h-16 w-16 text-green-600" />

      <h1 className="text-2xl font-bold">Payment Successful</h1>

      <p className="text-muted-foreground">Your payment has been processed successfully. You can now continue back to your dashboard.</p>

      <BackToDashboard />
    </div>
  )
}
