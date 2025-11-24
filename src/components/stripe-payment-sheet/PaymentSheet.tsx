'use client'

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PaymentSheet({ onSuccess, onClose }: { onSuccess?: () => void; onClose?: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!stripe || !elements) return

    setLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    })

    setLoading(false)

    if (error) {
      toast.error(error.message || 'Payment failed')
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      toast.success('Payment successful')
      onSuccess?.()
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 space-y-6 border border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Complete Your Payment</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Securely pay to confirm your booking</p>
      </div>

      {/* Payment Form */}
      <PaymentElement />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
          Cancel
        </Button>

        <Button disabled={loading || !stripe} onClick={handlePayment} className={`flex-1 sm:flex-none transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>

      {/* Footer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">Powered by Stripe. Your payment information is never stored on our servers.</p>
    </div>
  )
}
