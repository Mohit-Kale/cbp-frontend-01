'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { fadeUpVariant, popVariant } from '@/utils/animation.util'

export default function RegistrationSuccess() {
  const searchParams = useSearchParams()
  const email = searchParams?.get('email') || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Heading */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to <span className="text-primary">Boardtide </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">Thank you for joining Boardtide. We&apos;re excited to help you on your wellness journey.</p>
        </motion.div>

        {/* Card */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <motion.div variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary/90" />
                  </div>
                </motion.div>

                <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-900">Verify Your Email Address</h2>
                  <p className="text-gray-600">
                    We&apos;ve sent a verification link to your email address <span className="text-primary/90">{email}</span>. Please check your inbox and click the link to activate your account.
                  </p>
                </motion.div>

                <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="pt-4 space-y-3">
                  <div className="text-sm text-gray-500 text-center space-2">
                    <p>Didn&apos;t receive the email? Please check your spam folder.</p>
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
