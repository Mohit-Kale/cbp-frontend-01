'use client'
import { fadeDownVariant } from '@/utils/animation.util'
import { motion } from 'framer-motion'
export function HowItWorksHero() {
  return (
    <motion.div variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <section className="pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-2">How Boardtide Works</h1>
            <p className="text-2xl md:text-2xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">Connect with global C-suite executives in three simple steps</p>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
