'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeDownVariant, fadeUpVariant } from '@/utils/animation.util'

export function Hero() {
  return (
    <motion.section className="py-16  relative overflow-hidden" initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-0s" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Beyond Advice: Recruitment Built for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Startups and SMEs</span>
          </motion.h1>
          <motion.p className="text-2xl md:text-2xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            When an hour of advice turns into a long-term need, Boardtide Search helps you secure the right leaders and teams — contract or permanent.
          </motion.p>
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 py-4 text-lg font-semibold" asChild>
              <a href="">Book a Call With Our Team</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
