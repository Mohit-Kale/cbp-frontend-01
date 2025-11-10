'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

export function PricingHero() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <motion.h1 className="mb-8 text-5xl font-black text-foreground md:text-6xl lg:text-7xl" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          className="mx-auto mb-16 max-w-3xl text-2xl font-semibold leading-relaxed text-muted-foreground md:text-3xl"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Pay only for the time you use. No subscriptions, no hidden fees — just direct access to world-class executives by the hour.
        </motion.p>
      </div>
    </section>
  )
}
