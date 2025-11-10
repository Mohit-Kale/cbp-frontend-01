'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

const steps = [
  { num: '1', title: 'Start with Insight', desc: 'A Boardtide strategy call sparks new ideas and highlights your talent gaps.' },
  { num: '2', title: 'Book With Our Team', desc: 'Click to schedule a call with our consultants and discuss your hiring needs.' },
  { num: '3', title: 'Recruit with Confidence', desc: 'Whether contract or permanent, we deliver the right people fast with simple, founder-friendly terms.' },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h2 className="text-4xl lg:text-5xl font-bold text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ num, title, desc }, idx) => (
            <motion.div key={num} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-primary">{num}</span>
              </div>
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
