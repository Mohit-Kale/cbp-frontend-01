'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { fadeUpVariant, popVariant } from '@/utils/animation.util'
import { Button } from '@/components/ui/button'
import { paths } from '@/navigate/paths'

export default function StripeThankYou() {
  const searchParams = useSearchParams()
  const email = searchParams?.get('email') || ''
  const router = useRouter()
  const goto = () => {
    router.push(paths.consultantDashboard())
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Heading */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Thank You! <span className="text-primary">Payout Setup Complete</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">Your Stripe account has been successfully linked. You can now receive payouts seamlessly.</p>
        </motion.div>

        {/* Card */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Icon */}
                <motion.div variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary/90" />
                  </div>
                </motion.div>

                {/* Confirmation Message */}
                <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-900">Payout Setup Complete</h2>
                  <p className="text-gray-600">{email ? `We’ve successfully linked your Stripe account associated with ${email}.` : 'Your Stripe account is now linked and ready to receive payouts.'}</p>
                </motion.div>

                {/* Optional Info */}
                <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="pt-4 space-y-3">
                  <div className="text-sm text-gray-500 text-center">
                    <p>You can now go back to your dashboard and continue managing your account.</p>
                    <Button onClick={goto} className="mt-6">
                      Go to Dashboard
                    </Button>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
