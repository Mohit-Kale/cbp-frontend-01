'use client'

import { motion } from 'framer-motion'
import { fadeDownVariant } from '@/utils/animation.util'

export function PricingHero() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-4" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          className="text-2xl md:text-2xl font-semibold text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          variants={fadeDownVariant}
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
