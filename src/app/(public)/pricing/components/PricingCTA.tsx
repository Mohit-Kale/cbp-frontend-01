'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

export function PricingCTA() {
  return (
    <motion.section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 text-center px-6" initial="hidden" whileInView="show" viewport={{ once: true }}>
      <motion.div variants={fadeUpVariant}>
        <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Access Executive Expertise?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">Browse experts and see transparent hourly rates before booking.</p>
        <Button asChild size="lg" className="shadow-lg">
          <Link href="/find-experts">Browse Experts & Rates</Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}
