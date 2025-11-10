'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

const steps = [
  {
    step: '1',
    title: 'Submit Application',
    desc: 'Complete our executive application form with your professional background, expertise areas, and executive experience.',
    points: ['Professional biography and LinkedIn profile', 'Executive positions and company details', 'Areas of expertise and specialization'],
  },
  {
    step: '2',
    title: 'Background Review',
    desc: 'Our team reviews your executive background and verifies your experience through professional references and public records.',
    points: ['Professional reference checks', 'Experience and achievement verification', 'Background and credential review'],
  },
  {
    step: '3',
    title: 'Expert Interview',
    desc: 'Participate in a strategic conversation with our team to assess your advisory skills and platform fit.',
    points: ['45-minute video interview', 'Case study discussion', 'Communication and advisory style assessment'],
  },
  {
    step: '4',
    title: 'Profile Creation',
    desc: 'Upon acceptance, we’ll help you create an optimized expert profile and set your availability and rates.',
    points: ['Professional profile optimization', 'Rate setting and availability configuration', 'Platform onboarding and training'],
  },
]

export function ApplicationProcess() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center mb-16">
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Application Process
        </motion.h2>
        <motion.p className="text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Our selective process ensures we maintain the highest quality network
        </motion.p>
      </div>

      <div className="container mx-auto max-w-4xl px-4 space-y-12">
        {steps.map((s, idx) => (
          <motion.div key={idx} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-primary-foreground">{s.step}</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground mb-4">{s.desc}</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {s.points.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
