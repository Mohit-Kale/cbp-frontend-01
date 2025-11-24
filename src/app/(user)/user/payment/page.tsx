'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentSheet from '@/components/stripe-payment-sheet/PaymentSheet'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { paths } from '@/navigate/paths'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function PaymentPage() {
  const params = useSearchParams()
  const router = useRouter()

  const clientSecret = params.get('clientSecret')

  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!clientSecret) {
      toast.error('Missing payment session.')
      router.push(paths.userDashboard())
      return
    }
    setReady(true)
  }, [clientSecret])

  if (!ready) return null

  return (
    <div className="max-w-lg mx-auto p-4">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: clientSecret ?? undefined, // <- convert null to undefined
          appearance: { theme: 'stripe' },
        }}
      >
        <PaymentSheet onSuccess={() => router.push(paths.paymentSuccess())} onClose={() => router.push(paths.userDashboard())} />
      </Elements>
    </div>
  )
}
