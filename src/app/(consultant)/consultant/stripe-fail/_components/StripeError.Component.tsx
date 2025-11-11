'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { fadeUpVariant, popVariant } from '@/utils/animation.util'
import { paths } from '@/navigate/paths'
import { Button } from '@/components/ui/button'

export default function StripeErrorPage() {
  const searchParams = useSearchParams()
  const email = searchParams?.get('email') || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Heading */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Oops! <span className="text-destructive">Payout Setup Failed</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">We encountered an error while linking your Stripe account. Please try again or contact support.</p>
        </motion.div>

        {/* Card */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Icon */}
                <motion.div variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-200 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </motion.div>

                {/* Error Message */}
                <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-900">Stripe Onboarding Failed</h2>
                  <p className="text-gray-600">{email ? `We couldn’t link your Stripe account associated with ${email}.` : 'We couldn’t complete the Stripe onboarding process.'}</p>
                </motion.div>

                {/* Suggestion */}
                <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="pt-4 space-y-3">
                  <div className="text-sm text-gray-500 text-center">
                    <p>Please try again later or contact support for assistance.</p>
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => paths.consultantProfile()} className="mt-6 w-full sm:w-auto px-6 py-3 rounded-lg bg-destructive text-white font-semibold shadow-md hover:bg-destructive/90 transition-all duration-200">
                  Go to Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
