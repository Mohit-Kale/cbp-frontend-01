'use client'

import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'

const pricingFeatures = [
  {
    icon: '💳',
    title: 'Pay Per Session',
    desc: 'Each expert sets their own hourly rate. You pay only for the time you book with no additional platform fees.',
  },
  {
    icon: '⏱️',
    title: 'Flexible Duration',
    desc: 'Book sessions from 30 minutes to multiple hours. Extend sessions in real-time if needed.',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: 'All payments are processed securely. Funds are held in escrow and released after your session.',
  },
]

export function PricingModel() {
  return (
    <section className="pt-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 className="text-3xl md:text-4xl font-black text-foreground mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            How Boardtide Pricing Works
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {pricingFeatures.map((item, idx) => (
              <motion.div key={idx} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="h-full">
                <div className="h-full flex flex-col text-center p-2 rounded-lg bg-card hover:shadow-lg hover:-translate-y-[2px] transition-all">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
