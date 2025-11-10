'use client'

import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'

const benefits = [
  {
    icon: '💰',
    title: 'Premium Rates',
    text: 'Set your own hourly rates. Our executives typically earn $300-$1000+ per hour for strategic consultations.',
  },
  {
    icon: '⏰',
    title: 'Flexible Schedule',
    text: 'Work when you want. Set your availability and book sessions that fit around your current commitments.',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    text: 'Connect with ambitious technology companies worldwide. Share your expertise across different markets and time zones.',
  },
]

export function ForExpertsBenefits() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Why Join Boardtide?
        </motion.h2>

        <motion.p className="text-muted-foreground max-w-2xl mx-auto mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Leverage your executive experience while maintaining full control over your time and rates
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <motion.div key={idx} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.2 }}>
              <div className="h-full flex flex-col text-center p-8 hover:shadow-lg hover:-translate-y-[2px] transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{b.icon}</span>
                </div>

                <div className="p-0 mb-3">
                  <h3 className="text-xl font-semibold">{b.title}</h3>
                </div>

                <div className="flex-1 p-0">
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
