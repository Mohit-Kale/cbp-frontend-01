'use client'

import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

const trustReasons = [
  { title: 'Transparent Fees', desc: 'No hidden costs, no surprises — just straightforward pricing you can budget for.' },
  { title: 'Fast, Curated Shortlists', desc: 'Quality over quantity — we present only the candidates who truly fit your needs.' },
  { title: 'Built for Startups & SMEs', desc: 'We understand your pace, culture, and the unique challenges of scaling a business.' },
  { title: 'Proven Network', desc: 'Backed by the Boardtide network of battle-tested executives and specialists.' },
]

export function FoundersTrust() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 className="text-3xl md:text-4xl font-black text-foreground mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Why Founders Trust Us
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {trustReasons.map(({ title, desc }, i) => (
            <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
              <CheckCircle className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-lg text-muted-foreground">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
