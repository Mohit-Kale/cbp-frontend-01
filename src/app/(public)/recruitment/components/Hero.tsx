'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeDownVariant, fadeUpVariant } from '@/utils/animation.util'

const calendarLink = 'https://calendly.com/boardtide'

export function Hero() {
  return (
    <motion.section className="py-20 lg:py-32 relative overflow-hidden" initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 className="text-5xl lg:text-7xl font-bold tracking-tight" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Beyond Advice: Recruitment Built for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Startups and SMEs</span>
          </motion.h1>
          <motion.p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            When an hour of advice turns into a long-term need, Boardtide Search helps you secure the right leaders and teams — contract or permanent.
          </motion.p>
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Button size="lg" className="text-lg font-bold px-10 py-6 h-auto" asChild>
              <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                Book a Call With Our Team
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
