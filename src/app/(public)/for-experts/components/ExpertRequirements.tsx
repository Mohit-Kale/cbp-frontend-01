'use client'

import { motion } from 'framer-motion'
import { slideLeftVariant, slideRightVariant } from '@/utils/animation.util'

const requirements = [
  {
    title: 'Executive Experience',
    color: 'primary',
    points: [
      'Current or former C-suite executive (CEO, CTO, CPO, CMO, CFO, COO)',
      'Minimum 5+ years in executive roles at technology companies',
      'Experience scaling companies or leading major strategic initiatives',
      'Proven track record of business success and team leadership',
    ],
  },
  {
    title: 'Platform Standards',
    color: 'accent',
    points: [
      'Excellent communication and presentation skills',
      'Reliable internet connection and professional video setup',
      'Commitment to providing actionable, strategic guidance',
      'Professional references and background verification',
    ],
  },
]

export function ExpertRequirements() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl font-bold text-foreground mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Expert Requirements
          </motion.h2>
          <motion.p className="text-muted-foreground" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            We maintain high standards to ensure our clients receive exceptional guidance
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {requirements.map((req, idx) => (
            <motion.div key={idx} variants={idx % 2 === 0 ? slideLeftVariant : slideRightVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h3 className="text-xl font-semibold mb-6">{req.title}</h3>
              <ul className="space-y-4">
                {req.points.map((p, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`w-2 h-2 bg-${req.color} rounded-full mr-3 mt-2`} />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
