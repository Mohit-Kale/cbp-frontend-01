'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeUpVariant, popVariant } from '@/utils/animation.util'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'

export function ForExpertsHero() {
  const { openAuthDialog } = useAuthDialog()
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Share Your Executive Expertise
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">Earn by the Hour</span>
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          Join our exclusive network of C-suite executives. Monetize your experience by providing strategic guidance to growing technology companies.
        </motion.p>

        <motion.div variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Button
            size="lg"
            className="shadow-lg"
            onClick={() => {
              openAuthDialog('signup', 'CONSULTANT')
            }}
          >
            Apply to Join
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
