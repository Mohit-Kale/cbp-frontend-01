'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

export function PricingCTA() {
  return (
    <motion.section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 text-center px-6" initial="hidden" whileInView="show" viewport={{ once: true }}>
      <motion.div variants={fadeUpVariant}>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-1">Ready to Access Executive Expertise?</h2>
        <p className="text-xl font-semibold text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-3">Browse experts and see transparent hourly rates before booking.</p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 shadow-lg rounded-lgshadow-lg">
          <Link href="/find-experts">Browse Experts & Rates</Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}
