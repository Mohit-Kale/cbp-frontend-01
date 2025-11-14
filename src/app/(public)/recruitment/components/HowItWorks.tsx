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
        <motion.h2 className="text-3xl md:text-4xl font-black text-foreground mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ num, title, desc }, idx) => (
            <motion.div key={num} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{num}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{title}</h3>
              <p className="text-md font-semibold text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
